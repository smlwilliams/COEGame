const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const bird = new Image();
const bg = new Image();
const pa = new Image();
const pbi = new Image();
const pwa = new Image();
const pva = new Image();
const logo = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
pa.src = 'images/pa.png';
pbi.src = 'images/pbi.png';
pwa.src = 'images/pwa.png';
pva.src = 'images/pva.png';
logo.src = 'images/logo.png';

// Bird position
let bX = 10;
let bY = 150;

// Gravity
const gravity = 1.5;

// Elements coordinates
const elements = [];

elements[0] = {
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height - bird.height)),
    img: pa
};

// Score and High Score
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Draw images
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < elements.length; i++) {
        ctx.drawImage(elements[i].img, elements[i].x, elements[i].y);

        elements[i].x--;

        if (elements[i].x == 125) {
            const randomImg = [pa, pbi, pwa, pva][Math.floor(Math.random() * 4)];
            elements.push({
                x: canvas.width,
                y: Math.floor(Math.random() * (canvas.height - randomImg.height)),
                img: randomImg
            });
        }

        // Detect collision
        if (bX + bird.width >= elements[i].x && bX <= elements[i].x + elements[i].img.width &&
            bY + bird.height >= elements[i].y && bY <= elements[i].y + elements[i].img.height) {
            elements.splice(i, 1); // Remove element
            score++;
        }

        // End game if element moves completely past the bird
        if (elements[i] && elements[i].x + elements[i].img.width < bX) {
            resetGame(); // Reset the game
        }
    }

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 40);
    ctx.fillText("High Score : " + highScore, 10, canvas.height - 20);

    // Draw the logo in front of the background while maintaining aspect ratio
    const logoWidth = 50;
    const logoHeight = logo.height / logo.width * logoWidth;
    ctx.drawImage(logo, 10, 10, logoWidth, logoHeight);

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25;
}

function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    bX = 10;
    bY = 150;
    elements.length = 0;
    elements[0] = {
        x: canvas.width,
        y: Math.floor(Math.random() * (canvas.height - bird.height)),
        img: pa
    };
    score = 0;
}

draw();