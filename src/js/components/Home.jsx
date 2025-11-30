import React from "react";
import TodoList from "./TodoList"; // Importa el componente TodoList

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
