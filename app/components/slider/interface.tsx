export interface HeaderSliderProps {
  title?: string;
  link?: string;
  linkText?: string;
}

export interface SliderProps {
  banner: boolean;
  profileId: number;
  content: Array<any>;
  title?: string;
  cardAxis?: "horizontal" | "vertical";
  linkText?: string;
  link?: string;
  shouldBeCentered?: boolean;
}
