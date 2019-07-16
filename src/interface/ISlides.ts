export interface ISlides {
  details: ISlideDetails;
  imageUrl: string;
}
export interface ISlideDetails {
  title: string;
  desc: string;
  link: string;
}
export interface ISlideData {
  slides: ISlides[];
}