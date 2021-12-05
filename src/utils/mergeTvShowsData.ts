import { TvShow, TvShowsData } from "~/types";

export const mergeTvShowsData = (newData: TvShowsData, prev?: TvShow[]): TvShowsData => ({
  ...newData,
  results: [...(prev ? prev : []), ...newData.results]
});
