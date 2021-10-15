title = "Baseball Game";

description = `
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
    bombs = []
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
//text(balls.length.toString(), 3, 10);

}
