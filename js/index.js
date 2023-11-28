const game = {
  canvas: null,
  ctx: null,
  intervalId: null,
  road: document.createElement("img"),
  player: document.createElement("img"),
  xPlayer: 230,
  score: -60,
  frames: 0,
  start: function () {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.intervalId = setInterval(update, 60);
    this.road.src = "images/road.png";
    this.player.src = "images/car.png";
  },
  clear: function () {
    this.ctx.clearRect(0, 0, 500, 700);
  },
  stop: function () {
    clearInterval(this.intervalId);
  },
  playerPrint: function () {
    this.ctx.drawImage(this.player, this.xPlayer, 580, 40, 80);
  },
  roadPrint: function () {
    this.ctx.drawImage(game.road, 0, 0, 500, 700);
  },
  scorePrint: function (num) {
    let textToShow;
    if (num < 0) {
      textToShow = "Score: 0";
    } else textToShow = `Score: ${num}`;
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(textToShow, 20, 20);
  },
};

class Rectangle {
  constructor(x, w) {
    this.x = x;
    this.y = -40;
    this.w = w;
    this.h = 40;
  }
  recalculatePosition(moveY) {
    this.y += moveY;
  }
  print() {
    game.ctx.fillStyle = "red";
    game.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

const obstacles = {
  array: [],
  createObstacles: function (framesBetweenObstacles) {
    if (game.frames % framesBetweenObstacles == 0) {
      game.score += 20;
      let x = Math.random() * 400;
      let w = Math.random() * 300;
      let newObstacle = new Rectangle(x, w);
      this.array.push(newObstacle);
    }
  },
  recalculatePosition: function () {
    this.array.forEach((obstacle) => {
      obstacle.recalculatePosition(10);
      if (!(obstacle.y + obstacle.h < 580 || obstacle.x + obstacle.w < game.xPlayer || game.xPlayer + 40 < obstacle.x || 580 + 80 < obstacle.y)) {
        game.stop();
      }
    });
  },
  print: function () {
    this.array.forEach((obstacle) => obstacle.print());
  },
};

const update = () => {
  game.frames++;
  game.clear();
  // update
  obstacles.createObstacles(25);
  obstacles.recalculatePosition();
  // redibujar
  game.roadPrint();
  obstacles.print();
  game.playerPrint();
  game.scorePrint(game.score);
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    game.start();
  };
};

document.body.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    game.xPlayer -= 20;
  }
  if (e.key == "ArrowRight") {
    game.xPlayer += 20;
  }
  if (game.xPlayer < 0) {
    game.xPlayer = 0;
  }
  if (game.xPlayer > 460) {
    game.xPlayer = 460;
  }
});
