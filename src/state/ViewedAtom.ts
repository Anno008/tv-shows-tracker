import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { SavedEpisodeDetails } from "~/types/SavedEpisodeDetails";
import { SavedSeasonDetails } from "~/types/SavedSeasonDetails";
import { SavedTvShow } from "~/types/SavedTvShow";

type Viewed<T> = {
  [id: number]: T;
};

const { persistAtom } = recoilPersist();
export const viewedSeasons = atom<Viewed<SavedSeasonDetails[]>>({
  key: "viewedSeasons",
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const viewedEpisodes = atom<Viewed<SavedEpisodeDetails[]>>({
  key: "viewedEpisodes",
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const viewedTvShows = atom<Viewed<SavedTvShow[]>>({
  key: "viewedTvShows",
  default: {},
  effects_UNSTABLE: [persistAtom]
});
