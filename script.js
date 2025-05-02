let contador = 0;
let falhas = [];

const problemas = [
  "Falha de Conexão",
  "Erro de Sistema",
  "Desligamento Inesperado",
  "Falha de Hardware",
  "Erro de Processamento"
];

// Função para exibir a lista de problemas
function exibirProblemas() {
  const listaProblemasDiv = document.getElementById("lista-problemas");
  listaProblemasDiv.innerHTML = ""; // Limpar lista antes de adicionar os problemas

  problemas.forEach((problema, index) => {
    const divProblema = document.createElement("div");
    divProblema.innerText = problema;
    divProblema.classList.add("problema");
    divProblema.onclick = () => registrarFalha(problema);
    listaProblemasDiv.appendChild(divProblema);
  });
}

// Função para registrar a falha quando um problema for clicado
function registrarFalha(problema) {
  contador++;
  document.getElementById("contador").innerText = contador;

  const tabela = document.getElementById("tabela-falhas");
  const novaLinha = document.createElement("tr");

  const celulaID = document.createElement("td");
  celulaID.innerText = contador;

  const celulaProblema = document.createElement("td");
  celulaProblema.innerText = problema;

  const celulaData = document.createElement("td");
  const agora = new Date();
  celulaData.innerText = agora.toLocaleString();

  novaLinha.appendChild(celulaID);
  novaLinha.appendChild(celulaProblema);
  novaLinha.appendChild(celulaData);

  tabela.appendChild(novaLinha);

  // Armazenar falha
  falhas.push({ id: contador, problema, data: agora.toLocaleString() });
}

// Função para gerar a planilha Excel
function gerarExcel() {
  const ws = XLSX.utils.json_to_sheet(falhas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Falhas");

  // Gerar o arquivo Excel e fazer o download
  XLSX.writeFile(wb, "falhas.xlsx");
}

// Carregar os problemas ao carregar a página
window.onload = function() {
  exibirProblemas();
}