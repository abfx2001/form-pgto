const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/g", (req, res) => {
  let browser;
  const data = req.body;
  (async () => {
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const html = await ejs.renderFile("./src/includes/transBanc.ejs", {
      agenciaBnc: data.agenciaBnc,
      codCond: data.codCond,
      contaBnc: data.contaBnc,
      cpfCnpjFavorecido: data.cpfCnpjFavorecido,
      dataPag: data.dataPag,
      formaDePagamento: data.formaDePagamento,
      nomeBanco: data.nomeBanco,
      nomeFavorecido: data.nomeFavorecido,
      nomeGerente: data.nomeGerente,
      pixCPF: data.pixCPF,
      tipoAnexo: data.tipoAnexo,
      tipoConta: data.tipoConta,
      tipoContabil: data.tipoContabil,
      valorPag: data.valorPag,
    });
    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4" });
    res.contentType("application/pdf");
    res.send(pdf);
  })()
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
    .finally(() => browser?.close());
});

app.listen(8081, function () {
  console.log("Servidor aberto na porta 8082");
  console.log("http://localhost:8081");
});
