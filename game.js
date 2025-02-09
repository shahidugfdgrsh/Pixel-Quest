const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 400;

// Player objects
let player1 = { x: 100, y: 250, width: 50, height: 100, color: "blue", health: 100, attacking: false };
let player2 = { x: 600, y: 250, width: 50, height: 100, color: "red", health: 100, attacking: false };

// Movement functions
function moveLeft(player) { player.x -= 10; }
function moveRight(player) { player.x += 10; }
function attack(player, opponent) {
    if (!player.attacking) {
        player.attacking = true;
        if (player.x + player.width >= opponent.x && player.x <= opponent.x + opponent.width) {
            opponent.health -= 10;
            console.log("Hit! Opponent's Health:", opponent.health);
        }
        setTimeout(() => { player.attacking = false; }, 500);
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw players
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Draw health bars
    ctx.fillStyle = "green";
    ctx.fillRect(20, 20, player1.health * 2, 10);
    ctx.fillRect(canvas.width - 220, 20, player2.health * 2, 10);

    // Check win condition
    if (player1.health <= 0 || player2.health <= 0) {
        alert(player1.health <= 0 ? "Player 2 Wins!" : "Player 1 Wins!");
        player1.health = 100;
        player2.health = 100;
    }

    requestAnimationFrame(gameLoop);
}

// Mobile Controls
document.getElementById("leftP1").addEventListener("click", () => moveLeft(player1));
document.getElementById("rightP1").addEventListener("click", () => moveRight(player1));
document.getElementById("attackP1").addEventListener("click", () => attack(player1, player2));

document.getElementById("leftP2").addEventListener("click", () => moveLeft(player2));
document.getElementById("rightP2").addEventListener("click", () => moveRight(player2));
document.getElementById("attackP2").addEventListener("click", () => attack(player2, player1));

// Start the game
gameLoop();
          
