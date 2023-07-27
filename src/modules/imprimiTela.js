export default function imprimirTela(data) {
  const setLocalStorage = (dbPrev) =>
    localStorage.setItem("db_prev", JSON.stringify(dbPrev));

  //setLocalStorage(data);

  fetch("http://localhost:8081/g", {
    method: "POST",
    body: data,
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Cria um link temporário
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "nome_do_arquivo.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });

  //window.location.href = "http://localhost:8081/g";

  // const controle = true; // controle do forms
  // if (controle) {
  //   document.getElementById("btn1").style.display = "none";
  //   document.getElementById("btn2").style.display = "none";
  //   document.getElementById("btn3").style.display = "none";
  //   document.getElementById("btn4").style.display = "none";
  //   document.getElementById("modelosList").style.display = "none";
  //   window.print();
  //   document.getElementById("btn1").style.display = "block";
  //   document.getElementById("btn2").style.display = "block";
  //   document.getElementById("btn3").style.display = "block";
  //   document.getElementById("btn4").style.display = "block";
  //   document.getElementById("modelosList").style.display = "block";
  //   //window.location.reload()
  // }
  return;
}
