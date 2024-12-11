// Referências aos elementos do DOM
const formEl = document.getElementById("formMoeda"); // Formulário
const reaisEl = document.getElementById("reais"); // Campo de entrada para valores em reais
const dolarEl = document.getElementById("dolar"); // Campo de entrada para valores em dólares
const buttonConvertEl = document.getElementById("button-convert"); // Botão para realizar a conversão
const buttonResetEl = document.getElementById("button-reset-moeda");
const resultsEl = document.getElementById("results-currency"); // Elemento para mostrar o resultado
const dolarIndexEl = document.getElementById("dolar-index"); // Elemento para exibir o índice do dólar

// URL da API para pegar a taxa de câmbio USD-BRL
const BRL_USD_API_URL = "https://economia.awesomeapi.com.br/last/USD-BRL";

// Variável para armazenar o valor anterior do dólar e determinar se ele subiu ou desceu
let previousDolarValue = null;

// Função assíncrona para buscar o índice do dólar
async function getCurrency(urlApi) {
  try {
    const response = await fetch(urlApi);
    if (!response.ok) throw new Error("Erro ao buscar dados da API.");

    const responseData = await response.json();
    const dolarValue = Number(responseData.USDBRL.bid);

    // Verifica a primeira execução e atualiza a cor do índice do dólar
    if (previousDolarValue !== null) {
      if (dolarValue > previousDolarValue) {
        dolarIndexEl.style.color = "green"; // Alta
      } else if (dolarValue < previousDolarValue) {
        dolarIndexEl.style.color = "red"; // Queda
      }
    } else {
      // Caso seja a primeira execução, inicializa a cor (neutra ou outra cor)
      dolarIndexEl.style.color = "black"; // Cor inicial (neutra)
    }

    // Exibe o valor do dólar
    dolarIndexEl.textContent = `Índice do dólar: R$ ${dolarValue.toFixed(3)}`;

    // Atualiza o valor anterior para a próxima comparação
    previousDolarValue = dolarValue;

    return dolarValue;
  } catch (error) {
    resultsEl.innerHTML = "Erro ao obter o índice do dólar. Tente novamente.";
    throw error;
  }
}

// Função para realizar a conversão de moedas
function convertCurrency(currencyValueInput, currencyRate, isBrlToUsd) {
  if (isBrlToUsd) {
    // Se for conversão de BRL para USD
    return Number(currencyValueInput) / Number(currencyRate);
  } else {
    // Se for conversão de USD para BRL
    return Number(currencyValueInput) * Number(currencyRate);
  }
}

// Função para exibir o resultado da conversão e limpar os campos
function showResults(convertCurrencyP, inputValue, currencyRate, isBrlToUsd) {
  const inputValueNumber = Number(inputValue.value);

  // Verificando se o valor de entrada é válido
  if (isNaN(inputValueNumber) || inputValueNumber <= 0) {
    resultsEl.textContent = "Por favor, insira um valor válido.";
    return;
  }

  // Realizando a conversão
  const result = convertCurrencyP(inputValueNumber, currencyRate, isBrlToUsd);

  // Exibindo o resultado da conversão com R$
  resultsEl.innerHTML = `Valor convertido: R$ ${result.toFixed(2)}`;

  // Limpando os campos de entrada
  reaisEl.value = "";
  dolarEl.value = "";
}

// Função para resetar os campos e o resultado
function resetForm() {
  reaisEl.value = ""; // Limpa o campo de reais
  dolarEl.value = ""; // Limpa o campo de dólar
  resultsEl.textContent = ""; // Limpa o resultado
  dolarIndexEl.textContent = ""; // Limpa o índice do dólar (se necessário)
}

// Função principal que inicializa todas as funcionalidades
async function startFunctions() {
  try {
    // Obtendo a taxa de câmbio atual do dólar
    const currencyRate = await getCurrency(BRL_USD_API_URL);

    // Configurando o evento de clique no botão de conversão
    buttonConvertEl.addEventListener("click", () => {
      if (reaisEl.value !== "") {
        // Se o campo de reais estiver preenchido, converte de BRL para USD
        showResults(convertCurrency, reaisEl, currencyRate, true);
      } else if (dolarEl.value !== "") {
        // Se o campo de dólar estiver preenchido, converte de USD para BRL
        showResults(convertCurrency, dolarEl, currencyRate, false);
      }
    });

    // Configurando o evento de tecla Enter para realizar a conversão
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        if (reaisEl.value !== "") {
          // Se o campo de reais estiver preenchido, converte de BRL para USD
          showResults(convertCurrency, reaisEl, currencyRate, true);
        } else if (dolarEl.value !== "") {
          // Se o campo de dólar estiver preenchido, converte de USD para BRL
          showResults(convertCurrency, dolarEl, currencyRate, false);
        }
      }
    });

    // Configurando o evento de clique no botão de reset
    buttonResetEl.addEventListener("click", resetForm); // Corrigido para usar "click"
  } catch (error) {
    // Caso haja erro na execução das funções
    console.error("Erro na execução:", error);
  }
}

// Exportando a função startFunctions para ser utilizada em outros módulos
export { startFunctions };
