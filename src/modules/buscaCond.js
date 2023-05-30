export default function buscaCond() {
    const codCond = document.getElementById('codCond')
    const cond = document.getElementById('cond')
    const condCNPJ = document.getElementById('condCNPJ')

    if (codCond.value !== '') {
        try {
            fetch("/database/condominios.json").then((response) => {
                response.json().then((data) => {
                    function retornaCond(valor) {
                        if (valor.cod == codCond.value) {
                            return valor
                        } else {
                            cond.innerHTML = 'condomínio não encontrado'
                            condCNPJ.innerHTML = 'CNPJ não encontrado'
                        }
                    }
                    let condECnpj = data.filter(retornaCond)
                    condECnpj.forEach(e => {
                        cond.innerHTML = ''
                        cond.innerHTML = `
                            <td id="cond">${e.condominio}</td>
                            `
                        condCNPJ.innerHTML = ''
                        condCNPJ.innerHTML = `
                             <td id="condCNPJ">${e.cnpj}</td>
                            `
                    })
                })
            })
        } catch (error) {
            console.error(error)
        }
    } else {
        cond.innerHTML = '-'
        condCNPJ.innerHTML = '-'
    }
}