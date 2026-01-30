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

    // Usuário fixo
    const usuarioFixo = {
        user: "neymar",
        pass: "1234"
    };

    if (user === usuarioFixo.user && pass === usuarioFixo.pass) {
        // Marca usuário como logado
        sessionStorage.setItem("usuarioLogado", user);

        // Redireciona para a bancada
        window.location.href = "bancada.html";
    } else {
        erro.innerText = "Usuário ou senha inválidos.";
    }
}

/* =========================
   FETCH (opcional)
========================= */
function enviarLoginServidor() {
    const usuario = {
        user: "neymar",
        pass: "1234"
    };

    fetch("http://localhost:1880/autenticacao/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(resposta => {
        if (resposta.ok) {
            return resposta.json();
        } else {
            throw new Error("Erro no servidor");
        }
    })
    .then(data => {
        console.log("Resposta do servidor:", data);
        alert("Login enviado para o servidor com sucesso!");
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Não foi possível enviar login para o servidor.");
    });
}

// EDITAR USUÁRIO
function editarUsuario(usuarioId, dadosAtualizados) {
    fetch(`http://localhost:1880/autenticacao/usuario/${usuarioId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(resposta => {
        if (resposta.ok) {
            return resposta.json();
        } else {
            throw new Error("Erro ao editar usuário no servidor");
        }
    })
    .then(data => {
        console.log("Usuário editado:", data);
        alert("Usuário atualizado com sucesso!");
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Não foi possível atualizar o usuário no servidor.");
    });
}

// REMOVER USUÁRIO
function removerUsuario(usuarioId) {
    fetch(`http://localhost:1880/autenticacao/usuario/${usuarioId}`, {
        method: "DELETE"
    })
    .then(resposta => {
        if (resposta.ok) {
            alert("Usuário removido com sucesso!");
        } else {
            throw new Error("Erro ao remover usuário no servidor");
        }
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Não foi possível remover o usuário.");
    });
}