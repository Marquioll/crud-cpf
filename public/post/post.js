const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formCadastro.addEventListener("submit", async function (event) {

    event.preventDefault();

    const pessoa = {
        cpf: document.getElementById("cpf").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        idade: Number(document.getElementById("idade").value),
        telefone: document.getElementById("telefone").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        rg: document.getElementById("rg").value
    };

    try {

        const resposta = await fetch("/pessoas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoa)
        });

        if (resposta.ok) {

            mensagem.textContent = "Pessoa cadastrada com sucesso!";

            formCadastro.reset();

        } else {

            mensagem.textContent = "Erro ao cadastrar pessoa.";

        }

    } catch (erro) {

        console.error("Erro:", erro);

        mensagem.textContent = "Erro ao conectar com o servidor.";

    }

});