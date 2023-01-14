
import React, { Fragment, useState } from "react";
import "./todo.css"

function ToDoApp() {

  const [todoName, setTodoName] = useState("");
  const [toDoList, setTodoList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the data to the server
    if (todoName === "") {
      alert("Please Fill the box")
    } else {
      try {
        fetch('http://localhost:3200/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({ todo_name: todoName }),

        }).then((res) => res.json())
          //.then((data) => {
            setTodoList([{ todo_id: `${todoName}`, todoName }, ...toDoList]);
            setTodoName("");

      } catch (err) {
        console.error(err.message);
      }
      alert(`${todoName} =>Stored on server (XAMP:phpMyAdmin)`);
    }

  }
  return (

    <Fragment>
      <div>
        <h3 style={{ textAlign: "center" }}>TO-DO List</h3>
      </div>
      <div className="todo-body">
        <form onSubmit={handleSubmit}>
          <span className="span-box">Enter The Task</span>
          <input className="input-style" type="text" placeholder="Add item here!" value={todoName}
            onChange={(e) => setTodoName(e.target.value)} />
          <input className="btn-1" type="submit" value="Add" />
        </form>
      </div>
      <div>
        <ul className="todoNames">
          {toDoList.map((t) => {
            return (
              <li className="singleName" key={t.todo_id}>
                <span style={{flex:"1"}}>{t.todoName}</span>
                <button><i class="fa-solid fa-x"></i></button>
              </li>
            )
          })}
        </ul>
      </div>

    </Fragment>
  )
}
export default ToDoApp;