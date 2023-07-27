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
  console.log(JSON.stringify(req.body));
  let browser;
  (async () => {
    const data = req.body;
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const html = await ejs.renderFile("./src/includes/transBanc.ejs", {
      codCond: "teste", //data,
    });
    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4" });
    res.contentType("application/pdf");

    // // optionally:
    // res.setHeader("Content-Disposition", "attachment; filename=teste1.pdf");

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
