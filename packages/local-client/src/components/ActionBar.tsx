import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteCell, moveCell, updateCell } from "@/store";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, RemoveFormatting, X } from "lucide-react";
import prettier from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown";

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.cell.data[id].type);
  const input = useAppSelector((state) => state.cell.data[id].content);

  const formatCode = async () => {
    const result = await prettier.format(input, {
      parser: "babel",
      plugins: [babel, estree],
    });
    dispatch(updateCell({ id, content: result }));
  };

  return (
    <div className="flex h-9 items-center justify-end space-x-1 rounded-none border border-b border-none bg-background/95 p-1 px-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-base font-extrabold">
            Edit
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {type === "code" && (
            <>
              <DropdownMenuItem onClick={formatCode}>
                <RemoveFormatting className="mr-2 h-4 w-4" />
                <span>Format Code</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
            </>
          )}
          <DropdownMenuItem
            onClick={() => dispatch(moveCell({ id, direction: "up" }))}
          >
            <ChevronUp className="mr-2 h-4 w-4" />
            <span>Move Up</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(moveCell({ id, direction: "down" }))}
          >
            <ChevronDown className="mr-2 h-4 w-4" />
            <span>Move Down</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={() => dispatch(deleteCell(id))}>
            <X className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionBar;
