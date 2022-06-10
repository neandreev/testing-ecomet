import { FC, useEffect } from "react";
import { default as _sortBy } from "lodash/sortBy";
import { default as _find } from "lodash/find";

import { default as BootstrapTable } from "react-bootstrap/Table";
import { default as BootstrapForm } from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import dayjs from "dayjs";
import "dayjs/locale/ru";

import {
  EpisodeForSortI,
  EpisodeI,
  sortByI,
  sortTypeI,
  TableHeadersI,
} from "../../types";
import { useStore } from "effector-react";

import { fetchEpisodes } from "../../state/effects";
import {
  $episodeFilter,
  $episodes,
  $season,
  $tableState,
} from "../../state/stores";
import { Pagination } from "../Pagination/Pagination";
import {
  changeEpisodeFilter,
  changeTableVisibility,
  updateSort,
} from "../../state/events";
import { Link } from "react-router-dom";

interface TableBodyI {
  episodes: EpisodeI[];
}

const sortEpisodes = (
  episodes: EpisodeForSortI[],
  sortType: sortTypeI,
  sortBy: sortByI
) => {
  if (sortType === null) return episodes;

  const sortedEpisodes = _sortBy(episodes, sortBy!);

  return sortType === "ascending" ? sortedEpisodes : sortedEpisodes.reverse();
};

const TableBody: FC<TableBodyI> = ({ episodes }) => {
  const { tables, sortBy, sortType } = useStore($tableState);
  const allEpisodes = useStore($episodes);

  const episodesPreparedForSort = episodes.map((episode) => {
    const seasonEpisodeNumber = parseInt(episode.episode.slice(-2), 10);

    return {
      id: episode.id,
      name: episode.name,
      air_date: new Date(episode.air_date),
      seasonEpisodeNumber,
      amountOfCharacters: episode.characters.length,
    };
  });

  const sortedEpisodes = sortEpisodes(
    episodesPreparedForSort,
    sortType,
    sortBy
  );

  const episodesPreparedForShowing = sortedEpisodes.map((episode) => {
    const episodeDate = dayjs(episode.air_date).locale("ru");
    const air_date = episodeDate.format("DD/MM/YY");

    return {
      id: episode.id,
      name: episode.name,
      air_date,
      seasonEpisodeNumber: episode.seasonEpisodeNumber,
      amountOfCharacters: episode.amountOfCharacters,
    };
  });

  return (
    <tbody>
      {episodesPreparedForShowing.map((episode) => {
        const keys = Object.keys(episode);

        return (
          <tr key={episode.id}>
            {keys
              .filter((key) => {
                return tables[key as TableHeadersI].isVisible;
              })
              .map((key) => {
                if (key === "id") {
                  const { id } = _find(allEpisodes, { id: episode.id })!;
                  return (
                    <td>
                      <Link to={`/episode/${id}`}>{episode[key as TableHeadersI]}</Link>
                    </td>
                  );
                }

                return <td key={key}>{episode[key as TableHeadersI]}</td>;
              })}
          </tr>
        );
      })}
    </tbody>
  );
};

const TableHead: FC = () => {
  const tableState = useStore($tableState);

  const sortHandler = (key: TableHeadersI) => (e: any) => {
    updateSort(key);
  };

  return (
    <thead>
      <tr>
        {Object.entries(tableState.tables)
          .filter(([key, table]) => {
            return table.isVisible;
          })
          .map(([key, table]) => {
            return (
              <th
                key={table.visibleName}
                onClick={sortHandler(key as TableHeadersI)}
              >
                <span>{table.visibleName}</span>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

const Table: FC = () => {
  const episodes = useStore($episodes);
  const season = useStore($season);
  const episodeNameFilter = useStore($episodeFilter);
  const tableState = useStore($tableState);

  const [id, name, air_date, seasonEpisodeNumber, amountOfCharacters] =
    Object.entries(tableState.tables);

  const filteredEpisodes = episodes
    .filter((episode) =>
      episode.name.toLowerCase().includes(episodeNameFilter.toLowerCase())
    )
    .filter((episode) => {
      const seasonNumber = parseInt(episode.episode.slice(1, 3), 10);
      return seasonNumber === season;
    });

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const nameFilterHandler = (e: any) => changeEpisodeFilter(e.target.value);
  const toggleTableVisibilityHandler =
    (tableName: TableHeadersI) => (e: any) => {
      changeTableVisibility(tableName);
    };

  return (
    <div>
      <BootstrapForm>
        <BootstrapForm.Control
          value={episodeNameFilter}
          type='name'
          onChange={nameFilterHandler}
          placeholder='Найти серию по названию'
        />
      </BootstrapForm>
      <Pagination episodes={episodes} />
      <ButtonGroup>
        <ToggleButton
          variant='outline-primary'
          type='checkbox'
          checked={id[1].isVisible}
          value='id'
          onClick={toggleTableVisibilityHandler("id")}
        >
          ID
        </ToggleButton>
        <ToggleButton
          variant='outline-primary'
          type='checkbox'
          checked={name[1].isVisible}
          value='name'
          onClick={toggleTableVisibilityHandler("name")}
        >
          Название
        </ToggleButton>
        <ToggleButton
          variant='outline-primary'
          type='checkbox'
          checked={air_date[1].isVisible}
          value='air_date'
          onClick={toggleTableVisibilityHandler("air_date")}
        >
          Дата показа
        </ToggleButton>
        <ToggleButton
          variant='outline-primary'
          type='checkbox'
          checked={seasonEpisodeNumber[1].isVisible}
          value='seasonEpisodeNumber'
          onClick={toggleTableVisibilityHandler("seasonEpisodeNumber")}
        >
          Номер серии
        </ToggleButton>
        <ToggleButton
          variant='outline-primary'
          type='checkbox'
          checked={amountOfCharacters[1].isVisible}
          value='amountOfCharacters'
          onClick={toggleTableVisibilityHandler("amountOfCharacters")}
        >
          Кол-во персонажей
        </ToggleButton>
      </ButtonGroup>
      <BootstrapTable striped hover bordered>
        <TableHead />
        <TableBody episodes={filteredEpisodes} />
      </BootstrapTable>
    </div>
  );
};

export { Table };
