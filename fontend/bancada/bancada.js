
window.onload = ()=>{
    polling(5)
}

function polling(segundos){
    setTimeout(()=>{
       console.log('Buscando...')
       buscarDadosBancada()
       polling(segundos)
    },segundos*1000)
}

function buscarDadosBancada(){
    fetch('http://10.77.241.189:1893/api/smartsense/estoque')
     .then(res=>res.json())
     .then(data=>{
      console.log(data)  
     }) 
}

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const closeModal = document.getElementById("closeModal");
const themeBtn = document.getElementById("toggleTheme");
const particles = document.getElementById("particles");

/* MODAL */
document.querySelectorAll(".btnDetalhes").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        modalTitulo.textContent = card.dataset.titulo;
        modal.style.display = "flex";
    });
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target === modal) modal.style.display = "none"; };

/* PARTICULAS SIMPLES */
function createParticle(){
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random()*100 + "vw";
    p.style.opacity = Math.random();
    p.style.width = p.style.height = (2+Math.random()*3) + "px";
    particles.appendChild(p);
    setTimeout(()=>p.remove(),10000);
}
setInterval(createParticle,200);

/* TEMA CLARO / ESCURO */
themeBtn.onclick = () => document.body.classList.toggle("light");

/* BRILHO SEGUINDO O MOUSE */
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--shineX', x + 'px');
        card.style.setProperty('--shineY', y + 'px');
    });
});