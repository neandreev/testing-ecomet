import { useStore } from "effector-react";
import { FC, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCharacters, fetchEpisode } from "../../state/effects";
import { resetEpisode } from "../../state/events";
import { $currentCharacters, $currentEpisode } from "../../state/stores";
import { EpisodeI } from "../../types";
import Character from "../Character";

const EpisodeDetails: FC = () => {
  const characters = useStore($currentCharacters);
  const episode = useStore($currentEpisode) as EpisodeI;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacters(episode.characters);
  }, []);

  return (
    <div>
      <Button onClick={() => {
        resetEpisode();
        navigate("/");
      }}>Back to episodes</Button>
      <h2>{episode.name}</h2>
      <h3>{episode.air_date}</h3>
      <h4>{episode.episode}</h4>
      <h3>Characters:</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((character) => <Character character={character} />)}
      </div>
    </div>
  );
};

interface LoadingI {
  Element: typeof EpisodeDetails;
  condition: boolean;
}

const Loading: FC<LoadingI> = ({ Element, condition }) => {
  console.log("condition", condition);
  return !condition ? <span>Loading</span> : <Element />;
};

const Episode: FC = (props) => {
  const { id } = useParams();
  const episode = useStore($currentEpisode);
  const condition = !!episode;

  useEffect(() => {
    fetchEpisode(id!);
  }, [id]);

  return (
    <div>
      <Loading Element={EpisodeDetails} condition={condition} />
    </div>
  );
};

export { Episode };
