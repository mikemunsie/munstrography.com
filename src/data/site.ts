export const PHOTOSCOUT_URL = "https://locations.munstrography.com";
export const PHOTOSCOUT_APP_STORE_URL = "https://apps.apple.com/us/app/photoscout-by-munstrography/id6776038642";
export const INSTAGRAM_URL = "https://www.instagram.com/munstrography/";

export type GallerySlug = "night" | "day" | "interior" | "nature";

export type GalleryMeta = {
  slug: GallerySlug;
  title: string;
  kicker: string;
  description: string;
  cover: string;
};

export const GALLERIES: GalleryMeta[] = [
  {
    slug: "night",
    title: "Night",
    kicker: "",
    description: "Neon, long exposures, and a cyberpunk aesthetic.",
    cover: "/img/gallery/night/DSC00624-Edit.jpg",
  },
  {
    slug: "day",
    title: "Day",
    kicker: "",
    description: "Golden hour, desert dust, and hard daylight.",
    cover: "/img/gallery/day/ecDMvN3W.jpg",
  },
  {
    slug: "interior",
    title: "Interior",
    kicker: "",
    description: "Cabins, gauges, and the view through the windshield.",
    cover: "/img/gallery/interior/7.jpg",
  },
  {
    slug: "nature",
    title: "Nature",
    kicker: "",
    description: "Landscapes, weather, and the locations behind the work.",
    cover: "/img/gallery/nature/DSC02505.jpg",
  },
];

export const HERO_IMAGE = "/img/gallery/night/DSC04414.jpg";
export const PHOTOSCOUT_IMAGE = "/img/photoscout/iphone-1.jpg";
export const ABOUT_IMAGE = "/img/me.jpg";

export const HOME_SECTION_IMAGES = {
  intro: "/img/gallery/interior/DSC04860.jpg",
  gallery: "/img/gallery/night/DSC04853.jpg",
  photoscout: "/img/gallery/night/DSC02843-Enhanced-NR-Edit-6-Edit-2.jpg",
  contact: "/img/gallery/night/spotlight.jpg",
} as const;

export const PHOTOSCOUT_ICON = "/img/photoscout/icon-256.png";
export const PHOTOSCOUT_LOGO = "/img/photoscout/logo.jpg";

export const PHOTOSCOUT_SHOTS = [
  { src: "/img/photoscout/iphone-1.jpg", alt: "PhotoScout map of photo locations in Dallas" },
  { src: "/img/photoscout/iphone-2.jpg", alt: "A PhotoScout location post with directions" },
  { src: "/img/photoscout/iphone-3.jpg", alt: "PhotoScout home feed and top scouters" },
  { src: "/img/photoscout/iphone-4.jpg", alt: "PhotoScout lists for liked and shared spots" },
] as const;

export const PHOTOSCOUT_FEATURES = [
  {
    title: "Explore on the map",
    body: "Browse spots near you or anywhere. Search by address, drop a pin, paste a Maps link, or enter coordinates.",
  },
  {
    title: "Organize with lists",
    body: "Group locations for trips, clients, or personal projects. Invite others to build lists with you.",
  },
  {
    title: "Engage with the community",
    body: "Like and comment on locations and revisions. See what other photographers are scouting.",
  },
  {
    title: "Stay in the loop",
    body: "Notifications keep likes, comments, and activity in one place so you never miss what matters.",
  },
];

export function getGallery(slug: string | undefined): GalleryMeta | undefined {
  return GALLERIES.find((gallery) => gallery.slug === slug);
}
