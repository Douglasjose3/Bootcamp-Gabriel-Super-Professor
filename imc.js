const peso = 96;
const altura = 1.82;
const meuImc = peso / (altura * altura);

const pesoDoPrimo = 83;
const alturaDoPrimo = 1.76;
const imcDoPrimo = calculaImc(alturaDoPrimo, pesoDoPrimo);
mostra(
  "O IMC do meu primo é: " +
    (imcDoPrimo - 18.5) +
    " pontos acima do limite da magresa."
);

function mostra(frase) {
  document.getElementById("imc").textContent = frase;
}

function calculaImc(altura, peso) {
  const imc = peso / (altura * altura);
  return imc;
}

calculaImc(pesoDoPrimo, alturaDoPrimo);
