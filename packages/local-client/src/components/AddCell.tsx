import { useAppDispatch } from "@/hooks";
import { FC } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { insertCellAfter } from "@/store";
import { cn } from "@/lib/utils";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({
  previousCellId: nextCellId,
  forceVisible,
}) => {
  const dispatch = useAppDispatch();
  const style = cn(
    "opacity-0 container relative py-10 flex justify-center gap-10 transition-all duration-200 ease-in hover:opacity-100",
    { "opacity-100": forceVisible },
  );

  return (
    <div className={style}>
      <Button
        variant="secondary"
        onClick={() =>
          dispatch(
            insertCellAfter({
              id: nextCellId,
              type: "code",
            }),
          )
        }
        size="sm"
      >
        + Code
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          dispatch(
            insertCellAfter({
              id: nextCellId,
              type: "text",
            }),
          )
        }
        size="sm"
      >
        + Text
      </Button>
      <Separator className="absolute bottom-1/2 left-[5%] top-1/2 -z-10 w-[90%]"></Separator>
    </div>
  );
};

export default AddCell;
