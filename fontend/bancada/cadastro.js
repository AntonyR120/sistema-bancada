function cadastrarUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const tipo = document.getElementById("tipoUsuario").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Validação
    if (!nome || !sobrenome || !nascimento || !tipo || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoUsuario = {
        nome,
        sobrenome,
        nascimento,
        tipo,
        email,
        senha
    };

    // Salva no localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.some(u => u.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");

    // Limpa campos
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("tipoUsuario").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";

    // Envia para servidor Node-RED
    fetch("http://localhost:1880/autenticacao/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(resposta => {
        if (resposta.ok) {
            return resposta.json();
        } else {
            throw new Error("Erro ao cadastrar no servidor");
        }
    })
    .then(data => {
        console.log("Resposta do servidor:", data);
        alert("Usuário cadastrado no servidor!");
    })
    .catch(erro => {
        console.error("Erro no fetch:", erro);
        alert("Não foi possível cadastrar no servidor.");
    });
}

async function logar(e){
    e.preventDefault();

    let input_email = document.getElementById('email');
    let input_senha = document.getElementById('senha');

    if(!input_email || !input_senha){
        alert("Inputs não encontrados")
        return;
    }

    let email = input_email.value;
    let senha = input_senha.value;

    try{

        let resposta = await fetch("http://localhost:1880/autenticar",{
            method:'POST',
            body:JSON.stringify({email,senha})
            //body:{email,senha}
        })

        if(resposta.status == 200){
            alert("Entrou");
            window.location.href = "./bancadas/bancadas.html";
        }else{
            alert("Usuário ou senha inválidos")
        }
    }catch(erro){
        alert("Erro ao buscar, confira o console para ver mais detalhes.")
        console.error(erro);
    }
}

async function logar(e){
    e.preventDefault();

    let input_email = document.getElementById('email');
    let input_senha = document.getElementById('senha');

    if(!input_email || !input_senha){
        alert("Inputs não encontrados")
        return;
    }

    let email = input_email.value;
    let senha = input_senha.value;

    try{

        let resposta = await fetch("http://localhost:1880/autenticar",{
            method:'POST',
            body:JSON.stringify({email,senha})
            //body:{email,senha}
        })

        if(resposta.status == 200){
            alert("Entrou");
            window.location.href = "./bancadas/bancadas.html";
        }else{
            alert("Usuário ou senha inválidos")
        }
    }catch(erro){
        alert("Erro ao buscar, confira o console para ver mais detalhes.")
        console.error(erro);
    }
}