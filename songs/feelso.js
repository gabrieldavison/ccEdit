// DECLARE
r();

w.a = true;
w.p5Draw = (p) => {
  p.frameRate(10);
  p.clear();
  p.background(0);
  p.fill("rgba(0,0,0,0)");
  p.stroke(250);
  p.strokeWeight(2);
  const maxSize = p.height / 1.1;
  let i = maxSize;
  while (i > 0) {
    i -= 10;
    const centering = maxSize / 2;
    const offset = Math.random() * 10;
    w.a
      ? p.rect(p.width / 2 - centering, p.height / 2 - centering, i, i)
      : p.rect(
          p.width / 2 - centering,
          p.height / 2 - centering,
          i + offset,
          i + offset
        );
  }
};
w.moveLines = () => {
  triggerSeq([() => (w.a = !w.a), () => (w.a = !w.a)], 600);
};
w.initBox = () => src(s1).modulate(osc(100, 0.01).pixelate(10), 0.1).out(); // init
w.oscLines = () => src(s1).modulate(osc(100, 0.01).pixelate(500), 0.1).out(); // init
w.spreadOscLines = () => {
  src(s1).modulate(osc(100, 0.01).pixelate(100), 0.4).out();
};
w.spreadOscLines2 = () => {
  src(s1)
    .modulate(osc(100, 0.01).pixelate(200), 0.4)
    .modulate(osc(10).diff(o0).rotate(25))
    .out();
};
w.spreadOscLines3 = () => {
  src(s1)
    .modulate(osc(100, 0.01).pixelate(200), 0.4)
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .out();
};
w.seqSpreadLines = () => {
  triggerSeq([rand(w.spreadOscLines2, 0.5), rand(w.spreadOscLines3, 0.5)], 400);
};
w.spreadOscLines2Invert = () => {
  src(s1)
    .modulate(osc(100, 0.01).pixelate(200), 0.4)
    .modulate(osc(10).diff(o0).rotate(25))
    .invert()
    .out();
};
w.spreadOscLines3Invert = () => {
  src(s1)
    .modulate(osc(100, 0.01).pixelate(200), 0.4)
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .invert()
    .out();
};
w.seqSpreadLinesInvert = () => {
  triggerSeq(
    [
      rand(w.spreadOscLines2, 0.6),
      rand(w.spreadOscLines2Invert, 0.1),
      rand(w.spreadOscLines3, 0.6),
      rand(w.spreadOscLines3Invert, 0.1),
    ],
    400
  );
};
w.initBox();

// TRIGGER

w.initBox();

w.moveLines();

w.oscLines();

w.spreadOscLines();

w.spreadOscLines2();

w.spreadOscLines3();

w.seqSpreadLines();

w.seqSpreadLinesInvert();

killAll();

lb(2);

sb(1);
