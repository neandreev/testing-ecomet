import { FC } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { CharacterI } from "../../types";

import styles from "./Character.module.css";

interface CharacterPropsI {
  character: CharacterI;
}

const Character: FC<CharacterPropsI> = ({ character }) => {
  return (
    <Card className={styles["character-card"]}>
      <Card.Img variant='top' src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
      </Card.Body>
      <ListGroup variant='flush'>
        <ListGroup.Item>Статус: {character.status}</ListGroup.Item>
        <ListGroup.Item>Пол: {character.gender}</ListGroup.Item>
        <ListGroup.Item>Вид: {character.species}</ListGroup.Item>
        <ListGroup.Item>
          Местоположение: {character.location.name}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export { Character };
