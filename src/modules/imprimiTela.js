export default function imprimirTela(data) {
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
      link.download = "nome_do_arquivo.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
  return;
}
