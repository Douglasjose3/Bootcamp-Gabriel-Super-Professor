// Seleciona os elementos do DOM
const valorKmGasolinaInput = document.getElementById("gasolina");
const consumoGasolinaInput = document.getElementById("consumoGasolina");
const valorKmAlcoolInput = document.getElementById("alcool");
const consumoAlcoolInput = document.getElementById("consumoAlcool");
const kmPercorridoInput = document.getElementById("kmPercorrido");
const kmButton = document.getElementById("kmButton");
const resultCurrent = document.getElementById("result-combustivel");
const resetButton = document.getElementById("button-reset-combustivel");

// Função que calcula o custo por km e a melhor opção
function calcularCusto() {
  const valorGasolina = parseFloat(valorKmGasolinaInput.value); // Preço por litro
  const consumoGasolina = parseFloat(consumoGasolinaInput.value); // Consumo (km/l)
  const valorAlcool = parseFloat(valorKmAlcoolInput.value); // Preço por litro
  const consumoAlcool = parseFloat(consumoAlcoolInput.value); // Consumo (km/l)
  const kmPercorrido = parseFloat(kmPercorridoInput.value); // Distância total

  // Verifica se os campos estão preenchidos corretamente
  if (
    isNaN(valorGasolina) ||
    isNaN(consumoGasolina) ||
    isNaN(valorAlcool) ||
    isNaN(consumoAlcool) ||
    isNaN(kmPercorrido)
  ) {
    resultCurrent.textContent =
      "Por favor, insira valores válidos para todos os campos.";
    return;
  }

  // Calcula o custo total da viagem e o preço por km
  const custoTotalGasolina = (kmPercorrido / consumoGasolina) * valorGasolina;
  const custoPorKmGasolina = custoTotalGasolina / kmPercorrido;

  const custoTotalAlcool = (kmPercorrido / consumoAlcool) * valorAlcool;
  const custoPorKmAlcool = custoTotalAlcool / kmPercorrido;

  // Determina a melhor opção
  let melhorOpcao = "Gasolina";
  if (custoTotalAlcool < custoTotalGasolina) {
    melhorOpcao = "Álcool";
  }

  // Exibe os resultados
  resultCurrent.innerHTML = `
    <p>Distância total da viagem: ${kmPercorrido} km</p>
    <p>Gasolina: R$${custoTotalGasolina.toFixed(
      2
    )} (R$${custoPorKmGasolina.toFixed(2)}/km)</p>
    <p>Álcool: R$${custoTotalAlcool.toFixed(2)} (R$${custoPorKmAlcool.toFixed(
    2
  )}/km)</p>
    <p><strong>Melhor opção: ${melhorOpcao}</strong></p>
  `;

  // Limpa os campos de input após o cálculo
  valorKmGasolinaInput.value = "";
  consumoGasolinaInput.value = "";
  valorKmAlcoolInput.value = "";
  consumoAlcoolInput.value = "";
  kmPercorridoInput.value = "";
}

// Função para resetar os campos e resultados
function resetarCampos() {
  valorKmGasolinaInput.value = "";
  consumoGasolinaInput.value = "";
  valorKmAlcoolInput.value = "";
  consumoAlcoolInput.value = "";
  kmPercorridoInput.value = "";
  resultCurrent.innerHTML = "";
}

// Adiciona os eventos de clique ao botão de calcular e reset
function mostraMelhorOpcao() {
  kmButton.addEventListener("click", calcularCusto);
  resetButton.addEventListener("click", resetarCampos);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calcularCusto();
    }
  });
}

export { mostraMelhorOpcao };
