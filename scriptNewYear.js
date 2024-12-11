const happyEl = document.getElementById("happy");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const currentYear = new Date().getFullYear();
const endOfYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

function updateCountdown() {
  const nowDate = new Date(); // Data atual
  const timeDifferent = endOfYear - nowDate; // Diferença em milissegundos

  if (timeDifferent <= 0) {
    happyEl.textContent = "Feliz Ano Novo";
    x;
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondEl.textContent = "0";
    return;
  }

  // Cálculos de dias, horas, minutos e segundos
  const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifferent / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifferent / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifferent / 1000) % 60);

  // Atualiza os elementos do DOM
  daysEl.textContent = days;
  hoursEl.textContent = hours.toString().padStart(2, "0"); // Garante dois dígitos
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondEl.textContent = seconds.toString().padStart(2, "0");
}

// Atualiza o contador a cada segundo
setInterval(updateCountdown, 1000);

// Atualiza imediatamente na primeira execução
export { updateCountdown };
