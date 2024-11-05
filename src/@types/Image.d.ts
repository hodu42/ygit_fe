declare module "@types" {
  type Image = {
    name: string;
    src: string;
    tags: string[];
  };
  type ImageView = {
    name: string;
    image: Blob;
  }
  type ResultImgIdx = {
    id: string;
    name: string;
  }
  type ImageResult = {
    name: string;
    image: string;
  }
}