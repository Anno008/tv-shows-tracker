import { TvShow } from "./TvShow";

export type TvShowsData = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};
