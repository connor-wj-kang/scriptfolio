import { Cell } from "@/store";
import { FC } from "react";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";
import { Resizable } from "re-resizable";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  let child;
  if (cell.type === "code") {
    child = <CodeCell cell={cell}></CodeCell>;
  } else {
    child = <TextEditor cell={cell}></TextEditor>;
  }

  return (
    <Resizable
      defaultSize={{
        width: "90vw",
        height: "25vh",
      }}
      bounds="window"
      className="container overflow-hidden rounded-[0.5rem] border bg-background p-0 shadow-md md:shadow-xl"
    >
      <ActionBar id={cell.id}></ActionBar>
      {child}
    </Resizable>
  );
};

export default CellListItem;
