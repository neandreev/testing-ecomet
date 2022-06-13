import { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";
import _find from "lodash/find";

import BootstrapTable from "react-bootstrap/Table";
import BootstrapForm from "react-bootstrap/Form";

import TableTogglers from "../TableTogglers";
import LabelWrapper from "../LabelWrapper";
import Pagination from "../Pagination";
import Heading from "../Heading";

import {
  $episodeFilter,
  $tableState,
  $episodes,
  $season,
} from "../../state/stores";
import { changeEpisodeFilter, updateSort } from "../../state/events";
import { fetchEpisodes } from "../../state/effects";

import styles from "./EpisodesTable.module.css";

import { EpisodeI, TableColumnsI } from "../../types";

const TableBody: FC = () => {
  const season = useStore($season);
  const nameFilter = useStore($episodeFilter);
  const { sourceEpisodes, episodesUI } = useStore($episodes);
  const { tableColumns: tables } = useStore($tableState);

  const visibleCols = Object.entries(tables).filter(
    ([, colState]) => colState.isVisible
  );

  const filteredEpisodes = episodesUI.filter(({ name }) =>
    name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const currentSeasonEpisodes = filteredEpisodes.filter(({ id }) => {
    const sourceEpisode = _find(sourceEpisodes, { id }) as EpisodeI;
    const sourceEpisodeSeason = parseInt(sourceEpisode.episode.slice(1, 3), 10);
    return sourceEpisodeSeason === season;
  });

  if (currentSeasonEpisodes.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={999}>Серий не найдено!</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {currentSeasonEpisodes.map((episode) => (
        <tr key={episode.id}>
          {visibleCols.map(([key]) => (
            <td key={key}>
              {key === "id" ? (
                <Link to={`/episode/${episode[key]}`}>
                  <span>{episode[key as TableColumnsI]}</span>
                </Link>
              ) : (
                <span>{episode[key as TableColumnsI]}</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const TableHead: FC = () => {
  const { tableColumns: tables } = useStore($tableState);

  const visibleCols = Object.entries(tables).filter(
    ([, colState]) => colState.isVisible
  );

  const sortHandler = (key: TableColumnsI) => (e: any) => {
    updateSort(key);
  };

  return (
    <thead>
      <tr>
        {visibleCols.map(([colName, colState]) => (
          <th
            key={colName}
            onClick={sortHandler(colName as TableColumnsI)}
            className={styles["table-column__head-cell"]}
          >
            <span>{colState.visibleName}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const EpisodesTable: FC = () => {
  const episodeNameFilter = useStore($episodeFilter);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const nameFilterHandler = (e: any) => changeEpisodeFilter(e.target.value);

  return (
    <div>
      <Heading text='Rick And Morty Episodes' />
      <div className={styles["table__actions-row"]}>
        <LabelWrapper label='Выбор сезона'>
          <Pagination />
        </LabelWrapper>
        <LabelWrapper label='Переключение'>
          <TableTogglers />
        </LabelWrapper>
        <LabelWrapper label='Найти серию'>
          <BootstrapForm>
            <BootstrapForm.Control
              value={episodeNameFilter}
              type='name'
              onChange={nameFilterHandler}
              placeholder='Lawnmover...'
            />
          </BootstrapForm>
        </LabelWrapper>
      </div>
      <BootstrapTable striped hover bordered>
        <TableHead />
        <TableBody />
      </BootstrapTable>
    </div>
  );
};

export { EpisodesTable };
