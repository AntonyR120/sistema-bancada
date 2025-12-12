
const text = "* Por favor, insira seus dados.";
let index = 0;

const typeSound = document.getElementById("typeSound");
const selectSound = document.getElementById("selectSound");
const errorSound = document.getElementById("errorSound");

function typeEffect() {
    const typing = document.getElementById("typingText");

    if (index < text.length) {
        typing.textContent += text.charAt(index);
        typeSound.currentTime = 0;
        typeSound.play();
        index++;
        setTimeout(typeEffect, 40);
    }
}
window.onload = typeEffect;


// LOGIN REAL (localStorage)
function login() {
    let u = document.getElementById("usuario").value;
    let s = document.getElementById("senha").value;

    if (u === "" || s === "") {
        error();
        return;
    }

    selectSound.play();

    localStorage.setItem("user", u);

    document.getElementById("fade").style.animation = "fadeOut 1.5s forwards";

    alert("* Login realizado com sucesso!");
}


/* Tremor */
function error() {
    errorSound.play();
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 300);
}



/* === PARTÍCULAS BRANCAS === */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
        particlesArray.push(new Particle());
    }
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();



/* === CORAÇÃO SEGUINDO O MOUSE + PULSANDO + RASTRO === */

const heart = document.getElementById("heart");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Variáveis do pulso
let pulseScale = 1;
let pulseDirection = 1; // 1 = aumentando, -1 = diminuindo
const pulseSpeed = 0.02; // velocidade do pulso
const pulseMax = 1.4; // tamanho máximo
const pulseMin = 1.0; // tamanho mínimo

// Rastro vermelho do coração
let trailParticles = [];

class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.opacity = 0.6;
    }

    update() {
        this.opacity -= 0.02; // desaparece lentamente
        this.size *= 0.95; // encolhe
    }

    draw() {
        ctx.fillStyle = `rgba(255,0,0,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function moveAndPulseHeart() {
    // Atualiza posição
    heart.style.left = mouseX + "px";
    heart.style.top = mouseY + "px";

    // Atualiza escala para pulsar
    pulseScale += pulseDirection * pulseSpeed;
    if (pulseScale >= pulseMax) pulseDirection = -1;
    if (pulseScale <= pulseMin) pulseDirection = 1;
    heart.style.transform = `translate(-50%, -50%) scale(${pulseScale})`;

    // Adiciona nova partícula do rastro
    trailParticles.push(new TrailParticle(mouseX, mouseY));

    // Atualiza partículas do rastro
    trailParticles.forEach((p, index) => {
        p.update();
        if (p.opacity <= 0) trailParticles.splice(index, 1);
    });

    requestAnimationFrame(moveAndPulseHeart);
}

moveAndPulseHeart();



/* === ANIMAÇÃO DE TODAS AS PARTÍCULAS (brancas + rastro vermelho) === */
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Partículas brancas
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    // Rastro vermelho
    trailParticles.forEach(p => {
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

