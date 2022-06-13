import { FC } from "react";
import { useStore } from "effector-react";

import BootstrapPagination from "react-bootstrap/Pagination";

import { getSeasonsNumber } from "../../utils";

import { changeSeason } from "../../state/events";
import { $season, $sourceEpisodes } from "../../state/stores";

const Pagination: FC = () => {
  const season = useStore($season);
  const episodes = useStore($sourceEpisodes);
  const seasonsNumbers = getSeasonsNumber(episodes);

  const changeSeasonHandler = (e: any) => {
    changeSeason(parseInt(e.target.dataset.season, 10));
  };

  const PaginationItems = Array.from(Array(seasonsNumbers), (_, i) => {
    return (
      <BootstrapPagination.Item
        key={i}
        data-season={i + 1}
        active={season === i + 1}
        onClick={changeSeasonHandler}
      >
        {i + 1}
      </BootstrapPagination.Item>
    );
  });

  return <BootstrapPagination>{PaginationItems}</BootstrapPagination>;
};

export { Pagination };
