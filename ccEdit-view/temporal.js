let timeFunctions = {};
let counter = 0;
let then = 0;

function timer() {
  requestAnimationFrame(timer);
  const now = Date.now();
  // timeArr.forEach((v) => v(then, now));
  for (let f in timeFunctions) {
    const curr = timeFunctions[f];
    curr.func(then, now, curr);
  }
  then = now;
}
timer();

const addTimeFunc = (name, func) => {
  timeFunctions[name] = { func, name };
  counter += 1;
};

const t = {};
t.osc = (v, mag, freq, name = counter) => {
  const oldV = w[v];
  if (timeFunctions[name]) delete timeFunctions[name];
  const fn = (_, now) => {
    const s = Math.sin((now / 1000) * freq * Math.PI * 2) * mag;
    w[v] = oldV + Number(s.toFixed(2));
  };
  addTimeFunc(name, fn);
};

t.ramp = (v, target, duration, name = counter) => {
  const oldV = w[v];
  const difference = target - oldV;
  const fn = (then, now, me) => {
    const currentV = w[v];
    if (
      (target > oldV && currentV >= target) ||
      (target < oldV && currentV <= target)
    )
      return delete timeFunctions[me.name];
    // work out how much time has passed
    const timePassed = now - then;
    // console.log(timePassed);
    // work out what % this is of duration
    const segment = timePassed / duration;
    const inc = difference * segment;
    w[v] += Number(inc.toFixed(3));

    // work out how much to add to v
  };
  addTimeFunc(name, fn);
};

t.stop = (name) => {
  if (timeFunctions[name]) {
    delete timeFunctions[name];
  }
};

t.kill = () => {
  timeFunctions = {};
};

//////       TEMPORAL VARIABLES
/*
- At the moment these are just a poor mans atom.
- Implementing my own atom might be adviseable and will make the API cleaner.
  - E.g. for temporal functions I wont have to pass string variables. I could pass the atom instead.
*/
const w = window;
w.a = 0;
w.b = 0;
w.c = 0;
w.d = 0;
w.e = 0;
w.f = 0;
const wa = (v = null) => (v ? (w.a = v) : () => w.a);
const wb = (v = null) => (v ? (w.b = v) : () => w.b);
const wc = (v = null) => (v ? (w.c = v) : () => w.c);
const wd = (v = null) => (v ? (w.d = v) : () => w.d);
const we = (v = null) => (v ? (w.e = v) : () => w.e);
const wf = (v = null) => (v ? (w.f = v) : () => w.f);

export { wa, wb, wc, wd, we, wf, t };
