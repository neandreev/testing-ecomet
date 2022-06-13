import { createEvent } from "effector-logger";
import { TableColumnsI } from "../types";

export const changeSeason = createEvent<number>('season');
export const changeEpisodeFilter = createEvent<string>('episodeFilter');
export const toggleTableColumn = createEvent<TableColumnsI>('tableVisibility');
export const updateSort = createEvent<TableColumnsI>('updateSort');
export const resetEpisode = createEvent('resetEpisode');
