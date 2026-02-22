const canvas = document.getElementById('dataCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.5 + 0.1;
        this.size = Math.random() * 2;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = '#c5a059';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw lines to simulate tracking
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.1)';
    ctx.beginPath();
    for(let i = 0; i < canvas.width; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }
    ctx.stroke();

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();

console.log("IFDE PROBATUM: System Integrity Secured.");
