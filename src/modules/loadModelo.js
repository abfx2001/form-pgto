import buscaCond from "./buscaCond";

export default function loadModelo() {
  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_predef")) ?? [];

  const modeloSelect = document.getElementById("modelosList").value;
  const chavePix = document.getElementById("chavePix");
  const linhaPix = document.getElementById("linhaPix");

  getLocalStorage().map((e) => {
    if (e.id == modeloSelect) {
      console.log(e.data.formaDePagamento);
      if (e.data.formaDePagamento == "transBanc") {
        chavePix.innerHTML = "";
        linhaPix.innerHTML = "";
      }
      if (e.data.formaDePagamento == "pixCpf") {
        chavePix.innerHTML = "";
        chavePix.innerHTML = `
        <td>
            CHAVE PIX (CPF/CNPJ)
        </td>
        <td id="tipoChavePix">
            <input
            type="text"
            id="inputCpf"
            placeholder="Digite o CPF ou CNPJ da Chave Pix"
            maxlength="18"
            name="pixCPF"
            >
        </td>
        `;
        linhaPix.innerHTML = `
        <tr id="linhaPix">
          <td colspan="2" class="primaryColor"></td>
        </tr>
        `;
        document.querySelector("[name='pixCPF']").value = e.data.pixCPF;
      }
      if (e.data.formaDePagamento == "pixEmail") {
        chavePix.innerHTML = "";
        chavePix.innerHTML = `
        <td>
            CHAVE PIX (E-MAIL)
        </td>
        <td id="tipoChavePix">
            <input
            style="text-transform: lowercase;"
            type="email"
            id="inputEmail"
            placeholder="Digite o E-mail da Chave Pix"
            name="pixEmail"
            required
            >
        </td>
        `;
        linhaPix.innerHTML = `
        <tr id="linhaPix">
          <td colspan="2" class="primaryColor"></td>
        </tr>
        `;
        document.querySelector("[name='pixEmail']").value = e.data.pixEmail;
      }
      if (e.data.formaDePagamento == "pixTel") {
        chavePix.innerHTML = "";
        chavePix.innerHTML = `
        <td>
            CHAVE PIX (TELEFONE)
        </td>
        <td id="tipoChavePix">
            <input
            type="tel"
            id="inputTel"
            placeholder="Digite o Telefone da Chave Pix"
            maxlength="15"
            name="pixTel"
            >
        </td>
        `;
        linhaPix.innerHTML = `
        <tr id="linhaPix">
          <td colspan="2" class="primaryColor"></td>
        </tr>
        `;
        document.querySelector("[name='pixTel']").value = e.data.pixTel;
      }
      if (e.data.formaDePagamento === "pixAle") {
        chavePix.innerHTML = "";
        chavePix.innerHTML = `
            <td>
                CHAVE PIX (CHAVE ALEATÓRIA)
            </td>
            <td id="tipoChavePix">
              <textarea id="inputAle" cols="46" rows="6" name="pixAle" placeholder="Digite o código da Chave Pix"></textarea>
            </td>
            `;
        linhaPix.innerHTML = `
            <tr id="linhaPix">
              <td colspan="2" class="primaryColor"></td>
            </tr>
            `;
        document.querySelector("[name='pixAle']").value = e.data.pixAle;
      }

      document.querySelector("[name='agenciaBnc']").value = e.data.agenciaBnc;
      document.querySelector("[name='codCond']").value = e.data.codCond;
      document.querySelector("[name='contaBnc']").value = e.data.contaBnc;
      document.querySelector("[name='cpfCnpjFavorecido']").value =
        e.data.cpfCnpjFavorecido;
      document.querySelector("[name='nomeBanco']").value = e.data.nomeBanco;
      document.querySelector("[name='nomeFavorecido']").value =
        e.data.nomeFavorecido;
      document.querySelector("[name='nomeGerente']").value = e.data.nomeGerente;
      document.querySelector("[name='tipoConta']").value = e.data.tipoConta;
      document.querySelector("[name='tipoContabil']").value =
        e.data.tipoContabil;
      document.querySelector("[name='tipoAnexo']").value = e.data.tipoAnexo;

      buscaCond();
    }
  });
}
