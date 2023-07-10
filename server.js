const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/gerar-pdf", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:8081", { waitUntil: "networkidle0" });

  const width = 900;
  const height = 400;
  await page.setViewport({ width, height });

  // Gera o PDF
  const pdfBuffer = await page.pdf({ format: "A4", width, height });

  await browser.close();

  // Define o cabeçalho para forçar o download do arquivo
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="formulario-de-pagamento.pdf"',
  });

  // Envie o buffer do PDF como resposta
  res.send(pdfBuffer);
});

app.listen(8081, function () {
  console.log("Servidor aberto na porta 8081");
  console.log("http://localhost:8081");
});
