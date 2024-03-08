import { FC } from "react";
import { Skeleton } from "./ui/skeleton";

interface CellItemSkeletonProps {}

const CellItemSkeleton: FC<CellItemSkeletonProps> = ({}) => {
  return <Skeleton className="container h-[25vh] w-[90vw]"></Skeleton>;
};

export default CellItemSkeleton;
