import "core-js/stable";
import "regenerator-runtime/runtime";

import "./assets/css/style.css";

import selecTipoPag from "./modules/seletorPix";
import timeStampNow from "./modules/timeStamp";
import inputMask from "./modules/inputMask";
import autocomplet from "./modules/autocomplet";
import buscaCond from "./modules/buscaCond";
import validacao from "./modules/validacao";
import predefinicao from "./modules/predefinicoes";
import removePredef from "./modules/removePredef";
import loadModelo from "./modules/loadModelo";

selecTipoPag();
timeStampNow();
inputMask();
autocomplet();

const modeloSelect = document.getElementById("modelosList");
modeloSelect.addEventListener("change", function () {
  loadModelo();
});

const formEl = document.getElementById("form-pgto");

document.addEventListener("click", (e) => {
  const el = e.target;
  const nomeClass = el.className.toLowerCase();
  if (nomeClass === "limpar btn-form") {
    e.preventDefault();
    window.location.reload();
  }
  if (nomeClass === "imprimir btn-form") {
    e.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    validacao(data);
  }
  if (nomeClass === "newpredef btn-form") {
    e.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    predefinicao(data);
  }
  if (nomeClass === "delpredef btn-form") {
    e.preventDefault();
    const id = document.getElementById("modelosList").value;
    removePredef(id);
  }
});

const codCond = document.getElementById("codCond");
codCond.addEventListener("keyup", buscaCond);

window.addEventListener("keydown", function (event) {
  if (event.ctrlKey && (event.key === "p" || event.keyCode === 80)) {
    event.preventDefault();
    alert("Utilize o botão de imprimir!");
  }
});

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_predef")) ?? [];

var modelosList = document.getElementById("modelosList");
modelosList.innerHTML = `<option value=""> ------------------------- </option>`;
getLocalStorage().map((e) => {
  modelosList.innerHTML += `
    <option value="${e.id}">${e.nomeModelo}</option>
    `;
});

function enviadados() {
  const objetoLocal = localStorage.getItem("db_predef");

  fetch("http://localhost:8081/f", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: objetoLocal,
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {});
  return;
}

window.onload = enviadados;
