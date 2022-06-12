import { createEvent } from "effector-logger";
import { TableHeadersI } from "../types";

export const changeSeason = createEvent<number>('changeSeason');
export const changeEpisodeFilter = createEvent<string>('changeEpisodeFilter');
export const changeTableVisibility = createEvent<TableHeadersI>('changeTableVisibility');
export const updateSort = createEvent<TableHeadersI>('updateSort');
export const resetEpisode = createEvent('resetEpisode');
