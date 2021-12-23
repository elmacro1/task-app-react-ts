import React, { useState, useRef } from "react";
// Para guardar en un "type" el tipado, asi no sea tan largo dentro de la function
type FormElment = React.FormEvent<HTMLFormElement>;

// Creo esta interface para poder setear el state
// como un array de tareas
interface ITasks {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  let [newTask, setNewTask] = useState<string>("");
  let [tasks, setTasks] = useState<ITasks[]>([]);
  let taskInput = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormElment): void {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  }

  const addTask = (name: string): void => {
    let newTasks: ITasks[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  function toggleDoneTask(i: number): void {
    const newTasks: ITasks[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  function removeTask(i: number): void {
    const newTasks: ITasks[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  // Renderizado
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setNewTask(e.target.value);
                  }}
                  value={newTask}
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITasks, i: number) => {
            return (
              <div key={i} className="card card-body mt-2">
                <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.name}
                </h2>
                <div className="btn btn-secondary">
                  <button onClick={() => toggleDoneTask(i)}>
                    {t.done ? "✓" : "✕"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeTask(i);
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
