import { useState } from "react";
import "./App.css";

interface todolist {
  id: number;
  name?: string;
  isDone: boolean;
}

let idx = 0;

function App() {
  const [task, setTask] = useState<string>();
  const [todolist, setTodolist] = useState<todolist[]>([]);

  const toggleDone = (id: number) => {
    const updateTask = todolist.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      } else {
        return task;
      }
    });
    setTodolist(updateTask);
  };

  const addTask = () => {
    setTodolist([...todolist, { id: idx++, name: task, isDone: false }]);
  };

  const deleteTask = (id: number) => {
    setTodolist(todolist.filter((task) => task.id !== id));
  };

  return (
    <>
      <div>
        <div className="flex">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Add your task"
              className="block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button onClick={() => addTask()}>Add</button>
        </div>
        <div>
          <ul>
            {todolist.map((item) => {
              return (
                <div className="flex items-center" key={item.id}>
                  <button onClick={() => toggleDone(item.id)}>Done</button>
                  <li
                    style={{
                      textDecoration: item.isDone ? "line-through" : "auto",
                    }}
                  >
                    {item.name}
                  </li>
                  <button onClick={() => deleteTask(item.id)}>Delete</button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
