import { mostraMelhorOpcao } from "./calculaCombustivel.js";
import { startFunctions } from "./conversorMoedas.js";
import { calculaTemperatura } from "./conversorTemperatura.js";
import { searchEarthquakes } from "./earthQuake.js";
import { calculaQuantidade } from "./compraDolar.js";
import { updateCountdown } from "./scriptNewYear.js";
import { converterMedidas } from "./conversorDeMedidas.js";
import { updateCurrentLocationWeather } from "./previsoDoTempo.js";

mostraMelhorOpcao();
startFunctions();
calculaTemperatura();
searchEarthquakes();
calculaQuantidade();
updateCountdown();
converterMedidas();
updateCurrentLocationWeather();
