import { FC, ReactElement } from "react";

import styles from "./LabelWrapper.module.css";

interface LabelWrapperPropsI {
  label: string;
  children: ReactElement;
}

const LabelWrapper: FC<LabelWrapperPropsI> = ({ label, children }) => (
  <div className={styles["label-wrapper"]}>
    <span className={styles["label-wrapper__label"]}>{label}</span>
    {children}
  </div>
);

export { LabelWrapper };
