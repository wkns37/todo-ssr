import { useState, useEffect } from 'react'

export default function App() {
  const [currentToDo, setCurrentToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setToDoList(JSON.parse(storedTasks))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(toDoList))
  }, [toDoList]);

  function addToDo() {
    if (!currentToDo.trim()) {
      alert("Type something to add")
      return
    }
    setToDoList(prevToDoList => [...prevToDoList, currentToDo])
    setCurrentToDo("")
  }

  function deleteToDo(deleteIndex) {
    setToDoList(prevToDoList => prevToDoList.filter((item, index) => index !== deleteIndex))
  }

  const toDos = toDoList.map((item, index) => (
    <li key={index}>
      <span>{item}</span>
      <button onClick={() => deleteToDo(index)}>Delete</button>
    </li>
  ));

  return (
    <main>
      <h1>ToDo List</h1>
      <div className='input-container'>
        <input
          type="text"
          id="input-el"
          placeholder="Enter a task..."
          value={currentToDo}
          onChange={(e) => setCurrentToDo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addToDo()
            }
          }}
          autoFocus />
        <button id="add-btn" onClick={addToDo}>Add</button>
      </div>
      <ul>
        {toDos}
      </ul>
    </main>
  );
}
