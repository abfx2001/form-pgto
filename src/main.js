import 'core-js/stable'
import 'regenerator-runtime/runtime'
// para navegadores mais antigos...

import './assets/css/style.css'

import selecTipoPag from './modules/seletorPix'
import timeStampNow from './modules/timeStamp'
import inputMask from './modules/inputMask'
import autocomplet from './modules/autocomplet'
import imprimirTela from './modules/imprimiTela'
import buscaCond from './modules/buscaCond'
import validacao from './modules/validacao'

selecTipoPag()
timeStampNow()
inputMask()
autocomplet()

const formEl = document.getElementById('form-pgto')

document.addEventListener('click', e => {
    const el = e.target;
    const nomeClass = el.className.toLowerCase()
    if (nomeClass === 'limpar btn-form') {
        e.preventDefault()
        window.location.reload()
    } if (nomeClass === 'imprimir btn-form') {
        e.preventDefault()
        const formData = new FormData(formEl)
        const data = Object.fromEntries(formData)
        validacao(data)
        //imprimirTela()
    }
});

const codCond = document.getElementById('codCond')
codCond.addEventListener('keyup', buscaCond)