export default function predefinicao(data) {
  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_predef")) ?? [];
  const setLocalStorage = (dbPrefef) =>
    localStorage.setItem("db_predef", JSON.stringify(dbPrefef));

  const user = data.nomeGerente;

  function lastId() {
    let currentId = getLocalStorage().length;
    getLocalStorage().map((e) => {
      if (e.id > currentId) {
        currentId = e.id;
      }
    });
    return currentId + 1;
  }

  const nomeModelo = window.prompt("Dê um nome ao Modelo:", lastId());

  const dbinfo = {
    nomeModelo: nomeModelo,
    id: lastId(),
    user: user,
    data: data,
  };

  setNewData(dbinfo);

  function setNewData(dbinfo) {
    const newDbinfo = getLocalStorage();
    newDbinfo.push(dbinfo);
    setLocalStorage(newDbinfo);
  }

  var modelosList = document.getElementById("modelosList");
  modelosList.innerHTML = `<option value=""> ------------------------- </option>`;
  getLocalStorage().map((e) => {
    modelosList.innerHTML += `
    <option value="${e.id}">${e.nomeModelo}</option>
    `;
  });
}
