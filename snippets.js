/// Rotating Cube

w.cbe = cube(100, 0, 0, -100);

w.cbe.update = (o) => {
  o.t.rotation.x += 0.001;
  o.t.rotation.y += 0.0005;
};

/// Big Spinning 3D img

w.myObj = await glb(testglb);

w.myObj.update = (obj) => {
  obj.t.rotation.x += 0.001;
};

//////////////////////////

w.cbe = cube(0, 0, -100, 100);

w.cbe.update = (o) => {
  o.t.rotation.x += 0.01;
  o.t.rotation.y += 0.01;
};

w.cbe.t.position.z = -200;

wa(10);

src(s0).repeatX(4).repeatY(4).diff(src(o0)).out();

osc(wa()).out();

///////////////////////

window.p5Draw = (p) => {
  p.background(0);
  p.rectMode(p.CENTER);
  p.fill("rgba(0,0,0,0)");
  p.stroke(255);
  const s = 200;
  let i = s;
  while (i > 0) {
    i -= 10;
    const offSet = Math.random() * 20;
    p.rect(p.windowWidth / 2, p.windowHeight / 2, i + offSet, i + offSet);
    // p.rect(p.windowWidth / 2, p.windowHeight / 2, i, i);
  }
};

a(10).forEach((_, i) => {
  let s = canvasPlane(
    0,
    0,
    -(i * 10 + 150),
    threeCanvas.width,
    threeCanvas.height
  );
  s.update = (o) => {
    o.t.rotation.x += 0.01;
    o.t.rotation.y += 0.01;
    // o.t.translateZ(0.3)
  };
});

src(s0).out();

///////////////// with buffers

lb(1);

w.z = triggerSeq([() => console.log("1"), () => console.log("2")], 500);

kill();

window.p5Draw = (p) => {
  p.clear();
  p.rectMode(p.CENTER);
  p.fill("rgba(0,0,0,0)");
  p.stroke(255);
  const s = 200;
  let i = s;
  while (i > 0) {
    i -= 10;
    const offSet = Math.random() * 20;
    // p.rect(p.windowWidth / 2, p.windowHeight / 2,i + offSet, i + offSet);
    p.rect(p.windowWidth / 2, p.windowHeight / 2, i, i);
  }
};

window.p5Draw = (p) => {
  p.clear();
  p.rectMode(p.CENTER);
  p.fill("rgba(0,0,0,0)");
  p.stroke(255);
  const s = 200;
  let i = s;
  while (i > 0) {
    i -= 10;
    const offSet = Math.random() * 200;
    p.rect(p.windowWidth / 2, p.windowHeight / 2, i + offSet, i + offSet);
    // p.rect(p.windowWidth / 2, p.windowHeight / 2, i, i);
  }
};

a(10).forEach((_, i) => {
  let s = canvasPlane(
    0,
    0,
    -(i * 10 + 150),
    threeCanvas.width,
    threeCanvas.height
  );
  s.t.rotation.x += i * 12;
  s.update = (o) => {
    o.t.rotation.x += 0.01;
    o.t.rotation.y += 0.01;
    // o.t.translateZ(0.3)
  };
});

src(s0).diff(o0).out();

////////

r();

w.a = await glb(0, 0, -5, models.logo);

w.a.update = (o) => {
  o.t.rotation.y += 0.01;
};

let a = () => src(s0).modulate(osc(100)).contrast(2).out();
let b = () =>
  src(s0)
    .modulate(osc(1))
    .diff(src(o0).modulate(osc(10000)), 0.1)
    .contrast(2)
    .out();
let c = () => src(s0).modulate(voronoi(8)).contrast(2).out();
triggerSeq([a, b, c], 1000);

killAll();

//////////////////////// FEEL SO ///////////////////////////////////

sb(1);

r();

hush();

// DECLARE

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

src(s1)
  .modulate(osc(100, 0.01).pixelate(200), 0.4)
  .modulate(osc(10).diff(o0).rotate(25))
  .modulate(osc(10).diff(o0).rotate(25))
  .modulate(osc(10).diff(o0).rotate(25))
  .modulate(osc(10).diff(o0).rotate(25))
  .out();

// With this one I need some variation to give it a bit mor interest
src(s1)
  .modulate(osc(100, 0.01).pixelate(100), 0.1)
  .modulate(osc(10).pixelate(20).rotate(90))
  .diff(src(o0))
  .out();

//// SCRATCH

w.p1 = canvasPlane(0, 0, -50, 200, 100);
w.p1.update = (o) => {
  o.t.rotation.y += 0.01;
  o.t.rotation.x += 0.01;
};

/////////////////////// OOH AH //////////////////////////////
sb(2);

r();

hush();

remove(w.logo);

killAll();

// DECLARE
killAll();
w.logo = await glb(0, 0, -7, models.logo);
w.logo.update = (o) => {
  o.t.rotation.y += 0.001;
};
w.spreadOscLines2 = () => {
  src(s0)
    .modulate(osc(100, 0.01).pixelate(200), 0.4)
    .modulate(osc(500).diff(o0).rotate(25), 0.05)
    .diff(src(s0))
    .out();
};
w.spreadOscLines3 = () => {
  src(s0)
    .modulate(osc(100, 0.01).pixelate(200), 0.4)
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .modulate(osc(10).diff(o0).rotate(25))
    .diff(src(s0))
    .out();
};
w.seqSpreadLines = () => {
  triggerSeq([rand(w.spreadOscLines2, 0.5), rand(w.spreadOscLines3, 0.5)], 400);
};
w.oscLogo = async () => {
  killAll();
  remove(w.logo);
  w.logo = await glb(0, 0, -5, models.logo);
  src(s0)
    .modulate(osc(10000), 0.01)
    .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
    .out();
};
w.oscLogoSeq1 = () => {
  src(s0)
    .modulate(osc(10000), 0.01)
    .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
    .out();
};
w.oscLogoSeq2 = () => {
  src(s0)
    .modulate(osc(1000), 0.01)
    .add(src(o0).modulate(osc(10)), 0.7)
    .out();
};
w.oscLogoSeq3 = () => {
  src(s0).modulate(voronoi(3), 0.3).out();
};
w.oscLogoSeq4 = () => {
  src(s0).modulate(noise(5), 0.2).out();
};
w.oscLogoSeq = () => {
  triggerSeq(
    [
      rand(w.oscLogoSeq1, 0.5),
      rand(w.oscLogoSeq2, 0.5),
      rand(w.oscLogoSeq3, 0.5),
      rand(w.oscLogoSeq4, 0.5),
    ],
    400
  );
};
// this is the init function
w.seqSpreadLines();

// TRIGGER

w.seqSpreadLines();

await w.oscLogo();

w.oscLogoSeq3();

w.oscLogoSeq();

// SCRATCH

src(s0)
  .modulate(osc(10000), 0.01)
  .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
  .diff(osc(1000))
  .contrast(20)
  .out();

src(s0)
  .modulate(osc(1000), 0.01)
  .add(src(o0).modulate(osc(10)), 0.7)
  .diff(osc(1000))
  .contrast(20)
  .out();

src(s0).modulate(voronoi(3), 0.6).diff(osc(1000)).contrast(20).out();

src(s0)
  .modulate(noise(5), 0.2)
  .pixelate(200, 200)
  .diff(osc(1000))
  .contrast(20)
  .out();
