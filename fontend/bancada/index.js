// "Banco de dados" em memória (apenas para exemplo)
let usuarios = [];

/* =========================
   CONTROLE DE TELAS
========================= */
function mostrarCadastro() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("cadastro").classList.remove("hidden");
}

function mostrarLogin() {
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
}

/* =========================
   CADASTRO
========================= */
function cadastrar() {
    const user = document.getElementById("cadUser").value.trim();
    const nascimento = document.getElementById("cadNascimento").value;
    const pass = document.getElementById("cadPass").value;
    const pass2 = document.getElementById("cadPass2").value;

    const erro = document.getElementById("cadError");
    const sucesso = document.getElementById("cadSuccess");

    erro.innerText = "";
    sucesso.innerText = "";

    if (!user || !nascimento || !pass || !pass2) {
        erro.innerText = "Preencha todos os campos.";
        return;
    }

    if (pass.length < 6) {
        erro.innerText = "A senha deve ter pelo menos 6 caracteres.";
        return;
    }

    if (pass !== pass2) {
        erro.innerText = "As senhas não coincidem.";
        return;
    }

    const existe = usuarios.find(u => u.user === user);
    if (existe) {
        erro.innerText = "Usuário já cadastrado.";
        return;
    }

    usuarios.push({
        user,
        nascimento,
        pass
    });

    sucesso.innerText = "Cadastro realizado com sucesso!";

    document.getElementById("cadUser").value = "";
    document.getElementById("cadNascimento").value = "";
    document.getElementById("cadPass").value = "";
    document.getElementById("cadPass2").value = "";
}

/* =========================
   LOGIN
========================= */
function login() {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;
    const erro = document.getElementById("loginError");

    erro.innerText = "";

    if (!user || !pass) {
        erro.innerText = "Informe usuário e senha.";
        return;
    }

    const encontrado = usuarios.find(
        u => u.user === user && u.pass === pass
    );

    if (!encontrado) {
        erro.innerText = "Usuário ou senha inválidos.";
    } else {
        // Marca usuário como logado (opcional)
        sessionStorage.setItem("usuarioLogado", user);

        // Redireciona para a bancada
        window.location.href = "bancada.html";
    }
}