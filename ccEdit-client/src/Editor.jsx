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
  const { send, saveEditorState, loadEditorState, loadedState } = useSocket();

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

  // Save buffer to text file on disk via server
  const saveBuffer = (slot) => {
    const editorState = getBuffer();
    saveEditorState(slot, editorState);
  };

  const loadBuffer = (slot) => {
    loadEditorState(slot);
  };

  const broadcast = (s) => {
    const trimmedS = s.trim();
    const sbRe = /sb\([0-9]+\)/;
    const isCallToSB = sbRe.test(trimmedS);
    if (isCallToSB) {
      const bufferNumber = s.match(/\d+/)[0];
      // Check number is not empty string i.e. no match
      if (bufferNumber !== "") {
        saveBuffer(Number(bufferNumber));
      }
      return;
    }
    const lbRe = /lb\([0-9]+\)/;
    const isCallToLB = lbRe.test(trimmedS);
    if (isCallToLB) {
      const bufferNumber = s.match(/\d+/)[0];
      // Check number is not empty string i.e. no match
      if (bufferNumber !== "") {
        loadBuffer(Number(bufferNumber));
      }
      return;
    }

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
    const numLines = view.state.doc.lines;
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
    if (view && loadedState !== "") {
      console.log("condition met");
      console.log(loadedState);
      let transaction = view.state.update({
        changes: { from: 0, to: view.state.doc.length, insert: loadedState },
      });
      view.dispatch(transaction);
    }
  }, [loadedState]);

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
