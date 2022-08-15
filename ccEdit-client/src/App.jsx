import "./index.css";
import Editor from "./Editor";
import { useState } from "react";

export default function () {
  const [queue, setQueue] = useState([]);
  const [previewMode, setPreviewMode] = useState(true);
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const pushQueue = (v) => {
    return setQueue([v, ...queue]);
  };
  const popQueue = () => {
    const newQueue = [...queue];
    const s = newQueue.pop();
    setQueue(newQueue);
    return s;
  };
  const removeQueueItem = (target) => {
    console.log(target);
    const filteredQ = queue.filter((_, i) => i !== target);
    setQueue(filteredQ);
  };
  return (
    <div>
      <iframe
        src="http://localhost:3002/"
        name="preview"
        className="w-[600px] h-[300px] m-auto"
      ></iframe>
      {previewMode ? <h1>PREVIEW</h1> : <h1>LIVE</h1>}
      <Editor
        pushQueue={pushQueue}
        popQueue={popQueue}
        previewMode={previewMode}
        togglePreviewMode={togglePreviewMode}
      />
      <ul>
        {[...queue].reverse().map((item, i) => {
          return (
            <li key={i}>
              {item}
              <button
                className="bg-black hover:bg-white text-white hover:text-black p-1 px-1 rounded border"
                onClick={() => removeQueueItem(i)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
