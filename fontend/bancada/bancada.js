/* =======================
   SIDEBAR USUÁRIOS
======================= */
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const sidebarList = document.getElementById('sidebarUserList');
const sidebarSearch = document.getElementById('sidebarSearch');
const addUserSidebar = document.getElementById('addUserSidebar');
const sidebarTitulo = document.getElementById('sidebarTitulo');

/* =======================
   BANCADAS
======================= */
const listaBancadas = document.getElementById('listaBancadas');
const detalhesBancada = document.getElementById('detalhesBancada');
const tituloBancada = document.getElementById('tituloBancada');
const btnVoltar = document.getElementById('btnVoltar');
const cards = document.querySelectorAll('.btnDetalhes');

let bancadaAtual = ''; // guarda a bancada atualmente selecionada

// Dados de exemplo para cada bancada
const dadosBancadas = {
    "Estoque": { temperatura: "22°C", umidade: "55%", pressao: "1013 hPa" },
    "Expedição": { temperatura: "20°C", umidade: "60%", pressao: "1012 hPa" },
    "Montagem": { temperatura: "24°C", umidade: "50%", pressao: "1014 hPa" },
    "Processo": { temperatura: "23°C", umidade: "52%", pressao: "1013 hPa" }
};

/* =======================
   ABRIR / FECHAR SIDEBAR
======================= */
openSidebarBtn.onclick = () => sidebar.classList.add('active');
closeSidebarBtn.onclick = () => sidebar.classList.remove('active');

/* =======================
   LOCALSTORAGE POR BANCADA
======================= */
function getUsers() {
    return JSON.parse(localStorage.getItem(`bancada_${bancadaAtual}`)) || [];
}

function saveUsers(users) {
    localStorage.setItem(`bancada_${bancadaAtual}`, JSON.stringify(users));
}

/* =======================
   RENDER USUÁRIOS NA SIDEBAR
======================= */
function renderUsuarios(filter = '') {
    const users = getUsers();
    sidebarList.innerHTML = '';

    users
        .filter(u => u.toLowerCase().includes(filter.toLowerCase()))
        .forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${user}</span>
                            <div class="userActions">
                                <button class="editBtn">Editar</button>
                                <button class="deleteBtn">Remover</button>
                            </div>`;

            // remover usuário
            li.querySelector('.deleteBtn').onclick = () => {
                users.splice(index, 1);
                saveUsers(users);
                renderUsuarios(filter);
            };

            // editar usuário
            li.querySelector('.editBtn').onclick = () => {
                const novoNome = prompt('Editar nome do usuário:', user);
                if (!novoNome) return;
                users[index] = novoNome;
                saveUsers(users);
                renderUsuarios(filter);
            };

            sidebarList.appendChild(li);
        });
}

/* =======================
   BUSCA NA SIDEBAR
======================= */
sidebarSearch.oninput = e => renderUsuarios(e.target.value);

/* =======================
   ADICIONAR USUÁRIO
======================= */
addUserSidebar.onclick = () => {
    if (!bancadaAtual) {
        alert('Selecione uma bancada primeiro clicando em "Ver Detalhes".');
        return;
    }
    const nome = prompt('Nome do usuário:');
    if (!nome) return;

    const users = getUsers();
    users.push(nome);
    saveUsers(users);
    renderUsuarios();
};

/* =======================
   VER DETALHES DAS BANCADAS
======================= */
cards.forEach(btn => {
    btn.onclick = () => {
        const card = btn.closest('.card');
        bancadaAtual = card.dataset.bancada;

        // Mostrar seção de detalhes
        listaBancadas.style.display = 'none';
        detalhesBancada.style.display = 'block';

        // Preencher título com dados da bancada
        const dados = dadosBancadas[bancadaAtual];
        tituloBancada.innerHTML = `
            BANCADA ${bancadaAtual.toUpperCase()}<br>
            <strong>Temperatura:</strong> ${dados.temperatura}<br>
            <strong>Umidade:</strong> ${dados.umidade}<br>
            <strong>Pressão:</strong> ${dados.pressao}
        `;

        // Atualizar título da sidebar e renderizar usuários
        sidebarTitulo.textContent = `Usuários – ${bancadaAtual}`;
        renderUsuarios();
    };
});

// botão voltar
btnVoltar.onclick = () => {
    detalhesBancada.style.display = 'none';
    listaBancadas.style.display = 'block';
    sidebarTitulo.textContent = 'Usuários';
    sidebarList.innerHTML = '';
    bancadaAtual = '';
};

/* =======================
   GIF ESQUELETO BATENDO NAS PAREDES
======================= */
const skeletonGif = document.getElementById('skeletonGif');
skeletonGif.style.position = 'absolute';

let posX = 10, posY = 10, velX = 3, velY = 2;

function moveSkeleton() {
    const width = window.innerWidth - skeletonGif.offsetWidth;
    const height = window.innerHeight - skeletonGif.offsetHeight;

    posX += velX;
    posY += velY;

    if (posX <= 0 || posX >= width) velX = -velX;
    if (posY <= 0 || posY >= height) velY = -velY;

    skeletonGif.style.left = posX + 'px';
    skeletonGif.style.top = posY + 'px';

    requestAnimationFrame(moveSkeleton);
}

moveSkeleton();

const coresBase = ["Azul","Preto","Vermelho"];

function gerarEstoque(){

    let estoque = [];

    for(let i=1;i<=28;i++){

        estoque.push({
            id:i,
            cor: coresBase[Math.floor(Math.random()*3)],
            disponivel:true
        });

    }

    localStorage.setItem("estoque",JSON.stringify(estoque));
}

if(!localStorage.getItem("estoque")){
    gerarEstoque();
}

function getPedidos(){
    return JSON.parse(localStorage.getItem("pedidos")) || [];
}

function salvarPedidos(pedidos){
    localStorage.setItem("pedidos",JSON.stringify(pedidos));
}

function criarPedido(){

    const cores = ["Azul","Preto","Vermelho"];

    const novoPedido = {

        id: Date.now(),

        corBase: cores[Math.floor(Math.random()*3)],

        parede1: cores[Math.floor(Math.random()*3)],
        parede2: cores[Math.floor(Math.random()*3)],
        parede3: cores[Math.floor(Math.random()*3)],

        status:"Não iniciado",
        bancada:"Estoque"

    };

    let pedidos = getPedidos();
    pedidos.push(novoPedido);

    salvarPedidos(pedidos);

    alert("Pedido criado!");
}

function renderPedidos(){

    const pedidos = getPedidos();

    const container = document.createElement("div");

    pedidos.forEach(p=>{

        const div = document.createElement("div");

        div.innerHTML = `
        <p>ID: ${p.id}</p>
        <p>Base: ${p.corBase}</p>
        <p>Status: ${p.status}</p>
        `;

        container.appendChild(div);

    });

    detalhesBancada.appendChild(container);
}


function atualizarStatus(id,novoStatus){

    let pedidos = getPedidos();

    let pedido = pedidos.find(p=>p.id==id);

    if(pedido){
        pedido.status = novoStatus;
        salvarPedidos(pedidos);
    }

}