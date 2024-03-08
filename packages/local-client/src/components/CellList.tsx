import { useAppDispatch, useAppSelector } from "@/hooks";
import { FC, Fragment, Suspense, lazy, useEffect } from "react";
import AddCell from "./AddCell";
import { fetchCells, saveCells } from "@/store";
import CellItemSkeleton from "./CellItemSkeleton";

const CellListItem = lazy(() => import("./CellListItem"));
interface CellListProps {}

const CellList: FC<CellListProps> = ({}) => {
  const cells = useAppSelector((state) => {
    const { order, data } = state.cell;
    return order.map((id) => data[id]);
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCells());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(saveCells(cells));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [JSON.stringify(cells)]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <Suspense fallback={<CellItemSkeleton></CellItemSkeleton>}>
        <CellListItem cell={cell}></CellListItem>
      </Suspense>
      <AddCell previousCellId={cell.id}></AddCell>
    </Fragment>
  ));

  return (
    <>
      <AddCell
        key={"first add cell"}
        previousCellId={null}
        forceVisible={renderedCells.length === 0}
      ></AddCell>
      {renderedCells}
    </>
  );
};

export default CellList;
