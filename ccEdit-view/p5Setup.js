import p5 from "p5";

const p5SetupWithInit = (p) => {
  window.p5Setup(p);
  s1.init({ src: document.getElementById("defaultCanvas0") });
};

export const p5Setup = () => {
  console.log("p5Steup runs");
  window.p5Setup = (p) => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  window.p5Draw = (p) => {};
  window._p5Draw = (p) => window.p5Draw(p);

  // window.p5Draw = (p) => {
  //   p.rectMode(p.CENTER);
  //   p.fill("rgba(0,0,0,0)");
  //   p.stroke(255);

  //   const s = 200;
  //   let i = s;
  //   while (i > 0) {
  //     i -= 10;
  //     const offSet = Math.random() * 10;
  //     // p.rect(x, y, i + offSet, i + offSet);
  //     p.rect(p.windowWidth / 2, p.windowHeight / 2, i, i);
  //   }
  // };

  const s = (p) => {
    p.setup = () => p5SetupWithInit(p);
    p.draw = () => window._p5Draw(p);
  };

  // expects there to be a div with id p5-wrapper
  new p5(s, "p5-wrapper");
};
