import { useStore } from "effector-react";
import { FC } from "react";

import { default as BootstrapPagination } from "react-bootstrap/Pagination";

import { changeSeason } from "../../state/events";
import { $season } from "../../state/stores";
import { EpisodeI } from "../../types";

const getSeasonsNumbers = (episodes: EpisodeI[]) => episodes.reduce((seasons, episode) => {
  const seasonNumber = parseInt(episode.episode.slice(1, 3), 10);
  return seasons.includes(seasonNumber) ? seasons : [...seasons, seasonNumber];
}, [] as number[])

interface PaginationI {
  episodes: EpisodeI[];
}

const Pagination: FC<PaginationI> = ({ episodes }) => {
  const season = useStore($season);
  const seasonsNumbers = getSeasonsNumbers(episodes);

  const changeSeasonHandler = (e: any) => {
    changeSeason(parseInt(e.target.dataset.season, 10)); 
  }

  const PaginationItems = Array.from(Array(seasonsNumbers.length), (_, i) => {
    return <BootstrapPagination.Item key={i} data-season={i + 1} active={season === i + 1} onClick={changeSeasonHandler}>{i + 1}</BootstrapPagination.Item>
  });

  return (
    <BootstrapPagination>
      {PaginationItems}
    </BootstrapPagination>
  );
};

export { Pagination };
