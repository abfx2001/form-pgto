export default function imprimirTela(data) {
  const btnCarregando = document.getElementById("btn1");
  btnCarregando.innerHTML = "Baixando...";
  console.log(data);
  fetch("http://localhost:8081/g", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Fomulário-de-Pagamento.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .then(() => {
      btnCarregando.innerHTML = "Salvar";
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
  return;
}
