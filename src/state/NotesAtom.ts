import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

type Viewed = {
  [id: number]: Note[];
};

export type MediaType = "show" | "season" | "episode";

export type Note = {
  id: string;
  mediaId: number;
  note: string;
  type: MediaType;
};

const { persistAtom } = recoilPersist();
export const notesState = atom<Viewed>({
  key: "notes",
  default: {},
  effects_UNSTABLE: [persistAtom]
});
