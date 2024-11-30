declare module "@types" {
  type ImageView = {
    name: string;
    image: Blob;
  }
  type ImgIdx = {
    src: string;
    name: string;
  }
  type ResultImage = {
    name: string;
    image: string;
    tags: string[];
  }
  type ResultImageWithoutTags = Omit<ResultImage, 'tags'>
}