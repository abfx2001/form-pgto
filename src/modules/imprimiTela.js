export default function imprimirTela() {
  const controle = true; // controle do forms
  if (controle) {
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn2").style.display = "none";
    document.getElementById("btn3").style.display = "none";
    document.getElementById("btn4").style.display = "none";
    document.getElementById("modelosList").style.display = "none";
    window.print();
    document.getElementById("btn1").style.display = "block";
    document.getElementById("btn2").style.display = "block";
    document.getElementById("btn3").style.display = "block";
    document.getElementById("btn4").style.display = "block";
    document.getElementById("modelosList").style.display = "block";
    //window.location.reload()
  }
  return;
}
