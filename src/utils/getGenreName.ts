import { genresMap } from "./genresMap";

export const getGenreName = (genre: string): string => {
  return genresMap[genre] ?? genre;
};