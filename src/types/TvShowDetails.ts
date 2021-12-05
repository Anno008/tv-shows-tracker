import { Genre } from "./Genre";
import { Season } from "./Season";

export type TvShowDetails = {
  backdrop_path: string;
  genres: Genre[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  name: string;
  vote_average: number;
  vote_count: number;
  seasons: Season[];
  number_of_seasons: number;
  original_name: string;
};
