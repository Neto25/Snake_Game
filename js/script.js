let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let size;
size = 512 / box;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, size * box, size * box);
}

function createSnake(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        if (i == 0) context.fillStyle = "darkgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 && direction !="right") direction = "left";
    if (event.keyCode == 38 && direction !="down") direction = "up";
    if (event.keyCode == 39 && direction !="left") direction = "right";
    if (event.keyCode == 40 && direction !="up") direction = "down";
}

function newGame(){
    for (i = 1 ; i < snake.length; i) {
        snake.pop();
        document.getElementById("points").innerHTML = ("Pontos:" + snake.length);
    }
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    };
    direction = "right";
    gameOver = false;

    clearInterval(game);
    game = setInterval(startGame, 100);
}

function startGame(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert("perdeu");
            gameOver = true;
            newGame();
        }
    }

    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * (size - 1)) * box;
        food.y = Math.floor(Math.random() * (size - 1)) * box;
        document.getElementById("points").innerHTML = ("Pontos:" + snake.length);

        if (velocity > 30) velocity = 100 - 3 * snake.length;
        clearInterval(game);
        game = setInterval(startGame, velocity);
    }

    snake.unshift(newHead);

}

let velocity = 100;
let gameOver = false
game = setInterval(startGame, velocity);

