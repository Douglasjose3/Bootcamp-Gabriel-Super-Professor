const API_KEY = "af8362666c3dae38f850242223ed3719"; // Substitua pela sua chave da API OpenWeatherMap

// Função para obter dados de clima e horário de uma cidade pelo nome
async function fetchWeatherAndTimeByName(city) {
  // city: Parâmetro - Nome da cidade fornecido pelo usuário (string)
  // Chamada: Passado pela função updateCityWeather quando o usuário insere o nome da cidade

  // Monta a URL da API para buscar as coordenadas geográficas da cidade
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const geoResponse = await fetch(geoUrl); // Faz uma requisição HTTP para a API usando a URL
  const geoData = await geoResponse.json(); // Converte a resposta para um objeto JSON (array)

  // Verifica se a cidade foi encontrada
  if (geoData.length === 0) {
    alert("City not found. Please try again."); // Alerta caso a cidade não exista
    return null; // Retorna null para indicar erro
  }

  // geoData[0]: Objeto contendo as informações da cidade, incluindo latitude e longitude
  const { lat, lon } = geoData[0]; // Extrai as propriedades lat (latitude) e lon (longitude) // geoData[0] esse [0] é o index que retorna o primeiro elemento do array

  // Chama a função fetchWeatherAndTimeByCoordinates para buscar dados climáticos com base nas coordenadas
  // Parâmetros lat e lon são extraídos do objeto geoData
  return await fetchWeatherAndTimeByCoordinates(lat, lon);
}

// Função para obter dados de clima e horário pela localização (latitude e longitude)
async function fetchWeatherAndTimeByCoordinates(lat, lon) {
  // lat, lon: Parâmetros - Coordenadas geográficas (números decimais)
  // Chamada: Invocada por fetchWeatherAndTimeByName ou updateCurrentLocationWeather, passando valores extraídos das APIs ou do navegador

  // Monta a URL da API para buscar dados climáticos
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const weatherResponse = await fetch(weatherUrl); // Faz uma requisição HTTP para a API usando a URL
  const weatherData = await weatherResponse.json(); // Converte a resposta para um objeto JSON

  // weatherData: Objeto retornado pela API contendo informações sobre clima, localização e fuso horário

  // Calcula o horário local com base no fuso horário retornado pela API
  const timezoneOffset = weatherData.timezone; // Diferença de fuso em segundos (número)
  const localTime = new Date(Date.now() + timezoneOffset * 1000) // Adiciona o offset ao horário UTC atual
    .toUTCString() // Converte para string no formato UTC
    .slice(17, 25); // Extrai apenas o horário (HH:MM:SS)

  // Retorna um objeto com os dados formatados
  return {
    location: weatherData.name, // Nome da localização (string)
    weather: `${weatherData.weather[0].description}, ${weatherData.main.temp}°C`, // Descrição do clima e temperatura (string)
    time: localTime, // Horário local formatado (string)
  };
}

// Função para buscar e atualizar dados da localização atual
async function updateCurrentLocationWeather() {
  // Chamada: Usada diretamente na inicialização da página e no intervalo de atualização
  // Usa a API do navegador para obter as coordenadas geográficas do usuário

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      // position: Objeto fornecido pela API de geolocalização do navegador
      // position.coords.latitude e position.coords.longitude: Coordenadas geográficas atuais

      const lat = position.coords.latitude; // Obtém a latitude
      const lon = position.coords.longitude; // Obtém a longitude

      // Busca os dados climáticos para as coordenadas obtidas
      const data = await fetchWeatherAndTimeByCoordinates(lat, lon);

      // Atualiza os elementos HTML se os dados foram recebidos
      if (data) {
        document.getElementById(
          "currentLocation"
        ).textContent = `Location: ${data.location}`; // Atualiza o texto com a localização
        document.getElementById(
          "currentWeather"
        ).textContent = `Weather: ${data.weather}`; // Atualiza o texto com o clima
        document.getElementById(
          "currentTime"
        ).textContent = `Time: ${data.time}`; // Atualiza o texto com o horário local
      }
    },
    () => {
      alert("Unable to fetch location."); // Mensagem de erro caso a localização não possa ser obtida
    }
  );
}

// Função para buscar e atualizar dados da cidade selecionada
async function updateCityWeather(city) {
  // city: Parâmetro - Nome da cidade fornecido pelo usuário (string)
  // Chamada: Invocada no evento de clique no botão de busca, com o valor do campo de entrada do usuário

  // Busca os dados de clima e horário para a cidade especificada
  const data = await fetchWeatherAndTimeByName(city);

  // Atualiza os elementos HTML se os dados foram recebidos
  if (data) {
    document.getElementById(
      "cityWeather"
    ).textContent = `Weather: ${data.weather}`; // Atualiza o texto com o clima da cidade
    document.getElementById("cityTime").textContent = `Time: ${data.time}`; // Atualiza o texto com o horário da cidade
  }
}

// Evento para buscar dados ao clicar no botão de busca
document.getElementById("searchCity").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value; // Obtém o nome da cidade digitado pelo usuário
  if (city) {
    await updateCityWeather(city); // Chama updateCityWeather passando o nome da cidade como parâmetro
    setInterval(() => updateCityWeather(city), 1000); // Atualiza a cada 1 minuto
  } else {
    alert("Please enter a city name."); // Alerta se o campo estiver vazio
  }
});

// Atualiza o clima e horário da localização atual a cada 1 minuto
setInterval(updateCurrentLocationWeather, 1000);
// Chama a função updateCurrentLocationWeather automaticamente em intervalos definidos

// Executa a função para buscar o clima e horário com base na localização ao carregar a página
export { updateCurrentLocationWeather }; // Exporta a função para uso em outros módulos ou arquivos
