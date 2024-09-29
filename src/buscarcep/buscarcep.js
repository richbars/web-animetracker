import api from '../services/api';
import { FiSearch } from 'react-icons/fi'
import '../buscarcep/style.css';
import { useState } from 'react';

function BuscarCEP() {

  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  async function handleSearch(){
    
    if(input === ""){
      alert("Preencha com algum valor!")
      return;
    }

    try {
      const res = await api.get(`${input}/json`);

      if (res.data.erro) {
        alert("CEP mal informado ou inexistente");
        setInput("");
        return;
      }
  
      console.log(res.data);
      setResponse(res.data);
      setInput('');
  
    } catch (error) {
      alert("Ocorreu um erro ao buscar o CEP");
    }

  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h1 className="title" >Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
        
      </div>


      {Object.keys(response).length > 0 && (
            <main className='main'>
              <h2>CEP: {response.cep}</h2>
              <span>Rua: {response.logradouro}</span>
              <span>Complemento: {response.complemento}</span>
              <span>Bairro: {response.bairro}</span>
              <span>Estado: {response.estado}</span>
              <span>Região: {response.regiao} - {response.uf}</span>
            </main>
      )}




    </div>
  );
}

export default BuscarCEP;
