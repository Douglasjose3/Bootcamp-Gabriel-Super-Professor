let horas = document.getElementById("horas");
let minutos = document.getElementById("minutos");
let segundos = document.getElementById("segunbdos");
let amPm = document.getElementById("amPm");

let h = document.getElementById("hh");
let m = document.getElementById("mm");
let s = document.getElementById("ss");

let hr_ponto = document.querySelector(".hr_ponto");
let min = document.querySelector(".min_ponto");
let seg = document.querySelector(".seg_ponto");

function fusoHorario() {
  setInterval(() => {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let amdDmd = h >= 12 ? "PM" : "AM";

    if (h > 12) {
      h = h - 12;
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    horas.innerHTML = h + `<br><span>Horas</span>`;
    minutos.innerHTML = m + `<br><span>Minutos</span>`;
    segundos.innerHTML = s + `<br><span>Segundos</span>`;
    amPm.innerHTML = amdDmd;

    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
  });
}

export { fusoHorario };
