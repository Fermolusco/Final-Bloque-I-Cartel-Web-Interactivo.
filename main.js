const canvas = document.getElementById("myCanvas");
canvas.width = 800;
canvas.height = 1200;
const ctx = canvas.getContext("2d");

const circles = [];
const purpleCircles = [];
const numCircles = 20;
const numPurpleCircles = 20;
const mouse = { x: null, y: null, radius: 150 };
let backgroundColor = "green"; // Color de fondo inicial

function drawSquare() {
    const x1 = 80, y1 = 80;
    const x2 = 750, y2 = 80;
    const x3 = 750, y3 = 1150;
    const x4 = 80, y4 = 1150;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.stroke();
}

for (let i = 0; i < numCircles; i++) {
    circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 70 + 50,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
    });
}

for (let i = 0; i < numPurpleCircles; i++) {
    purpleCircles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 70 + 50,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
    });
}

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX - canvas.getBoundingClientRect().left;
    mouse.y = event.clientY - canvas.getBoundingClientRect().top;
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        // Cambiar el color de fondo a azul cuando se presione la barra espaciadora
        backgroundColor = backgroundColor === "green" ? "blue" : "green";
    }
});

function drawCircles(circlesArray, color) {
    for (let i = 0; i < circlesArray.length; i++) {
        const circle = circlesArray[i];
        const dx = circle.x - mouse.x;
        const dy = circle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + circle.radius) {
            const angle = Math.atan2(dy, dx);
            circle.speedX = Math.cos(angle) * 5;
            circle.speedY = Math.sin(angle) * 5;
        }

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        circle.x += circle.speedX;
        circle.y += circle.speedY;

        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
            circle.speedX *= -1;
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
            circle.speedY *= -1;
        }
    }
}

function drawLShape() {
    ctx.beginPath();
    ctx.moveTo(canvas.width - 120, 50);
    ctx.lineTo(canvas.width - 20, 50);
    ctx.lineTo(canvas.width - 20, 150);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(40, canvas.height - 150);
    ctx.lineTo(40, canvas.height - 20);
    ctx.lineTo(160, canvas.height - 20);
    ctx.stroke();
}

function animate() {
    // Cambiar el color de fondo al color almacenado
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawSquare();
    drawCircles(circles, "rgb(255, 182, 193)");
    drawCircles(purpleCircles, "violet");
    drawLShape();

    requestAnimationFrame(animate);
}

animate();
