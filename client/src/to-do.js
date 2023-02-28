
import React, { useState, useEffect, useRef } from "react";
import "./utility.css"

const defaultinput = { todo_name: "" }
function ToDoApp() {

  const [todoName, setTodoName] = useState(defaultinput);
  const [toDoList, setTodoList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  //To show date and time on todo App.
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
  }, []);

  //To handle the POST Request to the server when form are submitted.
  const handleSubmit = async (e) => {

    const { todo_name } = todoName;

    e.preventDefault();
    try {
      await fetch('http://localhost:3200/db', {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ todo_name })

      }).then((response) => { response.json(); fetchAllTodo() })

    } catch (err) {
      console.error(err.message);
    }
    setTodoName(defaultinput)
  }

  // GET request to the server to retrive all TODO datas using "fetch API" inside "fetchAllTodos"
  const fetchAllTodo = () => {
    fetch('http://localhost:3200/db/get', {
      method: "GET"
    })
      .then((response) => { return response.json() })
      .then(data => setTodoList(data.data))
      .catch(error => console.log(error))

  }
  //calling the "fetchAllTodos" function inside useEffect hooks to see realtime changes on UI
  useEffect(() => {

    fetchAllTodo();

  }, []);

  //Making Delete Request to Server to delete the specific task.
  const handleDelete = (id) => {
    try {

      fetch(`http://localhost:3200/db/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
      // update the to-do list state by removing the deleted item
      setTodoList(toDoList.filter(data => data.data !== id))

      // After deletion we again call the fetchAllTodo function to see the updated TODO lists
      fetchAllTodo();
    } catch (error) {
      console.log(error);
    };

  }

  //To Make focus continue on inputbox after every reload.
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>TO-DO List</h1>
        <span style={{ textAlign: "center", display: "block" }}> {currentTime}</span>
      </div>

      {/* Input Area Code */}
      <div className="todo-body">
        <form onSubmit={handleSubmit}>
          <span className="span-box">Enter The Task</span>
          <input className="input-style" type="text" placeholder="Add item here!" required ref={inputRef} value={todoName.todo_name}
            onChange={(e) => setTodoName({ ...todoName, todo_name: e.target.value })} />
          <input className="btn-1" type="submit" value="Add" />
        </form>
      </div>

      {/* Output Area Code */}
      <div>
        <ul className="todoNames">
          {toDoList.map((to_do_list) => {
            return (
              <li className="singleName" key={to_do_list.todo_id}>
                <span style={{ flex: "1" }}>{to_do_list.todo_name}</span>
                <button onClick={() => handleDelete(to_do_list.todo_id)}><i className="fa-solid fa-x"></i></button>
              </li>
            )
          })}
        </ul>
      </div>

    </>
  )
}
export default ToDoApp;