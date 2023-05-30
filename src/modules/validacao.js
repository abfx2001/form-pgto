import imprimirTela from "./imprimiTela"

const codCond = document.getElementById('td-codCond')
const dataPag = document.getElementById('td-dataPag')
const valorPag = document.getElementById('td-valorPag')
const nomeFavorecido = document.getElementById('td-nomeFavorecido')
const cpfCnpjFavorecido = document.getElementById('td-cpfCnpjFavorecido')
const nomeBanco = document.getElementById('td-nomeBanco')
const agenciaBnc = document.getElementById('td-agenciaBnc')
const contaBnc = document.getElementById('td-contaBnc')
const nomeGerente = document.getElementById('td-nomeGerente')
const formaDePagamento = document.getElementById('formaDePagamento')



export default function validacao(data) {
    let controle = 0
    if (data.codCond == '') {
        codCond.classList.add("errosTd");
        controle = 1
    }
    if (data.dataPag == '') {
        dataPag.classList.add("errosTd");
        controle = 1
    }
    if (data.valorPag == '') {
        valorPag.classList.add("errosTd");
        controle = 1
    }
    if (data.nomeFavorecido == '') {
        nomeFavorecido.classList.add("errosTd");
        controle = 1
    }
    if (data.cpfCnpjFavorecido == '') {
        cpfCnpjFavorecido.classList.add("errosTd");
        controle = 1
    }

    if (data.nomeGerente == '') {
        nomeGerente.classList.add("errosTd");
        controle = 1
    }
    if (formaDePagamento.value !== 'transBanc') {
        if (data.pixCPF == '') {
            const tipoChavePix = document.getElementById('tipoChavePix')
            tipoChavePix.classList.add("errosTd");
            controle = 1
        }
        if (data.pixEmail == '') {
            const tipoChavePix = document.getElementById('tipoChavePix')
            tipoChavePix.classList.add("errosTd");
            controle = 1
        }
        if (data.pixTel == '') {
            const tipoChavePix = document.getElementById('tipoChavePix')
            tipoChavePix.classList.add("errosTd");
            controle = 1
        }
    } else {
        if (data.nomeBanco == '') {
            nomeBanco.classList.add("errosTd");
            controle = 1
        }
        if (data.agenciaBnc == '') {
            agenciaBnc.classList.add("errosTd");
            controle = 1
        }
        if (data.contaBnc == '') {
            contaBnc.classList.add("errosTd");
            controle = 1
        }
    }

    if (controle == 0) {
        imprimirTela()
    }

    const interval = setInterval(() => {
        codCond.classList.remove("errosTd");
        dataPag.classList.remove("errosTd");
        valorPag.classList.remove("errosTd");
        nomeFavorecido.classList.remove("errosTd");
        cpfCnpjFavorecido.classList.remove("errosTd");
        nomeBanco.classList.remove("errosTd");
        agenciaBnc.classList.remove("errosTd");
        contaBnc.classList.remove("errosTd");
        nomeGerente.classList.remove("errosTd");
        if (formaDePagamento.value !== 'transBanc') {
            tipoChavePix.classList.remove("errosTd");
        }
    }, 3500);




}