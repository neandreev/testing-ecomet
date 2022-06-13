import { FC } from "react";
import BootstrapSpinner from "react-bootstrap/Spinner";

const Spinner: FC = () => (
  <BootstrapSpinner animation='border' role='status'>
    <span className='visually-hidden'>Загрузка...</span>
  </BootstrapSpinner>
);

export { Spinner };
