import { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { useNavigate, useParams } from "react-router-dom";

import CloseButton from "react-bootstrap/CloseButton";

import { resetEpisode } from "../../state/events";
import { fetchCharacters, fetchEpisode } from "../../state/effects";
import { $currentCharacters, $currentEpisode } from "../../state/stores";

import CharactersCards from "../CharactersCards";
import Heading from "../Heading";
import Spinner from "../Spinner";

import { EpisodeI } from "../../types";

import styles from "./Episode.module.css";

interface EpisodeDetailsPropsI {
  episode: EpisodeI;
}

const EpisodeDetails: FC<EpisodeDetailsPropsI> = () => {
  const characters = useStore($currentCharacters);
  const episode = useStore($currentEpisode) as EpisodeI;
  const loadingCondition = characters.length !== 0;
  const episodeHeading = `${episode?.name}, ${episode?.episode}`;

  useEffect(() => {
    fetchCharacters(episode.characters);
  }, [episode]);

  return (
    <div>
      <Heading text={episodeHeading} />
      {loadingCondition ? <CharactersCards /> : <Spinner />}
    </div>
  );
};

const Episode: FC = () => {
  const { id } = useParams();
  const episode = useStore($currentEpisode);
  const loadingCondition = !!episode;

  const navigate = useNavigate();

  useEffect(() => {
    fetchEpisode(id!);

    return () => resetEpisode();
  }, [id]);

  return (
    <div className={styles.episode}>
      <CloseButton
        className={styles["close-button"]}
        onClick={() => {
          resetEpisode();
          navigate("/");
        }}
      />
      {loadingCondition ? (
        <EpisodeDetails episode={episode} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export { Episode };
