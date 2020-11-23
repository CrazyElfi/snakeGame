const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GREEN = '#578a34';
const ORANGE = '#fb8512';

// ctx.moveTo(0,20)
// ctx.lineTo(20,80)
// ctx.lineTo(70,100)
// ctx.stroke()

// const gradient = ctx.createLinearGradient(0,0,200,100)
// gradient.addColorStop(0, 'blue')
// gradient.addColorStop(1, 'red')
//
// ctx.fillStyle =gradient
// ctx.fillRect(10,10,180,80)

const field = new Image();
field.src = 'images/field.png';

const foodImg = new Image();
foodImg.src = 'images/carrot.png';

let box = 32;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if(event.keyCode === 37 && dir !== "right")
    dir = "left";
  else if(event.keyCode === 38 && dir !== "down")
    dir = "up";
  else if(event.keyCode === 39 && dir !== "left")
    dir = "right";
  else if(event.keyCode === 40 && dir !== "up")
    dir = "down";
}

function drawGame() {
  ctx.drawImage(field, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ?  GREEN : ORANGE;
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = '38px Roboto';
  ctx.fillText(`Score: ${score}`,box * 2,box * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < 3 || snakeX > box * 17
      || snakeY < 3 * box || snakeY > box * 17) {
    //мб вывести сообщение о проигрыше + начать заново??

    clearInterval(game)
  }

  if(dir === "left") snakeX -= box;
  if(dir === "right") snakeX += box;
  if(dir === "up") snakeY -= box;
  if(dir === "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

function eatTail (head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game)
    }
  }
}

let game = setInterval(drawGame, 100);
