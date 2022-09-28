// temporal functions execute a side effect and then return their updated state
let temporalFunctions = [];

let then;
let runAnimation = false;
let idCounter = 0;
let addedHistory = [];
const animationLoop = (now) => {
  if (then === undefined) then = now;
  const elapsed = now - then;
  then = now;
  temporalFunctions = temporalFunctions.map((v) => v.update(v, elapsed));

  if (runAnimation) window.requestAnimationFrame(animationLoop);
};

export const start = () => {
  runAnimation = true;
  animationLoop();
};

export const stop = () => {
  runAnimation = false;
};

export const kill = (timeObj) => {
  if (timeObj) {
    temporalFunctions = temporalFunctions.filter((v) => v.id !== timeObj.id);
    addedHistory = addedHistory.filter((v) => v.id !== timeObj.id);
  } else {
    const lastId = addedHistory.pop();
    temporalFunctions = temporalFunctions.filter((v) => v.id !== lastId);
  }
};

export const killAll = () => {
  temporalFunctions = [];
  addedHistory = [];
};

const addId = () => {
  const id = idCounter;
  idCounter += 1;
  addedHistory.push(id);
  return id;
};

// triggers a sequence of function at an interval
export const triggerSeq = (seq, interval) => {
  const timeObj = {
    id: addId(),
    nextTick: 0,
    tickCounter: Infinity,
    interval,
    seq,
    nextIndex: 0,
    update(v, elapsed) {
      v.tickCounter += elapsed;
      if (v.tickCounter > interval) {
        v.seq[v.nextIndex]();
        const newIndex = (v.nextIndex + 1) % v.seq.length;
        v.nextIndex = newIndex;
        v.tickCounter = 0;
      }
      return v;
    },
  };
  temporalFunctions.push(timeObj);
  return timeObj;
};
