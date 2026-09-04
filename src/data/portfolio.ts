import shoots from "virtual:portfolio";

export type PortfolioPhoto = {
  src: string;
  width: number;
  height: number;
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
  photos: PortfolioPhoto[];
};

export const PORTFOLIO_SHOOTS: PortfolioShoot[] = shoots;

export function getShoot(slug: string | undefined): PortfolioShoot | undefined {
  return PORTFOLIO_SHOOTS.find((shoot) => shoot.slug === slug);
}

export function getShootsByFolder(folders: readonly string[]): PortfolioShoot[] {
  return folders.flatMap((slug) => {
    const shoot = getShoot(slug);
    return shoot ? [shoot] : [];
  });
}

export function formatShootDate(date: string | null): string {
  if (!date) return "";
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(date.trim());
  if (!match) return date;
  const timestamp = Date.UTC(Number(match[3]), Number(match[1]) - 1, Number(match[2]));
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(timestamp);
}
