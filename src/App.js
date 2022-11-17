import { useState } from "react";
import "./App.css";
import api from "./service/api";

function App() {
  const [cep, setCep] = useState("");
  const [search, setSearch] = useState({});
  async function findCep() {
    if (cep === "") {
      alert("Digite um cep!");
      return;
    }
    try {
      const response = await api.get(`${cep}/json`);
      setSearch(response.data);
      setCep("");
    } catch {
      alert("Ops! Erro a buscar!");
      setCep("");
    }
  }

  return (
    <div className="App">
      <label>
        Cep:
        <input
          type="text"
          className="input"
          value={cep}
          onChange={(e) => {
            setCep(e.target.value);
          }}
        ></input>
      </label>
      <button onClick={findCep}>Pesquisar</button>
      {Object.keys(search).length > 0 && (
        <div>
          <h1>Cep: {search.cep}</h1>
          <span>Rua: {search.logradouro}</span>
          <br />
          <span> Bairro: {search.bairro}</span>
          <br />
          <span>
            Cidade: {search.localidade} - {search.uf}
          </span>
          <br />
        </div>
      )}
    </div>
  );
}

export default App;
