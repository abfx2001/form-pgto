export default function imprimirTela() {
    const controle = true // controle do forms
    if (controle) {
        document.getElementById('btn1').style.display = 'none'
        document.getElementById('btn2').style.display = 'none'
        window.print()
        document.getElementById('btn1').style.display = 'block'
        document.getElementById('btn2').style.display = 'block'
        //window.location.reload()
    }
    return
}