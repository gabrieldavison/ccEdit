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
  temporalFunctions = temporalFunctions.map((v) => v.update(v, now, elapsed));

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
    update(v, _now, elapsed) {
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

// because js values are pass by reference I need to pass a string as v
// in order to modify widnow variables
// e.g. oscillate('a', 2,100)
//// BROKEN COME BACK TO THIS
export const oscillate = (windowVariable, low, high, time) => {
  const diff = high - low;
  const inc = diff / time;
  const direction = true; // true for up false for down
  const timeObj = {
    low,
    high,
    windowVariable,
    diff,
    inc,
    direction,
    id: addId(),
    update(v, now, elapsed) {
      console.log(window[v.windowVariable]);
      const delta = v.inc * elapsed;
      const deltaDirection = (v.direction = true ? delta : -delta);
      const oldVal = window[v.windowVariable];
      const newVal = oldVal + deltaDirection;
      if (newVal < v.low) {
        const remainder = Math.abs(newVal - v.low);
        v.direction = !v.direction;
        window[v.windowVariable] = v.low + remainder;
        return v;
      }
      if (newVal > v.high) {
        const remainder = Math.abs(newVal - v.high);
        console.log("HIGH");
        console.log(remainder);
        v.direction = !v.direction;
        window[v.windowVariable] = v.high - remainder;
        return v;
      }
      window[v.windowVariable] = newVal;
      return v;
    },
  };
  temporalFunctions.push(timeObj);
  return timeObj;
};
