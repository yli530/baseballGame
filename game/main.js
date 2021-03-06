title = "BASEBALL";

description = `
[Tap] Swing
AVOID BOMB
`;

characters = [
  `
 lll
lC Cl 
l C l
lC Cl
 lll
`,
  `
  R
 LLL
LLLLL
LLLLL
LLLLL
 LLL
`,
  `
  ll
  ll l
llllll
 llll
 l  l
`
];

let startTime;
let num = 1;
let rotate = 0;
let swinging = false;
let swingPos = { x: 0, y: 0 }
let stunned;

options = {
  theme: 'shapeDark',
  isPlayingBgm: true,
  seed: 1, 

  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function update() {
  if (!ticks) {
    balls = [];
    waveCount = 0;
    ballSpeed = 0;
    bombs = [];
    startTime = Date.now();
  }

  if(stunned) {
    color("light_red");
  } else {
    color("light_black");
  }
  char('c', 
       (input.pos.x < 0) ? 4 : ((input.pos.x > G.WIDTH) ? G.WIDTH - 4 : input.pos.x), 
       input.pos.y);

  color("yellow");
  if (input.isJustPressed && !swinging && !stunned) {
    swinging = true;
  }

  if (input.isJustPressed && stunned) {
    play("select");
  }
  if (swinging && !stunned) {
    bar(input.pos.x + 3, input.pos.y, 15, 2, (rotate + 30) * Math.PI / 180, 0);
    rotate -= 8; //speed of swing
    if (rotate < -90) {
      swinging = false;
      rotate = 0;
    }
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
    color("black");
    const collideWithBat = char("a", ba.pos).isColliding.rect.yellow;

    if (collideWithBat) {
      play("coin");
      addScore(10, ba.pos);
      if(score % 250 == 0) {
        startTime += 5000;
      }
    }

    return (collideWithBat || ba.pos.y > G.HEIGHT);
  });

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
    color("black");
    bo.pos.y += ballSpeed;
    char("b", bo.pos);

    const collideWithBat = char("b", bo.pos).isColliding.rect.yellow;

    if (collideWithBat) {
      color("red");
      particle(bo.pos);
      play("explosion");
      stunned = 1;
      swinging = false;
      rotate = 0;
      sleep(3000).then(() => {
        ; //3 seconds
        console.log("stunned!");
        stunned = 0;
      });


    }
    return (collideWithBat || bo.pos.y > G.HEIGHT);
  });

  color("light_black");
  text("Time Left:", 14, 10);
  num = Math.floor(61 - ((Date.now() - startTime) / 1000));
  if (num <= 0) {
    end();
  }
  text(num.toString(), 77, 10);
}