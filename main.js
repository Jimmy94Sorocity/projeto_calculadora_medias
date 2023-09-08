const form = document.getElementById("form-atividade");
const img_aprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const img_reprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />'; // começo com ' pois com "" daria erro
const atividades = [];
const notas = [];
const span_aprovado = '<span class="resultado aprovado">Aprovado</span>';
const span_reprovado = '<span class="resultado reprovado">Reprovado</span>';
const nota_minima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = "";

form.addEventListener("submit", function(e) {
    e.preventDefault();

    adiciona_linha();
    atualiza_tabela();
    atualiza_mediafinal();
});

function adiciona_linha() {
    const input_nomeatividade = document.getElementById("nome-atividade");
    const input_notaatividade = document.getElementById("nota-atividade");

    if (atividades.includes(input_nomeatividade.value)) { // tirando a possibilidade de inserir duas atividades iguais
        alert(`A atividade ${input_nomeatividade.value} já foi inserida`);
    } else {
        atividades.push(input_nomeatividade.value);
        notas.push(parseFloat(input_notaatividade.value));

        let linha = "<tr>";
        linha += `<td>${input_nomeatividade.value}</td>`;
        linha += `<td>${input_notaatividade.value}</td>`;
        linha += `<td>${input_notaatividade.value >= nota_minima ? img_aprovado : img_reprovado}</td>`; // ? = if e : = else
        linha += `</tr>`;

        linhas += linha;
    }

    input_nomeatividade.value = ""; // limpado o campo após inserir os dados
    input_notaatividade.value = "";
}

function atualiza_tabela() {
    const corpo_tabela = document.querySelector("tbody");
    corpo_tabela.innerHTML = linhas;
}

function atualiza_mediafinal() {
    const media_final = calcula_mediafinal();

    document.getElementById("media-final-valor").innerHTML = media_final;
    document.getElementById("media-final-resultado").innerHTML = media_final >= nota_minima ? span_aprovado : span_reprovado;
}

function calcula_mediafinal() {
    let soma_notas = 0;

    for (let i = 0; i < notas.length; i++) { // criação laço das notas
        soma_notas += notas[i];
    }

    return  soma_notas / notas.length; // lenght = quantidade insirida
}