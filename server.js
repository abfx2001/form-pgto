const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const rawCondsData = JSON.parse(
  fs.readFileSync("./public/database/condominios.json")
);

app.post("/g", (req, res) => {
  let browser;
  const data = req.body;

  let dataFormatada;
  const dataOriginal = data.dataPag;
  const partesData = dataOriginal.split("-");
  let dataObjeto = new Date(partesData[0], partesData[1] - 1, partesData[2]);
  let dia = dataObjeto.getDate();
  let mes = dataObjeto.getMonth() + 1;
  let ano = dataObjeto.getFullYear();
  if (dia < 10 && mes < 10) {
    dataFormatada = "0" + dia + "/0" + mes + "/" + ano;
  }
  if (dia < 10 && mes >= 10) {
    dataFormatada = "0" + dia + "/" + mes + "/" + ano;
  }
  if (dia >= 10 && mes < 10) {
    dataFormatada = dia + "/0" + mes + "/" + ano;
  }
  if (dia >= 10 && mes >= 10) {
    dataFormatada = dia + "/" + mes + "/" + ano;
  }

  function buscaCond(data) {
    let nomeCond;
    let cnpjCond;
    rawCondsData.forEach((rawCondsData) => {
      if (rawCondsData.cod == data.codCond) {
        nomeCond = rawCondsData.condominio;
        cnpjCond = rawCondsData.cnpj;
        return;
      }
    });
    return {
      nomeCondData: nomeCond,
      cnpjCondData: cnpjCond,
    };
  }
  const condData = buscaCond(data);

  (async () => {
    let html;
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    if (data.formaDePagamento == "transBanc") {
      html = await ejs.renderFile("./src/includes/transBanc.ejs", {
        historico: data.historico,
        dataHora: data.dataHora,
        nomeCond: condData.nomeCondData,
        cnpjCond: condData.cnpjCondData,
        agenciaBnc: data.agenciaBnc,
        codCond: data.codCond,
        contaBnc: data.contaBnc,
        cpfCnpjFavorecido: data.cpfCnpjFavorecido,
        dataPag: dataFormatada,
        formaDePagamento: "TRANSFERÊNCIA BANCÁRIA",
        nomeBanco: data.nomeBanco,
        nomeFavorecido: data.nomeFavorecido,
        nomeGerente: data.nomeGerente,
        tipoAnexo: data.tipoAnexo,
        tipoConta: data.tipoConta,
        tipoContabil: data.tipoContabil,
        valorPag: data.valorPag,
      });
    } else {
      let valorPix;
      let tipoChavePix;
      if (data.formaDePagamento == "pixCpf") {
        valorPix = data.pixCPF;
        tipoChavePix = "CHAVE PIX (CPF/CNPJ)";
      }
      if (data.formaDePagamento == "pixEmail") {
        valorPix = data.pixEmail;
        tipoChavePix = "CHAVE PIX (E-MAIL)";
      }
      if (data.formaDePagamento == "pixTel") {
        valorPix = data.pixTel;
        tipoChavePix = "CHAVE PIX (TELEFONE)";
      }
      if (data.formaDePagamento == "pixAle") {
        valorPix = data.pixAle;
        tipoChavePix = "CHAVE PIX (ALEATÓRIA)";
      }

      html = await ejs.renderFile("./src/includes/pix.ejs", {
        historico: data.historico,
        dataHora: data.dataHora,
        nomeCond: condData.nomeCondData,
        cnpjCond: condData.cnpjCondData,
        agenciaBnc: data.agenciaBnc,
        codCond: data.codCond,
        contaBnc: data.contaBnc,
        cpfCnpjFavorecido: data.cpfCnpjFavorecido,
        dataPag: dataFormatada,
        formaDePagamento: "PIX",
        nomeBanco: data.nomeBanco,
        nomeFavorecido: data.nomeFavorecido,
        nomeGerente: data.nomeGerente,
        tipoAnexo: data.tipoAnexo,
        tipoConta: data.tipoConta,
        tipoContabil: data.tipoContabil,
        valorPag: data.valorPag,
        valorPix: valorPix,
        tipoChavePix: tipoChavePix,
      });
    }
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
