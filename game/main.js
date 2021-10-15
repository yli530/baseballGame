title = "BASEBALL";

description = `
[Tap] Swing
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

  color("yellow");
  if (input.isJustPressed) {
    play("laser"); //change the sound later
    line(50, 50, 66, 36, 5);
  } else {
    line(50, 50, 66, 66, 5);
  }

  text("Time Left:", 14, 10);
  num = Math.floor(61 - ((Date.now() - startTime) / 1000));
  if(num < 0) {
    end();
  }
  text(num.toString(), 77, 10);
}