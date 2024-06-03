const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600
const score = document.querySelector('#score')
const eachBox = 20
const interval = 175
const snakeColor = '#0048EA'
const appleColor = 'red'
let defaultScore = 0
let snake = [{ x: 200, y: 200}]
let apple = { x: 4, y: 4 }
let direction = 'right'

function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.fillStyle = snakeColor
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, eachBox, eachBox)
  })

  ctx.fillStyle = appleColor
  ctx.fillRect(apple.x, apple.y, eachBox, eachBox)
}

function snakeMove() {
  const head = { x: snake[0].x, y: snake[0].y }

  switch (direction) {
    case 'up':
      head.y -= eachBox
      break
    case 'down':
      head.y += eachBox
      break
    case 'left':
      head.x -= eachBox
      break
    case 'right':
      head.x += eachBox
      break
  }

  snake.unshift(head)

  if (head.x === apple.x && head.y === apple.y) {
    createApple()
    defaultScore += 1
score.innerHTML = defaultScore
  } else {
    snake.pop()
  }
}


function createApple() {
  apple.x = Math.floor(Math.random() * (canvas.width / eachBox)) * eachBox;
  apple.y = Math.floor(Math.random() * (canvas.height / eachBox)) * eachBox;

  snake.forEach(part => {
    if (apple.x === part.x && apple.y === part.y) {
      createApple()
    }
  })
}

function isColliding() {
  const head = snake[0]
  if (head.x <= (0 - (eachBox * 2)) || head.x >= (CANVAS_WIDTH + (eachBox * 2))) {
    gameOver()
  } else if (head.y <= (0 - (eachBox * 2)) || head.y >= (CANVAS_HEIGHT + (eachBox * 2))) {
    gameOver()
  }
  snake.slice(1).forEach(snakePart => {
    if (head.x === snakePart.x && head.y === snakePart.y) {
      gameOver()
    }
  })
}
createApple()

function gameOver() {
  clearInterval(gameLoop);
  alert('Game Over!');
  location.reload();
}

const gameLoop = setInterval(() => {
  draw()
  snakeMove()
  isColliding()
}, interval)

document.addEventListener("keydown", (event) => {
  let keyPressed = event.key
  if ((keyPressed == 'w' || keyPressed === 'ArrowUp') && direction !== 'down') {
    direction = 'up'
  } else if ((keyPressed == 'a' || keyPressed === 'ArrowLeft') && direction !== 'right') {
    direction = 'left'
  } else if ((keyPressed == 's' || keyPressed === 'ArrowDown') && direction !== 'up') {
    direction = 'down'
  } else if ((keyPressed == 'd' || keyPressed === 'ArrowRight') && direction !== 'left') {
    direction = 'right'
  }
})