// const express = require("express");
// const app = express();
// //const path = require("path");
// const ejs = require("ejs");
// const puppeteer = require("puppeteer");

// export default function pdfGeneration(req, res) {
//   let browser;
//   (async () => {
//     const formEl = document.getElementById("form-pgto");
//     const formData = new FormData(formEl);
//     const data = Object.fromEntries(formData);

//     browser = await puppeteer.launch();
//     const [page] = await browser.pages();
//     const html = await ejs.renderFile("./src/includes/transBanc.ejs", {
//       codCond: data.codCond,
//     });
//     await page.setContent(html);
//     const pdf = await page.pdf({ format: "A4" });
//     res.contentType("application/pdf");

//     // optionally:
//     res.setHeader("Content-Disposition", "attachment; filename=teste.pdf");

//     res.send(pdf);
//   })()
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     })
//     .finally(() => browser?.close());
// }
