// Seleção dos elementos do DOM (campos de entrada, botões e área de resultados)
const cmEl = document.getElementById("centimetros"); // Campo para Inches para Centímetros
const cmParaInchesEl = document.getElementById("cmParaInches"); // Campo para Centímetros para Inches
const kmEl = document.getElementById("quilometros"); // Campo para Milhas para Quilômetros
const kmParaMilesEl = document.getElementById("kmParaMiles"); // Campo para Quilômetros para Milhas
const pesoEl = document.getElementById("peso"); // Campo para Pounds para Quilos
const poundsParaKgEl = document.getElementById("poundsParaKg"); // Campo para Quilos para Pounds
const buttonEl = document.getElementById("medidasButton"); // Botão de conversão
const resetButtonEl = document.getElementById("medidasLimparButton"); // Botão de limpar campos
const resultsMedidasEl = document.getElementById("resultsMedidas"); // Área para exibir os resultados

// Função para converter valores com base em um fator de multiplicação
const conversao = (valor, fator) =>
  isNaN(valor) ? "" : (valor * fator).toFixed(2); // Retorna o valor convertido ou vazio se for inválido

// Função para exibir os resultados no elemento de resultados
const exibirResultados = (resultados) => {
  resultsMedidasEl.innerHTML = resultados.length
    ? resultados.join("<br>") // Exibe os resultados, separados por quebras de linha
    : "Por favor, insira um valor válido."; // Mensagem de erro se nenhum valor válido for inserido
};

// Função principal para realizar as conversões
function converterMedidas() {
  // Obtenção e parsing dos valores dos campos de entrada
  const valores = {
    cm: parseFloat(cmEl.value), // Inches para Centímetros
    cmInches: parseFloat(cmParaInchesEl.value), // Centímetros para Inches
    km: parseFloat(kmEl.value), // Milhas para Quilômetros
    kmMiles: parseFloat(kmParaMilesEl.value), // Quilômetros para Milhas
    pounds: parseFloat(pesoEl.value), // Pounds para Quilos
    kg: parseFloat(poundsParaKgEl.value), // Quilos para Pounds
  };

  const resultados = []; // Array para armazenar os resultados das conversões

  // Convertendo Inches para Centímetros e vice-versa
  if (valores.cm)
    resultados.push(
      `${valores.cm} inches equivale a ${conversao(valores.cm, 2.54)} cm.`
    );
  if (valores.cmInches)
    resultados.push(
      `${valores.cmInches} cm equivale a ${conversao(
        valores.cmInches,
        1 / 2.54
      )} inches.`
    );

  // Convertendo Milhas para Quilômetros e vice-versa
  if (valores.km)
    resultados.push(
      `${valores.km} milhas equivale a ${conversao(valores.km, 1.60934)} km.`
    );
  if (valores.kmMiles)
    resultados.push(
      `${valores.kmMiles} km equivale a ${conversao(
        valores.kmMiles,
        1 / 1.60934
      )} milhas.`
    );

  // Convertendo Pounds para Quilos e vice-versa
  if (valores.pounds)
    resultados.push(
      `${valores.pounds} pounds equivale a ${conversao(
        valores.pounds,
        0.453592
      )} kg.`
    );
  if (valores.kg)
    resultados.push(
      `${valores.kg} kg equivale a ${conversao(
        valores.kg,
        1 / 0.453592
      )} pounds.`
    );

  // Exibir os resultados na tela
  exibirResultados(resultados);

  // Limpar os campos após a conversão
  cmEl.value = "";
  cmParaInchesEl.value = "";
  kmEl.value = "";
  kmParaMilesEl.value = "";
  pesoEl.value = "";
  poundsParaKgEl.value = "";
}

// Função para limpar os campos e os resultados manualmente
function limparCampos() {
  cmEl.value = "";
  cmParaInchesEl.value = "";
  kmEl.value = "";
  kmParaMilesEl.value = "";
  pesoEl.value = "";
  poundsParaKgEl.value = "";
  resultsMedidasEl.textContent = ""; // Remove qualquer texto exibido nos resultados
}

// Adicionando o evento de clique para o botão de conversão
buttonEl.addEventListener("click", converterMedidas);

// Adicionando o evento de clique para o botão de limpar campos
resetButtonEl.addEventListener("click", limparCampos);

// Permitindo que o usuário pressione "Enter" para realizar a conversão
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    converterMedidas();
  }
});

// Exportando a função para possíveis usos externos
export { converterMedidas };
