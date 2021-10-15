title = "BASEBALL";

description = `
[Tap] Swing
`;

characters = [
  `
 lll
lr rl 
l r l
lr rl
 lll
`,
  `
  r
 lll
lllll
lllll
lllll
 lll
`
];

let startTime;
let num = 1;

options = {
  theme: 'simple'
};


/**
 * @typedef {{
 * pos: Vector
 * }} Ball
 */

/**
* @type { Ball [] }
*/
let balls;

/**
* @type { number }
*/
let ballSpeed;

/**
* @type { number }
*/
let waveCount;

/**
 * @typedef {{
 * pos: Vector
 * }} Bomb
 */

/**
* @type { Bomb [] }
*/
let bombs;


const G = {
  BALL_MIN_BASE_SPEED: 1,
  BALL_MAX_BASE_SPEED: 1.5,
  WIDTH: 100,
  HEIGHT: 150
};

function update() {
  if (!ticks) {
    balls = [];
    waveCount = 0;
    ballSpeed = 0;
    bombs = [];
    startTime = Date.now();
  }

  if (balls.length === 0) {
    ballSpeed =
      rnd(G.BALL_MIN_BASE_SPEED, G.BALL_MAX_BASE_SPEED) * difficulty;
    for (let i = 0; i < 9; i++) {
      const posX = rnd(0, G.WIDTH);
      const posY = -rnd(i * G.HEIGHT * 0.1);
      balls.push({ pos: vec(posX, posY) })
    }
  }
  remove(balls, (ba) => {
    ba.pos.y += ballSpeed;
    char("a", ba.pos);

    return (ba.pos.y > G.HEIGHT);
  });
  console.log(ballSpeed);

  if (bombs.length === 0) {
    ballSpeed =
      rnd(G.BALL_MIN_BASE_SPEED, G.BALL_MAX_BASE_SPEED) * difficulty;
    for (let i = 0; i < 3; i++) {
      const posX = rnd(0, G.WIDTH);
      const posY = -rnd(i * G.HEIGHT * 0.1);
      bombs.push({ pos: vec(posX, posY) })
    }
  }
  remove(bombs, (bo) => {
    bo.pos.y += ballSpeed;
    char("b", bo.pos);

    return (bo.pos.y > G.HEIGHT);
  });

  color("yellow");
  if (input.isJustPressed) {
    play("laser"); //change the sound later
    line(30, 80, 46, 64, 3);
  } else {
    line(30, 80, 46, 96, 3);
  }

  color("light_black");
  text("Time Left:", 14, 10);
  num = Math.floor(61 - ((Date.now() - startTime) / 1000));
  if (num <= 0) {
    end();
  }
  text(num.toString(), 77, 10);

}
