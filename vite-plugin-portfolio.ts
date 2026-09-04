import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:portfolio";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

type Photo = { src: string; width: number; height: number };

type GalleryJson = {
  name?: string;
  ig?: string;
  date?: string;
  description?: string;
  cover?: string;
};

export type PortfolioShoot = {
  slug: string;
  name: string;
  ig: string;
  date: string | null;
  description: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  photos: Photo[];
};

function titleFromSlug(slug: string) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseShootDate(date: string | undefined): number | null {
  if (!date) return null;
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(date.trim());
  if (!match) return null;
  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return Date.UTC(year, month - 1, day);
}

function readImageSize(filePath: string): { width: number; height: number } | null {
  const fd = fs.openSync(filePath, "r");
  try {
    const head = Buffer.alloc(32);
    const bytes = fs.readSync(fd, head, 0, head.length, 0);
    if (bytes < 24) return null;

    if (head[0] === 0xff && head[1] === 0xd8) {
      let offset = 2;
      const markerBuf = Buffer.alloc(4);
      const sofBuf = Buffer.alloc(7);
      while (offset < 2_000_000) {
        const read = fs.readSync(fd, markerBuf, 0, 4, offset);
        if (read < 2) return null;
        if (markerBuf[0] !== 0xff) {
          offset += 1;
          continue;
        }
        if (markerBuf[1] === 0xff) {
          offset += 1;
          continue;
        }
        const marker = markerBuf[1];
        if (marker === 0xda || marker === 0xd9) return null;
        if (marker >= 0xd0 && marker <= 0xd7) {
          offset += 2;
          continue;
        }
        if (read < 4) return null;
        const size = markerBuf.readUInt16BE(2);
        if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3) {
          fs.readSync(fd, sofBuf, 0, 7, offset + 4);
          return { height: sofBuf.readUInt16BE(1), width: sofBuf.readUInt16BE(3) };
        }
        if (size < 2) return null;
        offset += 2 + size;
      }
      return null;
    }

    if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) {
      return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
    }

    if (head.toString("ascii", 0, 4) === "RIFF" && head.toString("ascii", 8, 12) === "WEBP") {
      const buf = Buffer.alloc(32);
      fs.readSync(fd, buf, 0, buf.length, 0);
      return imageSize(buf);
    }

    return null;
  } catch {
    return null;
  } finally {
    fs.closeSync(fd);
  }
}

function imageSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 24) return null;

  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buf[offset + 1];
      if (marker === 0xda || marker === 0xd9) break;
      if (marker >= 0xd0 && marker <= 0xd7) {
        offset += 2;
        continue;
      }
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3) {
        return {
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7),
        };
      }
      const size = buf.readUInt16BE(offset + 2);
      if (size < 2) break;
      offset += 2 + size;
    }
    return null;
  }

  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return {
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
    };
  }

  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const type = buf.toString("ascii", 12, 16);
    if (type === "VP8 " && buf.length >= 30) {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (type === "VP8L" && buf.length >= 25) {
      const bits = buf.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    if (type === "VP8X" && buf.length >= 30) {
      return {
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
  }

  return null;
}

function readGalleryJson(filePath: string): GalleryJson | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as GalleryJson;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function scanPortfolio(root: string): PortfolioShoot[] {
  if (!fs.existsSync(root)) return [];

  const shoots = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => {
      const slug = entry.name;
      const dir = path.join(root, slug);
      const meta = readGalleryJson(path.join(dir, "gallery.json")) ?? {};
      const files = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((file) => file.isFile() && IMAGE_EXT.test(file.name))
        .map((file) => file.name)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

      if (files.length === 0) return null;

      const photos: Photo[] = files.map((name) => {
        const size = readImageSize(path.join(dir, name));
        return {
          src: `/img/gallery/portfolio/${slug}/${encodeURIComponent(name)}`,
          width: size?.width ?? 864,
          height: size?.height ?? 1080,
        };
      });

      const coverName =
        (meta.cover && files.includes(meta.cover) && meta.cover) || files.find((name) => /DSC/i.test(name)) || files[0];
      const cover = photos.find((photo) => photo.src.endsWith(encodeURIComponent(coverName))) ?? photos[0];
      const newestMtime = files.reduce((latest, name) => {
        const mtime = fs.statSync(path.join(dir, name)).mtimeMs;
        return Math.max(latest, mtime);
      }, 0);

      return {
        slug,
        name: meta.name?.trim() || titleFromSlug(slug),
        ig: meta.ig?.trim() ?? "",
        date: meta.date?.trim() || null,
        description: meta.description?.trim() ?? "",
        cover: cover.src,
        coverWidth: cover.width,
        coverHeight: cover.height,
        photos,
        sortKey: parseShootDate(meta.date) ?? newestMtime,
      };
    })
    .filter((shoot): shoot is NonNullable<typeof shoot> => Boolean(shoot))
    .sort((a, b) => b.sortKey - a.sortKey || a.slug.localeCompare(b.slug));

  return shoots.map(({ sortKey: _sortKey, ...shoot }) => shoot);
}

export function portfolioPlugin(): Plugin {
  let portfolioRoot = "";

  return {
    name: "portfolio",
    configResolved(config) {
      portfolioRoot = path.join(config.root, "public/img/gallery/portfolio");
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      return `export default ${JSON.stringify(scanPortfolio(portfolioRoot))}`;
    },
    configureServer(server) {
      if (fs.existsSync(portfolioRoot)) {
        server.watcher.add(portfolioRoot);
      }
      server.watcher.on("all", (_event, file) => {
        if (!file.replaceAll("\\", "/").includes("/img/gallery/portfolio")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (!mod) return;
        server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
