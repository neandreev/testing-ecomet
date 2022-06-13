import _find from "lodash/find";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import { combine, createStore, restore } from "effector-logger";

import { fetchCharacters, fetchEpisode, fetchEpisodes } from "./effects";

import {
  CharacterI,
  EpisodeI,
  EpisodeUII,
  TableColumnsI,
  tableStateI,
} from "../types";
import {
  changeEpisodeFilter,
  changeSeason,
  toggleTableColumn,
  resetEpisode,
  updateSort,
} from "./events";
import { getNewSortState, sortEpisodes } from "../utils";

const initialTableState: tableStateI = {
  sortBy: null,
  sortType: null,
  tableColumns: {
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

export const $tableState = createStore<tableStateI>(initialTableState, {
  name: "tableState",
})
  .on(toggleTableColumn, (state, tableName: TableColumnsI) => {
    const currentTableState = state.tableColumns[tableName].isVisible;

    return {
      ...state,
      tableColumns: {
        ...state.tableColumns,
        [tableName]: {
          ...state.tableColumns[tableName],
          isVisible: !currentTableState,
        },
      },
    };
  })
  .on(changeSeason, (state) => {
    return { ...state, sortType: null, sortBy: null };
  });

export const $episodeFilter = restore<string>(changeEpisodeFilter, "");
export const $season = restore<number>(changeSeason, 1);
export const $sourceEpisodes = restore<EpisodeI[]>(fetchEpisodes, []);

export const $episodesUI = createStore<EpisodeUII[]>([], {
  name: "episodesUI",
}).on(fetchEpisodes.doneData, (_, data) => {
  const result = data.map((episode: EpisodeI) => {
    const episodeDate = dayjs(episode.air_date).locale("ru");
    const seasonEpisodeNumber = parseInt(episode.episode.slice(-2), 10);
    const air_date = episodeDate.format("DD/MM/YY");

    return {
      id: episode.id,
      name: episode.name,
      air_date,
      seasonEpisodeNumber,
      amountOfCharacters: episode.characters.length,
    };
  });

  return result;
});

export const $episodes = combine({
  sourceEpisodes: $sourceEpisodes,
  episodesUI: $episodesUI,
  tableState: $tableState,
}).on(updateSort, (store, sortBy) => {
  const newSortState = getNewSortState(store.tableState, sortBy);
  const sortedEpisodes = sortEpisodes(
    store.sourceEpisodes,
    newSortState.sortType,
    newSortState.sortBy
  );
  const sortedUIEpisodes = sortedEpisodes.map(
    ({ id }) => _find(store.episodesUI, { id }) as EpisodeUII
  );
  return {
    ...store,
    tableState: { ...store.tableState, ...newSortState },
    episodesUI: sortedUIEpisodes,
  };
});

export const $currentEpisode = restore<EpisodeI | null>(
  fetchEpisode,
  null
).reset(resetEpisode);

export const $currentCharacters = restore<CharacterI[]>(
  fetchCharacters,
  []
).reset(resetEpisode);
