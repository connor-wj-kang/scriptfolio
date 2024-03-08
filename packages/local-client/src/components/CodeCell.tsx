import { FC, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Cell, startBundle, updateCell } from "@/store";
import { useAppDispatch, useAppSelector, useCumulativeCode } from "@/hooks";
import { LoadingSpinner } from "./ui/loading_spinner";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state) => state.bundle[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      dispatch(startBundle({ cellId: cell.id, input: cumulativeCode }));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(startBundle({ cellId: cell.id, input: cumulativeCode }));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, cumulativeCode]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border-t"
    >
      <ResizablePanel defaultSize={50}>
        <CodeEditor
          defaultValue={cell.content}
          value={cell.content}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            },
          }}
          onChange={(input) =>
            dispatch(updateCell({ id: cell.id, content: input || "" }))
          }
        ></CodeEditor>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} className="relative bg-white">
        {!bundle || bundle.loading ? (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err}></Preview>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CodeCell;
