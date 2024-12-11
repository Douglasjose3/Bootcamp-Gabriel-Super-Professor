// Captura os elementos do DOM
const formCompraDolarEl = document.getElementById("formDolar");
const quantidadeEl = document.getElementById("quantidade");
const cotacaoDolarEl = document.getElementById("cotacaoDolar");
const buttonDolarEl = document.getElementById("button-dolar");
const resetButtonEl = document.getElementById("button-reset-compra");
const resultsDolarEl = document.getElementById("results-dolar");

// Função para calcular o valor em reais
function compraDolar() {
  const quantidadeEmDolar = parseFloat(quantidadeEl.value);
  const cotacaoDoDia = parseFloat(cotacaoDolarEl.value);

  if (isNaN(quantidadeEmDolar) || isNaN(cotacaoDoDia)) {
    resultsDolarEl.textContent =
      "Por favor, insira valores válidos para todos os campos.";
    return;
  }

  const contaDolar = quantidadeEmDolar * cotacaoDoDia;
  resultsDolarEl.innerHTML = `<p>Valor total: R$ ${contaDolar.toFixed(2)}.</p>`;
}

// Função para resetar o formulário e o resultado
function resetFormulario() {
  quantidadeEl.value = ""; // Limpa o campo de quantidade
  cotacaoDolarEl.value = ""; // Limpa o campo de cotação
  resultsDolarEl.textContent = ""; // Limpa o resultado
}

// Função principal para adicionar os eventos
function calculaQuantidade() {
  buttonDolarEl.addEventListener("click", compraDolar); // Evento de calcular
  resetButtonEl.addEventListener("click", resetFormulario); // Evento de resetar
}

// Adiciona os eventos ao carregar o DOM
document.addEventListener("DOMContentLoaded", calculaQuantidade);

// Chama a função principal
export { calculaQuantidade };
