const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
let x = 10, y = 10;
let vx = 0, vy = 0;
let trail = [];
let tail = 0;
let fruitX = Math.floor(Math.random() * tileCount);
let fruitY = Math.floor(Math.random() * tileCount);
let score = 0;
let gameOver = false;

function gameLoop() {
    if (gameOver) return;

    x += vx;
    y += vy;

    if (x < 0 || x >= tileCount || y < 0 || y >= tileCount) {
        endGame();
        return;
    }

    for (let i = 0; i < trail.length; i++) {
        if (trail[i].x === x && trail[i].y === y) {
            endGame();
            return;
        }
    }

    trail.push({ x, y });
    while (trail.length > tail) trail.shift();

    if (x === fruitX && y === fruitY) {
        tail++;
        score += 10;
        document.getElementById("score").textContent = "Score: " + score;
        do {
            fruitX = Math.floor(Math.random() * tileCount);
            fruitY = Math.floor(Math.random() * tileCount);
        } while (trail.some(t => t.x === fruitX && t.y === fruitY));
    }

    draw();
}

function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    for (let t of trail) {
        ctx.fillRect(t.x * gridSize, t.y * gridSize, gridSize - 2, gridSize - 2);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(fruitX * gridSize, fruitY * gridSize, gridSize - 2, gridSize - 2);
}

function endGame() {
    gameOver = true;
    alert("Game Over! Final Score: " + score);
}

document.addEventListener("keydown", e => {
    switch (e.key) {
        case "w":
            if (vy !== 1) vx = 0, vy = -1;
            break;
        case "s":
            if (vy !== -1) vx = 0, vy = 1;
            break;
        case "a":
            if (vx !== 1) vx = -1, vy = 0;
            break;
        case "d":
            if (vx !== -1) vx = 1, vy = 0;
            break;
    }
});

setInterval(gameLoop, 100);
