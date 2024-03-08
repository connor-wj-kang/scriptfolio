import { FC, useRef } from "react";
import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface CodeEditorProps extends EditorProps {}

const CodeEditor: FC<CodeEditorProps> = ({ ...rest }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      onMount={handleEditorDidMount}
      height="100%"
      width="100%"
      {...rest}
    ></Editor>
  );
};

export default CodeEditor;
