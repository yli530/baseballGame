title = "game";

description = `
`;

characters = [];

let startTime;
let num = 1;

options = {
  theme: 'pixel'
};

function update() {
  if (!ticks) {
    startTime = Date.now();
  }

  text("Time Left:", 14, 10);
  num = Math.floor(61 - ((Date.now() - startTime) / 1000));
  if(num == 0) {
    end();
  }
  text(num.toString(), 77, 10);
}