import { getJSON } from "~/api/ApiCall";
import { TvShowsData } from "~/types";

export const getFavoriteTvShows = (
  accountId: number,
  sessionId: string,
  page: number
): Promise<TvShowsData> =>
  getJSON<TvShowsData>({
    url: `account/${accountId}/favorite/tv?page=${page}&session_id=${sessionId}`
  });

export const markAsFavorite = (
  accountId: number,
  id: number,
  favorite: boolean,
  sessionId: string,
  type: "tv" | "movie" = "tv"
): Promise<unknown> =>
  getJSON<TvShowsData>({
    url: `account/${accountId}/favorite?session_id=${sessionId}`,
    method: "POST",
    body: JSON.stringify({
      media_type: type,
      media_id: id,
      favorite
    })
  });
