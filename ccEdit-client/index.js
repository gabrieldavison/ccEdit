import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";

import { javascript } from "@codemirror/lang-javascript";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io("http://localhost:3001");
console.log(socket);

const evalBufferKey = () =>
  keymap.of([
    {
      key: "Ctrl-Shift-Enter",
      run() {
        send(getBuffer(), false);
      },
    },
  ]);
const evalSelectionKey = () =>
  keymap.of([
    {
      key: "Ctrl-Enter",
      run() {
        send(getSelection(), false);
      },
    },
  ]);

let view = new EditorView({
  extensions: [basicSetup, javascript(), evalBufferKey(), evalSelectionKey()],
  parent: document.getElementById("app"),
});

let transaction = view.state.update({
  changes: { from: 0, insert: "osc(10).out()" },
});
view.dispatch(transaction);

const getSelection = () => {
  const r = view.state.selection.ranges[0];
  const s = view.state.doc.slice(r.from, r.to).toString();
  return s;
};

const getBuffer = () => {
  const s = view.state.doc.toString();
  return s;
};

const send = (s, preview = false) => {
  console.log(s);
  socket.emit("editorMessage", { preview: preview, message: s });
};

// set it up so everything  goes to preview first then to queue then to main

const queue = [];

const postButton = document.getElementById("post");
const postPreviewButton = document.getElementById("postPreview");
const queueButton = document.getElementById("queue");
const triggerButton = document.getElementById("trigger");

postButton.onclick = () => send(getBuffer(), false);
postPreviewButton.onclick = () => send(getBuffer(), true);
queueButton.onclick = () => {
  queue.push(getSelection());
  console.log(queue);
};
triggerButton.onclick = () => send(queue.pop(), false);
