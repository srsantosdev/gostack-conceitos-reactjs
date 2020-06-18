import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const { data: repository } = await api.post("repositories", {
      title: "Aprendendo ReactJS",
      url: "http://github.com/srsantosdev/gostack-conceitos-reactjs",
      techs: ["Node.js", "ReactJS"],
    });

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 400) {
      return false;
    }

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return false;
    }

    const updatedRepositories = [...repositories];

    updatedRepositories.splice(repositoryIndex, 1);
    setRepositories(updatedRepositories);
    return true;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ title, id }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
