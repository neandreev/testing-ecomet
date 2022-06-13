import { FC } from "react";
import styles from "./Heading.module.css";

interface HeadingPropsI {
  text: string;
}

const Heading: FC<HeadingPropsI> = ({ text }) => (
  <div className={styles.heading}>
    <h1>{text}</h1>
  </div>
);

export { Heading };
