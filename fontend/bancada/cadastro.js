document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const msg = document.getElementById("mensagem");

    if (nome === "" || email === "" || senha === "") {
        msg.textContent = "* TODOS OS CAMPOS SÃO OBRIGATÓRIOS *";
        msg.style.color = "red";
        return;
    }

    msg.textContent = "✓ CADASTRO REALIZADO!";
    msg.style.color = "lime";
});