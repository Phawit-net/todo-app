import { useState, type KeyboardEvent } from "react";
import "./App.css";

interface todolist {
  id: number;
  name: string;
  isDone: boolean;
  isEdit: boolean;
}

type filter = "all" | "active" | "done";

let idx = 0;

function App() {
  const [task, setTask] = useState<string>("");
  const [inputTask, setInputTask] = useState<string>("");
  const [todolist, setTodolist] = useState<todolist[]>([]);
  const [filter, setfilter] = useState<filter>("all");

  const toggleDone = (id: number) => {
    const updatedTasks = todolist.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTodolist(updatedTasks);
  };

  const addTask = () => {
    if (task.trim() === "") return;
    setTodolist([
      ...todolist,
      { id: idx++, name: task, isDone: false, isEdit: false },
    ]);
    setTask("");
  };

  const editTask = (id: number) => {
    const editTask = todolist.map((task) => {
      if (task.id === id) {
        setInputTask(task.name);
        return { ...task, name: inputTask, isEdit: !task.isEdit };
      } else {
        return task;
      }
    });
    setTodolist(editTask);
  };

  const deleteTask = (id: number) => {
    setTodolist(todolist.filter((task) => task.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleFilter = (mode: filter) => {
    setfilter(mode);
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
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <button onClick={() => addTask()}>Add</button>
        </div>
        <div>
          <button onClick={() => handleFilter("all")}>All</button>
          <button onClick={() => handleFilter("active")}>Active</button>
          <button onClick={() => handleFilter("done")}>Done</button>
        </div>
        <div>
          <ul>
            {todolist
              .filter((item) =>
                filter === "active"
                  ? item.isDone === false
                  : filter === "done"
                  ? item.isDone === true
                  : item
              )
              .map((item) => {
                return (
                  <li key={item.id} className="flex items-center gap-2">
                    <button onClick={() => toggleDone(item.id)}>Done</button>
                    {item.isEdit ? (
                      <>
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                          <input
                            id="editTask"
                            name="editTask"
                            type="text"
                            placeholder="Add your task"
                            className="block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            value={inputTask}
                            onChange={(e) => setInputTask(e.target.value)}
                            // onKeyDown={(e) => handleKeyDown(e)}
                          />
                        </div>
                        <button onClick={() => editTask(item.id)}>Save</button>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            textDecoration: item.isDone
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.name}
                        </span>
                        <button onClick={() => editTask(item.id)}>Edit</button>
                      </>
                    )}

                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
