import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(repos);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repos, repository]);
    console.log(repos);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204){
      const repositoryIndex = repos.findIndex(repository => repository.id === id);
    
      if (repositoryIndex >= 0){
        repos.splice(repositoryIndex, 1);
        setRepositories([...repos]);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
