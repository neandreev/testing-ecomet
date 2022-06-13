import { FC } from "react";
import { useList } from "effector-react";

import { Character } from "../Character/Character";

import { $currentCharacters } from "../../state/stores";

import styles from "./CharactersCards.module.css";

const CharactersCards: FC = () => (
  <div>
    <h3>Персонажи:</h3>
    <div className={styles["characters-cards"]}>
      {useList($currentCharacters, (character) => (
        <Character character={character} />
      ))}
    </div>
  </div>
);

export { CharactersCards };
