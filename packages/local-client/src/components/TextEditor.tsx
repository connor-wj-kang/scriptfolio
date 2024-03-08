import { FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell, updateCell } from "@/store";
import { useAppDispatch } from "@/hooks";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!editorRef.current) {
        return;
      }
      if (!editorRef.current?.contains(e.target as Node)) {
        setEditing(false);
      }
    };

    window.addEventListener("click", listener, true);
    return () => {
      window.removeEventListener("click", listener, true);
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef} className="h-full w-full">
        <MDEditor
          value={cell.content}
          onChange={(text) =>
            dispatch(updateCell({ id: cell.id, content: text || "" }))
          }
          height="100%"
        ></MDEditor>
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing((editing) => !editing)}
      className="h-full w-full p-10"
    >
      <MDEditor.Markdown
        source={cell.content || "# Click to edit"}
      ></MDEditor.Markdown>
    </div>
  );
};

export default TextEditor;
