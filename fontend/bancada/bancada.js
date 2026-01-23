
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');

openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// ====== LISTA DE USUÁRIOS ======
let users = [
    { nome: 'João Silva', email: 'joao@gmail.com' },
    { nome: 'Maria Santos', email: 'maria@gmail.com' },
    { nome: 'Pedro Lima', email: 'pedro@gmail.com' }
];

const userList = document.getElementById('userList');
const searchInput = document.getElementById('searchUser');

function renderUsers(filter = '') {
    userList.innerHTML = '';
    users
        .filter(u => u.nome.toLowerCase().includes(filter.toLowerCase()))
        .forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.nome}</span>
                <span class="userActions">
                    <button class="editBtn" data-index="${index}">Editar</button>
                    <button class="deleteBtn" data-index="${index}">Remover</button>
                </span>
            `;
            userList.appendChild(li);
        });

    document.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            const novoNome = prompt('Editar nome do usuário:', users[i].nome);
            if (novoNome) {
                users[i].nome = novoNome;
                renderUsers(searchInput.value);
            }
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', e => {
            const i = e.target.dataset.index;
            if (confirm(`Deseja remover ${users[i].nome}?`)) {
                users.splice(i, 1);
                renderUsers(searchInput.value);
            }
        });
    });
}

searchInput.addEventListener('input', e => {
    renderUsers(e.target.value);
});

// Render inicial
renderUsers();

// ====== DETALHES DAS BANCADAS ======
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const closeModalBtn = document.getElementById('closeModal');

document.querySelectorAll('.btnDetalhes').forEach((btn) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        modalTitulo.textContent = card.dataset.titulo;
        modal.style.display = 'flex';
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});