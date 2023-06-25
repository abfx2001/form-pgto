export default function predefinicao(data) {
  const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("db_predef")) ?? [];
  const setLocalStorage = (dbPrefef) =>
    localStorage.setItem("db_predef", JSON.stringify(dbPrefef));

  const user = data.nomeGerente;

  var dbinfo = new Object();
  dbinfo.id = 1;
  dbinfo.user = user;
  dbinfo.data = data;

  setNewData(dbinfo);

  function setNewData(dbinfo) {
    let newData = getLocalStorage();
    newData += JSON.stringify(dbinfo);
    setLocalStorage(newData);
  }

  console.log(getLocalStorage());
}
