export default function removePredef(id) {
  let bookList = JSON.parse(localStorage.getItem("db_predef")) ?? [];
  bookList = bookList.filter(function (value) {
    return value.id != id;
  });
  localStorage.setItem("db_predef", JSON.stringify(bookList));

  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_predef")) ?? [];
  var modelosList = document.getElementById("modelosList");
  modelosList.innerHTML = `<option value=""> ------------------------- </option>`;
  getLocalStorage().map((e) => {
    modelosList.innerHTML += `
    <option value="${e.id}">${e.nomeModelo}</option>
    `;
  });
}
