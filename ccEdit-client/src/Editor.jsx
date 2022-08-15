import "./index.css";
import { useEffect, useRef } from "react";
import { vim } from "@replit/codemirror-vim";

import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import useSocket from "./useSocket";

const getFromLocalStorage = () => {
  return localStorage.getItem("editorContent");
};

export default function ({
  pushQueue,
  popQueue,
  previewMode,
  togglePreviewMode,
}) {
  // Utils
  const { send } = useSocket();

  const getSelection = () => {
    const r = view.state.selection.ranges[0];
    const s = view.state.doc.slice(r.from, r.to).toString();
    return s;
  };

  const getBuffer = () => {
    const s = view.state.doc.toString();
    return s;
  };

  const queueBuffer = () => {
    pushQueue(getBuffer());
  };

  const saveToLocalStorage = (s) => {
    localStorage.setItem("editorContent", s);
  };

  const broadcast = (s) => {
    console.log(previewMode);
    saveToLocalStorage(getBuffer());
    send(s, previewMode);
  };

  const getBlock = () => {
    const getCursorPosition = () => view.state.selection.ranges[0].from;
    let pos = getCursorPosition();
    let startLine = view.state.doc.lineAt(pos).number;
    let endLine = view.state.doc.lineAt(pos).number;
    while (startLine > 1 && view.state.doc.line(startLine).text !== "") {
      startLine--;
    }
    const numLines = view.state.doc.text.length;
    while (endLine < numLines && view.state.doc.line(endLine).text !== "") {
      endLine++;
    }
    const s = view.state.sliceDoc(
      view.state.doc.line(startLine).from,
      view.state.doc.line(endLine).to
    );
    return s;
  };
  // Keymaps
  const myKeys = () =>
    keymap.of([
      // Eval Buffer
      {
        key: "Ctrl-Shift-Enter",
        run() {
          broadcast(getBuffer());
        },
      },
      // Eval Selection
      {
        key: "Ctrl-Enter",
        run() {
          // broadcast(getSelection());
          broadcast(getBlock());
        },
      },
      // Queue Selection
      {
        key: "Ctrl-,",
        run() {
          pushQueue(getBlock());
        },
      },
      {
        key: "Ctrl-.",
        run() {
          send(popQueue());
        },
      },
      {
        key: "Ctrl-Escape",
        run() {
          togglePreviewMode();
        },
      },
    ]);

  const code = getFromLocalStorage();

  const editor = useRef();
  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions: [javascript(), vim(), myKeys()],
    value: code,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return (
    <div>
      <div ref={editor} />
      <button onClick={getBlock}>log block</button>
    </div>
  );
}
