import { createEvent } from "effector-logger";
import { TableHeadersI } from "../types";

export const changeSeason = createEvent<number>();
export const changeEpisodeFilter = createEvent<string>();
export const changeTableVisibility = createEvent<TableHeadersI>();
export const updateSort = createEvent<TableHeadersI>();
export const resetEpisode = createEvent();
