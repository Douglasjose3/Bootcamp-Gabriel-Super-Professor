// Seleciona o campo de entrada onde o usuário digitará a temperatura em Fahrenheit
const fahrenheitInput = document.getElementById("fahrenheit");

// Seleciona o botão responsável por converter a temperatura
const convertButton = document.getElementById("convertButton");

// Seleciona o botão de reset, usado para limpar os campos
const resetButtonEl = document.getElementById("resetButton");

// Seleciona o elemento onde o resultado será exibido
const resultDisplay = document.getElementById("result");

// Função para converter a temperatura de Fahrenheit para Celsius
function convertTemperature() {
  // Obtém o valor digitado pelo usuário e o converte para um número de ponto flutuante
  const fahrenheit = parseFloat(fahrenheitInput.value);

  // Valida se o campo não está vazio e o valor inserido não é um número
  if (fahrenheitInput.value !== "" && isNaN(fahrenheit)) {
    // Exibe uma mensagem de erro se o valor não for válido
    resultDisplay.textContent = "Por favor, insira um número válido.";
    resultDisplay.style.color = "red"; // Define a cor do texto como vermelho
    return; // Interrompe a execução da função
  }

  // Caso o valor seja um número válido
  if (!isNaN(fahrenheit)) {
    // Calcula a temperatura equivalente em Celsius
    const celsius = ((fahrenheit - 32) * 5) / 9;

    // Exibe o resultado na tela, formatado com duas casas decimais
    resultDisplay.textContent = `${fahrenheit}°F equivale a ${celsius.toFixed(
      2
    )}°C.`;
    resultDisplay.style.color = "black"; // Define a cor do texto como preto
  }

  // Limpa o campo de entrada após a conversão
  fahrenheitInput.value = "";
}

// Função para resetar o conversor
function resetConverter() {
  // Limpa o campo de entrada
  fahrenheitInput.value = "";

  // Limpa o texto do resultado
  resultDisplay.textContent = "";
}

// Função principal que adiciona os eventos ao DOM
function calculaTemperatura() {
  // Adiciona um evento de clique ao botão de conversão
  convertButton.addEventListener("click", convertTemperature);

  // Adiciona um evento de clique ao botão de reset
  resetButtonEl.addEventListener("click", resetConverter);

  // Adiciona um evento de pressionamento de tecla no campo de entrada
  fahrenheitInput.addEventListener("keypress", (event) => {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === "Enter") {
      // Chama a função de conversão ao pressionar "Enter"
      convertTemperature();
    }
  });
}

// Exporta a função para ser utilizada em outros módulos
export { calculaTemperatura };
