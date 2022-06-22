import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import useSocket from "./useSocket";

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

  const queueSelection = () => {
    pushQueue(getSelection());
  };

  const broadcast = (s) => {
    console.log(previewMode);
    send(s, previewMode);
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
          broadcast(getSelection());
        },
      },
      // Queue Selection
      {
        key: "Ctrl-q",
        run() {
          queueSelection();
        },
      },
      {
        key: "Ctrl-w",
        run() {
          send(popQueue());
        },
      },
      {
        key: "Escape",
        run() {
          togglePreviewMode();
        },
      },
    ]);

  const editor = useRef();
  const { setContainer, view } = useCodeMirror({
    container: editor.current,
    extensions: [javascript(), myKeys()],
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return (
    <div>
      <div ref={editor} />
    </div>
  );
}
