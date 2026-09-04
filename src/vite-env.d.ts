/// <reference types="vite/client" />

declare module "virtual:portfolio" {
  const shoots: Array<{
    slug: string;
    name: string;
    ig: string;
    date: string | null;
    description: string;
    cover: string;
    coverWidth: number;
    coverHeight: number;
    photos: Array<{ src: string; width: number; height: number }>;
  }>;
  export default shoots;
}
