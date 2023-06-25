import "core-js/stable";
import "regenerator-runtime/runtime";
// para navegadores mais antigos...

import "./assets/css/style.css";

import selecTipoPag from "./modules/seletorPix";
import timeStampNow from "./modules/timeStamp";
import inputMask from "./modules/inputMask";
import autocomplet from "./modules/autocomplet";
//import imprimirTela from './modules/imprimiTela'
import buscaCond from "./modules/buscaCond";
import validacao from "./modules/validacao";
import predefinicao from "./modules/predefinicoes";

selecTipoPag();
timeStampNow();
inputMask();
autocomplet();
//predefinicao();

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
    predefinicao(data);
    //imprimirTela()
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
