import { FC } from "react";
import Card from "react-bootstrap/Card";
import { CharacterI } from "../../types";

interface CharacterProps {
  character: CharacterI,
};

const Character: FC<CharacterProps> = ({ character }) => {
  console.log(character);

  return (
    <Card style={{ width: "18rem" }} bg="light" text="dark">
      <Card.Img variant="top" src={character.image} />
      <Card.Title>Имя: {character.name}</Card.Title>
      <h3>Статус: {character.status}</h3>
      <h3>Пол: {character.gender}</h3>
      <h3>Вид: {character.species}</h3>
    </Card>
  )
}

export { Character };
