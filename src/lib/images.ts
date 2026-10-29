import manifest from "./image-manifest.json";

export type ImageKey = keyof typeof manifest;
export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const images = manifest as Record<ImageKey, ImageAsset>;

export function img(key: ImageKey): ImageAsset {
  return images[key];
}
