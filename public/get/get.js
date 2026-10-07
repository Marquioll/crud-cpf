const btnListar = document.getElementById("btnListar");
const listaPessoas = document.getElementById("listaPessoas");

btnListar.addEventListener("click", listarPessoas);

async function listarPessoas() {

    try {

        const resposta = await fetch("/pessoas");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar pessoas");
        }

        const pessoas = await resposta.json();

        listaPessoas.innerHTML = "";

        if (pessoas.length === 0) {
            listaPessoas.innerHTML = "<p>Nenhuma pessoa cadastrada.</p>";
            return;
        }

        pessoas.forEach(pessoa => {

            const pessoaDiv = document.createElement("div");

            pessoaDiv.innerHTML = `
                <h3>${pessoa.nome || ""} ${pessoa.sobrenome || ""}</h3>

                <p><strong>ID:</strong> ${pessoa.id ?? ""}</p>
                <p><strong>CPF:</strong> ${pessoa.cpf || ""}</p>
                <p><strong>Nome:</strong> ${pessoa.nome || ""}</p>
                <p><strong>Sobrenome:</strong> ${pessoa.sobrenome || ""}</p>
                <p><strong>E-mail:</strong> ${pessoa.email || ""}</p>
                <p><strong>Idade:</strong> ${pessoa.idade ?? ""}</p>
                <p><strong>Telefone:</strong> ${pessoa.telefone || ""}</p>
                <p><strong>Rua:</strong> ${pessoa.rua || ""}</p>
                <p><strong>Bairro:</strong> ${pessoa.bairro || ""}</p>
                <p><strong>Cidade:</strong> ${pessoa.cidade || ""}</p>
                <p><strong>Estado:</strong> ${pessoa.estado || ""}</p>
                <p><strong>RG:</strong> ${pessoa.rg || ""}</p>

                <hr>
            `;

            listaPessoas.appendChild(pessoaDiv);

        });

    } catch (erro) {

        console.error("Erro:", erro);

        listaPessoas.innerHTML =
            "<p>Erro ao carregar as pessoas cadastradas.</p>";

    }

}