const btnBuscar = document.getElementById("btnBuscar");

const cpfBusca = document.getElementById("cpfBusca");

const mensagemBusca = document.getElementById("mensagemBusca");
const mensagemAtualizacao = document.getElementById("mensagemAtualizacao");

const formAtualizar = document.getElementById("formAtualizar");


btnBuscar.addEventListener("click", buscarPessoa);


async function buscarPessoa() {

    const cpf = cpfBusca.value.trim();

    mensagemBusca.textContent = "";
    mensagemAtualizacao.textContent = "";

    if (cpf === "") {
        mensagemBusca.textContent = "Digite um CPF para realizar a busca.";
        formAtualizar.style.display = "none";
        return;
    }

    try {

        const resposta = await fetch(
            `/pessoas?cpf=${encodeURIComponent(cpf)}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar pessoa.");
        }

        const pessoas = await resposta.json();

        if (pessoas.length === 0) {

            mensagemBusca.textContent = "Pessoa não encontrada.";

            formAtualizar.style.display = "none";

            return;
        }

        const pessoa = pessoas[0];

        document.getElementById("id").value = pessoa.id;

        document.getElementById("cpf").value =
            pessoa.cpf || "";

        document.getElementById("nome").value =
            pessoa.nome || "";

        document.getElementById("sobrenome").value =
            pessoa.sobrenome || "";

        document.getElementById("email").value =
            pessoa.email || "";

        document.getElementById("idade").value =
            pessoa.idade ?? "";

        document.getElementById("telefone").value =
            pessoa.telefone || "";

        document.getElementById("rua").value =
            pessoa.rua || "";

        document.getElementById("bairro").value =
            pessoa.bairro || "";

        document.getElementById("cidade").value =
            pessoa.cidade || "";

        document.getElementById("estado").value =
            pessoa.estado || "";

        document.getElementById("rg").value =
            pessoa.rg || "";

        formAtualizar.style.display = "block";

        mensagemBusca.textContent = "Pessoa encontrada!";

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemBusca.textContent =
            "Erro ao realizar a busca.";

        formAtualizar.style.display = "none";

    }

}

formAtualizar.addEventListener("submit", atualizarPessoa);


async function atualizarPessoa(event) {

    event.preventDefault();

    const id = document.getElementById("id").value;

    const pessoaAtualizada = {

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

        const resposta = await fetch(`/pessoas/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(pessoaAtualizada)

        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar pessoa.");
        }

        mensagemAtualizacao.textContent =
            "Pessoa atualizada com sucesso!";

        mensagemBusca.textContent = "";

        formAtualizar.style.display = "none";

        cpfBusca.value = "";

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemAtualizacao.textContent =
            "Erro ao atualizar pessoa.";

    }

}   