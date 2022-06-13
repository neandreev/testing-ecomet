import dayjs from "dayjs";
import _sortBy from "lodash/sortBy";
import _uniq from "lodash/uniq";

import { sortTypeI, sortByI, EpisodeI, tableStateI } from "./types";

export const getSeasonsNumber = (episodes: EpisodeI[]) =>
  _uniq(episodes.map(({ episode }) => episode.slice(1, 3))).length;

export const getNewSortState: (
  arg0: tableStateI,
  arg1: sortByI
) => { sortBy: sortByI; sortType: sortTypeI } = (
  state: tableStateI,
  sortBy: sortByI
) => {
  if (state.sortBy !== sortBy || state.sortType === null) {
    return { sortBy: sortBy, sortType: "ascending" };
  }

  if (state.sortType === "ascending") {
    return { sortBy, sortType: "descending" };
  }

  return { sortBy, sortType: null };
};

const getSortIteratee = (sortBy: sortByI) => {
  if (sortBy === null) return "id";

  return {
    amountOfCharacters: (episode: EpisodeI) => episode.characters.length,
    name: "name",
    air_date: (episode: EpisodeI) => dayjs(episode.air_date),
    id: "id",
    seasonEpisodeNumber: (episode: EpisodeI) => episode.episode.slice(-2),
  }[sortBy];
};

export const sortEpisodes = (
  episodes: EpisodeI[],
  sortType: sortTypeI,
  sortBy: sortByI
) => {
  if (sortType === null || sortBy === null) return episodes;

  const sortIteratee = getSortIteratee(sortBy);
  const sortedEpisodes = _sortBy(episodes, [sortIteratee]);

  return sortType === "ascending" ? sortedEpisodes : sortedEpisodes.reverse();
};
