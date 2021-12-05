import { tvShowFixture1, tvShowFixture2 } from "./tvShowFixture";
import { TvShowsData } from "~/types";

export const tvShowsDataFixture: TvShowsData = {
  page: 1,
  results: [tvShowFixture1, tvShowFixture2],
  total_pages: 1,
  total_results: 2,
  dates: {
    maximum: "2021-07-30",
    minimum: "2021-07-05"
  }
};
