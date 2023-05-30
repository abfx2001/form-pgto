const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(8081, function () {
    console.log("Servidor aberto na porta 8081")
    console.log("http://localhost:8081")
})