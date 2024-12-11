// Função para obter coordenadas de uma localização
async function getCoordinates(location) {
  // Verifica se a entrada já é no formato de coordenadas (latitude, longitude)
  const coordPattern = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
  if (coordPattern.test(location)) {
    // Divide a string de coordenadas e converte para números
    const [lat, lon] = location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    // Retorna as coordenadas em um objeto
    return { latitude: lat, longitude: lon };
  }

  try {
    // Faz uma requisição para a API Nominatim para buscar as coordenadas baseadas em uma localização textual
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`
    );
    //Converte a resposta da API de JSON para um objeto JavaScript utilizável.
    const data = await response.json();

    // Se a API retornar resultados, extrai latitude e longitude
    if (data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }

    // Lança um erro se a localização não for encontrada
    throw new Error("Localização não encontrada");
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    throw new Error("Não foi possível encontrar as coordenadas");
  }
}

// Função para determinar a classe de magnitude (baixa, média ou alta)
function getMagnitudeClass(magnitude) {
  if (magnitude < 4.5) return "low"; // Magnitude baixa
  if (magnitude < 6) return "medium"; // Magnitude média
  return "high"; // Magnitude alta
}

// Função para buscar terremotos próximos às coordenadas
async function fetchEarthquakes(latitude, longitude) {
  try {
    // Faz uma requisição à API USGS para obter terremotos dentro de um raio de 1000 km e magnitude mínima de 4.5
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=1000&minmagnitude=4.5&limit=20`
    );
    const data = await response.json();
    // Retorna os terremotos encontrados
    return data.features;
  } catch (error) {
    console.error("Erro ao buscar terremotos:", error);
    throw new Error("Não foi possível buscar terremotos");
  }
}

// Função para exibir os terremotos encontrados
function displayEarthquakes(earthquakes, location, resultsContainer) {
  if (earthquakes.length === 0) {
    // Exibe mensagem caso não haja terremotos próximos
    resultsContainer.innerHTML = `<p>Nenhum terremoto encontrado próximo a ${location}.</p>`;
    return;
  }

  // Mapeia os terremotos em elementos HTML para exibição
  const earthquakesList = earthquakes
    .map((quake) => {
      // Determina a classe de magnitude para estilização
      const magnitudeClass = getMagnitudeClass(quake.properties.mag);

      return `
          <div class="earthquake__list-item">
              <div>
                  <strong>Local:</strong> ${quake.properties.place} <br>
                  <strong>Data:</strong> ${new Date(
                    quake.properties.time
                  ).toLocaleString()}
              </div>
              <div class="earthquake__magnitude earthquake__magnitude--${magnitudeClass}">
                  Magnitude: ${quake.properties.mag}
              </div>
          </div>
      `;
    })
    .join("");

  // Atualiza o container de resultados com os terremotos
  resultsContainer.innerHTML = `
      <h2>Terremotos próximos a ${location}</h2>
      ${earthquakesList}
  `;
}

// Função principal que coordena a busca de terremotos
async function searchEarthquakes(location) {
  const resultsContainer = document.getElementById("resultsContainer");

  // if (!location) {
  //   alert("Por favor, digite uma localização");
  //   return;
  // }

  try {
    // Mostra uma mensagem enquanto busca terremotos
    resultsContainer.innerHTML = "<p>Buscando terremotos...</p>";

    // Obtém as coordenadas da localização
    const coordinates = await getCoordinates(location);

    // Busca os terremotos próximos às coordenadas
    const earthquakes = await fetchEarthquakes(
      coordinates.latitude,
      coordinates.longitude
    );

    // Exibe os resultados na página
    displayEarthquakes(earthquakes, location, resultsContainer);
  } catch (error) {
    console.error("Erro no processo:", error);
    resultsContainer.innerHTML = `<p>Erro: ${error.message}</p>`;
  }
}

// Configuração do evento de busca na interface
document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("locationInput");
  const searchButton = document.getElementById("searchButton");

  // Adiciona evento de clique no botão de busca
  searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    searchEarthquakes(location);
  });

  // Permite buscar ao pressionar Enter no campo de entrada
  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const location = locationInput.value.trim();
      searchEarthquakes(location);
    }
  });
});

// Exporta funções para uso em outros módulos ou arquivos
export { getCoordinates, fetchEarthquakes, searchEarthquakes };
