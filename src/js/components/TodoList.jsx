
import React, { useState, useEffect } from "react";

const API_BASE = "https://playground.4geeks.com/todo/todos";
const USER = "andreasabater"; 

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Al iniciar, crear usuario si no existe y cargar tareas
  useEffect(() => {
    const init = async () => {
      try {
        // Intentar obtener tareas
        const resp = await fetch(`${API_BASE}/${USER}`);
        if (!resp.ok) {
          // Si no existe usuario, lo creamos
          await fetch(`${API_BASE}/${USER}`, {
            method: "POST",
            body: JSON.stringify([]),
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch (err) {
        console.log("Error inicializando usuario:", err);
      } finally {
        fetchTasks();
      }
    };
    init();
  }, []);

  // GET: Obtener tareas
  const fetchTasks = async () => {
    try {
      const resp = await fetch(`${API_BASE}/${USER}`);
      if (!resp.ok) throw new Error("Error al obtener tareas");
      const data = await resp.json();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // POST: Agregar tarea
  const addTask = async () => {
    if (!newTask.trim()) return;
    const task = { label: newTask, done: false };
    try {
      await fetch(`${API_BASE}/${USER}`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE: Eliminar una tarea
  const deleteTask = async (index) => {
    try {
      await fetch(`${API_BASE}/${USER}/${index}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE: Limpiar todas las tareas
  const clearAll = async () => {
    try {
      await fetch(`${API_BASE}/${USER}`, { method: "DELETE" });
      setTasks([]);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando TODO List...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">TODO List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Agregar
        </button>
        <button className="btn btn-danger" onClick={clearAll}>
          Limpiar Todo
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task.label}
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteTask(index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
