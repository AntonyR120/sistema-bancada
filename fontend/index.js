const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arrays para blocos e partículas
const blocks = [];
const particles = [];
const backgroundParticles = [];

// Criar blocos de grama e terra
for (let i = 0; i < canvas.width / 32; i++) {
    blocks.push({ x: i * 32, y: canvas.height - 32, color: '#228B22' }); // grama
    blocks.push({ x: i * 32, y: canvas.height, color: '#8B4513' });       // terra
}

// Criar partículas de fundo flutuantes
for (let i = 0; i < 80; i++) {
    backgroundParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: '#ffff33',
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random()
    });
}

// Função para criar partículas nos botões
function createParticle(x, y) {
    particles.push({
        x: x + Math.random() * 60 - 30,
        y: y + Math.random() * 10,
        radius: Math.random() * 2 + 1,
        color: '#ffff00',
        speedY: Math.random() * -1 - 0.5,
        alpha: 1
    });
}

// Atualizar partículas do botão
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.alpha -= 0.02;
        if (p.alpha <= 0) particles.splice(i, 1);
    }
}

// Atualizar partículas de fundo
function updateBackgroundParticles() {
    backgroundParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
}

// Desenhar partículas do botão
function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.radius, p.radius);
    });
    ctx.globalAlpha = 1;
}

// Desenhar partículas de fundo
function drawBackgroundParticles() {
    backgroundParticles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.radius, p.radius);
    });
    ctx.globalAlpha = 1;
}

// Desenhar sol animado
let sunAngle = 0;
function drawSun() {
    const centerX = canvas.width - 100;
    const centerY = 100;
    const radius = 50;
    sunAngle += 0.001;
    const offsetX = Math.cos(sunAngle) * 10;
    const offsetY = Math.sin(sunAngle) * 10;

    const gradient = ctx.createRadialGradient(centerX + offsetX, centerY + offsetY, 10, centerX + offsetX, centerY + offsetY, radius);
    gradient.addColorStop(0, '#ffff33');
    gradient.addColorStop(1, 'rgba(255,255,51,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX + offsetX, centerY + offsetY, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Função principal de animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Céu
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4c91d3');
    gradient.addColorStop(1, '#87ceeb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Blocos
    blocks.forEach(block => {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, 32, 32);
    });

    // Sol
    drawSun();

    // Partículas
    updateParticles();
    drawParticles();
    updateBackgroundParticles();
    drawBackgroundParticles();

    requestAnimationFrame(animate);
}

// Partículas nos botões
const button = document.querySelector('.login-container button');
button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    createParticle(e.clientX - rect.left, e.clientY - rect.top);
});

// Redimensionamento
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    blocks.length = 0;
    for (let i = 0; i < canvas.width / 32; i++) {
        blocks.push({ x: i * 32, y: canvas.height - 32, color: '#228B22' });
        blocks.push({ x: i * 32, y: canvas.height, color: '#8B4513' });
    }
});

animate();