import { createStore } from "effector-logger";

import { fetchCharacters, fetchEpisode, fetchEpisodes } from "./effects";

import { CharacterI, EpisodeI, TableHeadersI, tableStateI } from "../types";
import {
  changeEpisodeFilter,
  changeSeason,
  changeTableVisibility,
  resetEpisode,
  updateSort,
} from "./events";

const initialTableState: tableStateI = {
  sortBy: null,
  sortType: null,
  tables: {
    id: {
      visibleName: "ID Серии",
      isVisible: true,
    },
    name: {
      visibleName: "Название",
      isVisible: true,
    },
    air_date: {
      visibleName: "Дата показа",
      isVisible: true,
    },
    seasonEpisodeNumber: {
      visibleName: "Номер серии",
      isVisible: true,
    },
    amountOfCharacters: {
      visibleName: "Кол-во персонажей",
      isVisible: true,
    },
  },
};

export const $tableState = createStore<tableStateI>(initialTableState)
  .on(changeTableVisibility, (state, tableName: TableHeadersI) => {
    const currentTableState = state.tables[tableName].isVisible;

    return {
      ...state,
      tables: {
        ...state.tables,
        [tableName]: {
          ...state.tables[tableName],
          isVisible: !currentTableState,
        },
      },
    };
  })
  .on(updateSort, (state, tableName: TableHeadersI) => {
    if (state.sortBy !== tableName || state.sortType === null) {
      return { ...state, sortBy: tableName, sortType: "ascending" };
    }

    if (state.sortType === "ascending") {
      return { ...state, sortType: "descending" };
    }

    if (state.sortType === "descending") {
      return { ...state, sortType: null };
    }
  })
  .on(changeSeason, (state) => {
    return { ...state, sortType: null, sortBy: null };
  });

export const $episodeFilter = createStore<string>("").on(
  changeEpisodeFilter,
  (_, name) => name
);
export const $season = createStore<number>(1).on(
  changeSeason,
  (_, season) => season
);
export const $episodes = createStore<EpisodeI[]>([]).on(
  fetchEpisodes.doneData,
  (_, data) => data
);
export const $currentEpisode = createStore<EpisodeI | null>(null)
  .on(fetchEpisode.doneData, (_, data) => data)
  .on(resetEpisode, () => null);
export const $currentCharacters = createStore<CharacterI[]>([])
  .on(fetchCharacters.doneData, (_, data) => data)
  .on(resetEpisode, () => []);
