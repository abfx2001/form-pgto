const selectPag = document.getElementById("formaDePagamento");
const chavePix = document.getElementById("chavePix");
const linhaPix = document.getElementById("linhaPix");

function selecTipoPag() {
  selectPag.addEventListener("change", function () {
    if (selectPag.value === "transBanc") {
      chavePix.innerHTML = "";
      linhaPix.innerHTML = "";
    }
    if (selectPag.value === "pixCpf") {
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
      const inputCpf = document.querySelector("#inputCpf");
      inputCpf.addEventListener("input", function () {
        mascaraMutuario(this, cpf);
      });
      inputCpf.addEventListener("blur", function () {
        clearTimeout();
      });
      function mascaraMutuario(o, f) {
        let v_obj = o;
        let v_fun = f;
        setTimeout(function () {
          v_obj.value = v_fun(v_obj.value);
        }, 1);
      }
      function cpf(v) {
        v = v.replace(/\D/g, "");
        if (v.length <= 11) {
          //CPF
          v = v.replace(/(\d{3})(\d)/, "$1.$2");
          v = v.replace(/(\d{3})(\d)/, "$1.$2");
          v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
          v = v.replace(/^(\d{2})(\d)/, "$1.$2");
          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
          v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
          v = v.replace(/(\d{4})(\d)/, "$1-$2");
        }
        return v;
      }
    }
    if (selectPag.value === "pixEmail") {
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
    }
    if (selectPag.value === "pixTel") {
      chavePix.innerHTML = "";
      chavePix.innerHTML = `
        <td>
            CHAVE PIX (TELEFONE)
        </td>
        <td id="tipoChavePix">
            <input
            type="text"
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
    }
    if (selectPag.value === "pixAle") {
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
    }
  });
}

export default async function () {
  await selecTipoPag();
}
