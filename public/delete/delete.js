const cpfBusca = document.getElementById("cpfBusca");

const btnBuscar = document.getElementById("btnBuscar");
const btnExcluir = document.getElementById("btnExcluir");

const mensagemBusca = document.getElementById("mensagemBusca");
const mensagemExclusao = document.getElementById("mensagemExclusao");

const dadosPessoa = document.getElementById("dadosPessoa");

let pessoaEncontrada = null;


btnBuscar.addEventListener("click", buscarPessoa);

btnExcluir.addEventListener("click", excluirPessoa);


async function buscarPessoa() {

    const cpf = cpfBusca.value.trim();

    mensagemBusca.textContent = "";
    mensagemExclusao.textContent = "";

    dadosPessoa.style.display = "none";

    pessoaEncontrada = null;

    if (cpf === "") {

        mensagemBusca.textContent =
            "Digite um CPF para realizar a busca.";

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

            mensagemBusca.textContent =
                "Pessoa não encontrada.";

            return;
        }

        pessoaEncontrada = pessoas[0];

        document.getElementById("idPessoa").textContent =
            pessoaEncontrada.id;

        document.getElementById("cpfPessoa").textContent =
            pessoaEncontrada.cpf || "";

        document.getElementById("nomePessoa").textContent =
            pessoaEncontrada.nome || "";

        document.getElementById("sobrenomePessoa").textContent =
            pessoaEncontrada.sobrenome || "";

        document.getElementById("emailPessoa").textContent =
            pessoaEncontrada.email || "";

        dadosPessoa.style.display = "block";

        mensagemBusca.textContent =
            "Pessoa encontrada!";

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemBusca.textContent =
            "Erro ao realizar a busca.";

    }

}


async function excluirPessoa() {

    if (!pessoaEncontrada) {

        mensagemExclusao.textContent =
            "Nenhuma pessoa selecionada.";

        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoaEncontrada.nome}?`
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `/pessoas/${pessoaEncontrada.id}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao excluir pessoa.");
        }

        mensagemExclusao.textContent =
            "Pessoa excluída com sucesso!";

        mensagemBusca.textContent = "";

        dadosPessoa.style.display = "none";

        cpfBusca.value = "";

        pessoaEncontrada = null;

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemExclusao.textContent =
            "Erro ao excluir pessoa.";

    }

}