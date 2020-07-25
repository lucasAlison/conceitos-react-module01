import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects',{
      title:"Desafio ReactJS",
      owner: "Lucas Alison de Lima"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`projects/${id}`);

    if (response.status === 200){
      const projectIndex = projects.findIndex(project => project.id === id);
    
      if (projectIndex >= 0){
        projects.splice(projectIndex, 1);
        setProjects([...projects]);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          projects.map(project => 
            <li key={project.id}>
              {project.title}
              <button onClick={() => handleRemoveRepository(project.id)}>
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
