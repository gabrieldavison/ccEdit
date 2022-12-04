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
  w.logo = await glb(0, 0, -6, models.logo);
  src(s0)
    .modulate(osc(10000), 0.01)
    .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
    .out();
};
w.oscLogoSpin = async () => {
  killAll();
  remove(w.logo);
  w.logo = await glb(0, 0, -6, models.logo);
  w.logo.update = (o) => {
    o.t.rotation.y += 0.001;
  };
  src(s0)
    .modulate(osc(10000), 0.01)
    .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
    .out();
};
w.oscLogoSeq1 = () => {
  w.logo.update = (o) => {
    o.t.rotation.y += 0.001;
  };
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
w.oscLogoSpinWash = () => {
  killAll();
  src(s0)
    .modulate(osc(10000), 0.01)
    .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
    .modulate(src(s0), 0.1)
    .out();
};
w.oscLogoSeq1Inv = () => {
  w.logo.update = (o) => {
    o.t.rotation.y += 0.001;
  };
  src(s0)
    .modulate(osc(10000), 0.01)
    .modulate(voronoi(10).modulate(osc(10)).pixelate(200, 200), 0.1)
    .diff(osc(1000))
    .contrast(20)
    .out();
};
w.oscLogoSeq2Inv = () => {
  src(s0)
    .modulate(osc(1000), 0.01)
    .add(src(o0).modulate(osc(10)), 0.7)
    .diff(osc(1000))
    .contrast(20)
    .out();
};
w.oscLogoSeq3Inv = () => {
  src(s0).modulate(voronoi(3), 0.6).diff(osc(1000)).contrast(20).out();
};
w.oscLogoSeq4Inv = () => {
  src(s0)
    .modulate(noise(5), 0.2)
    .pixelate(200, 200)
    .diff(osc(1000))
    .contrast(20)
    .out();
};
w.oscLogoSeqInv = () => {
  killAll();
  triggerSeq(
    [
      rand(w.oscLogoSeq1Inv, 0.5),
      rand(w.oscLogoSeq2Inv, 0.5),
      rand(w.oscLogoSeq3Inv, 0.5),
      rand(w.oscLogoSeq4Inv, 0.5),
    ],
    400
  );
};
// this is the init function
w.seqSpreadLines();

// TRIGGER

w.seqSpreadLines();

await w.oscLogo();

w.oscLogoSeq();

await w.oscLogoSpin();

w.oscLogoSpinWash();

w.oscLogoSeqInv();

killAll();

w.oscLogoSeq4Inv();

w.oscLogoSeq1Inv();

// SCRATCH

w.logo.update = (o) => {
  o.t.rotation.y += 0.001;
};

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

/////////////////////////// IJWLY ////////////////////////////////

sb(3);

r();

hush();

killAll();

// DECLARE

src(s0).pixelate(200, 200).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();

src(s0).pixelate(15, 15).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();

src(s0).pixelate(50, 50).out();

w.downSize = () => {
  w.a = 0.998;
};
w.upSize = () => {
  w.a = 1.002;
};
w.smallBallBigPix = () => {
  w.a = 1;
  w.shape = wireSphere(0, 0, -10, 5, 8);
  w.shape.update = (o) => {
    o.t.rotation.x += 0.0001;
    o.t.rotation.y += 0.0001;
    o.t.scale.multiplyScalar(w.a);
  };
  src(s0).pixelate(10, 10).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();
};
w.bigBallBigPix = () => {
  remove(w.shape);
  w.shape = wireSphere(0, 0, -10, 10, 8);
  w.shape.update = (o) => {
    o.t.rotation.x += 0.0001;
    o.t.rotation.y += 0.0001;
  };
  src(s0).pixelate(10, 10).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();
};
w.movingBallThinPix = () => {
  remove(w.shape);
  w.shape = wireSphere(0, 0, -10, 5, 8);
  w.shape.update = (o) => {
    o.t.rotation.x += 0.0001;
    o.t.rotation.y += 0.0001;
    o.t.scale.multiplyScalar(w.a);
  };
  killAll();
  triggerSeq([w.upSize, w.downSize], 10000);
  src(s0).pixelate(20, 50).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();
};
w.bigBallThinPix = () => {
  remove(w.shape);
  w.shape = wireSphere(0, 0, -10, 10, 8);
  w.shape.update = (o) => {
    o.t.rotation.x += 0.0002;
    o.t.rotation.y += 0.0002;
    // o.t.scale.multiplyScalar(w.a)
  };
  // triggerSeq([w.upSize,w.downSize], 10000)
  src(s0).pixelate(20, 50).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();
};
w.bigBallSmallPix = () => {
  remove(w.shape);
  w.shape = wireSphere(0, 0, -10, 10, 8);
  w.shape.update = (o) => {
    o.t.rotation.x += 0.0004;
    o.t.rotation.y += 0.0004;
  };
  src(s0).pixelate(100, 100).blend(src(o0)).blend(src(o0)).out();
};
w.ballSequence = () => {
  triggerSeq(
    [
      rand(w.movingBallThinPix, 0.5),
      rand(w.bigBallThinPix, 0.5),
      rand(w.bigBallSmallPix, 0.3),
      rand(w.bigBallBigPix, 0.8),
    ],
    400
  );
};
w.end = () => {
  remove(w.shape);
  w.a = 1;
  w.shape = wireSphere(0, 0, -10, 4, 8);
  w.shape.update = (o) => {
    o.t.rotation.x += 0.0001;
    o.t.rotation.y += 0.0001;
    o.t.scale.multiplyScalar(w.a);
  };
  src(s0).pixelate(30, 30).blend(src(o0)).blend(src(o0)).blend(src(o0)).out();
};

// TRIGGER

r();

w.smallBallBigPix();

w.bigBallBigPix();

w.movingBallThinPix();

w.bigBallThinPix();

w.bigBallSmallPix(); //ignore

w.ballSequence();

w.end();

killAll();
