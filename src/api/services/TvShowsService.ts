import { getJSON } from "~/api/ApiCall";
import { TvShowsData, TvShowDetails, SeasonDetails, EpisodeDetails, TvShowStatus } from "~/types";

export const fetchPopularTvShows = (page: number): Promise<TvShowsData> =>
  getJSON<TvShowsData>({
    url: `tv/popular?page=${page}`
  });

export const searchTvShows = (page: number, query: string): Promise<TvShowsData> =>
  getJSON<TvShowsData>({
    url: `search/tv?page=${page}&query=${query}`
  });

export const getTvShowById = (id: number): Promise<TvShowDetails> =>
  getJSON<TvShowDetails>({
    url: `tv/${id}`
  });

export const getTvShowStatusById = (id: number, sessionId: string): Promise<TvShowStatus> =>
  getJSON<TvShowStatus>({ url: `tv/${id}/account_states?session_id=${sessionId}` });

export const getSeasonById = (tvShowId: number, seasonNumber: number): Promise<SeasonDetails> =>
  getJSON<SeasonDetails>({ url: `tv/${tvShowId}/season/${seasonNumber}` });

export const getEpisodeById = (
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<EpisodeDetails> =>
  getJSON<EpisodeDetails>({
    url: `tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`
  });
