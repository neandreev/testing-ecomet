import { FC } from "react";
import { useStore } from "effector-react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { toggleTableColumn } from "../../state/events";
import { $tableState } from "../../state/stores";

import { TableColumnsI } from "../../types";

const TableTogglers: FC = () => {
  const { tableColumns } = useStore($tableState);
  const tableColumnsEntries = Object.entries(tableColumns);

  const toggleTableColHandler = (columnName: TableColumnsI) => (e: any) => {
    toggleTableColumn(columnName);
  };

  return (
    <ButtonGroup>
      {tableColumnsEntries.map(([colName, colState]) => (
        <ToggleButton
          variant='outline-primary'
          type='checkbox'
          checked={colState.isVisible}
          value={colName}
          onClick={toggleTableColHandler(colName as TableColumnsI)}
        >
          {colState.visibleName}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export { TableTogglers };
