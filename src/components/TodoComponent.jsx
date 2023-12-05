import React, { useEffect, useState } from "react";
import Style from "./TodoComponent.module.css";

function TodoComponent() {
  const [todos, setTodos] = useState([]);
  const [toDoValue, setToDoValue] = useState("");
  const [updating, setUpdating] = useState(false);
  const [taskId, setTaskId] = useState();
  const [toDoId, setToDoId] = useState(201);

  // fetching the todos on every refresh
  useEffect(() => {
    fetchTasks();
  }, []);

  // function to call the todos api and fetch the todos
  const fetchTasks = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const tasks = await data.json();
    setTodos(tasks);
  };

  // setting the input form value as given
  const inputChangeHandler = (event) => {
    setToDoValue(event.target.value);
  };

  // function to make post request to add the new todo
  const addToDoHandler = async () => {
    const toDo = {
      userId: Math.ceil(Math.random() * 10),
      id: toDoId,
      title: toDoValue,
      completed: false,
    };

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify(toDo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const Task = await res.json();
      Task.id = toDoId;
      // incrementing the todo id after every time new todo gets added
      setToDoId(() => toDoId + 1);
      setTodos((prevTodos) => [Task, ...prevTodos]);
      setToDoValue("");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  // function to delete the todos from the react state
  const deleteToDoHandler = (id) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  // function to set the todo which we want to update in the form input field
  const editToDoHandler = (id) => {
    const updateItem = todos.find((item) => item.id === id);
    setTaskId(updateItem.id);
    setUpdating(true);
    setToDoValue(updateItem.title);
    console.log(updateItem);
  };

  // function to update the title of the todo in the react state
  const updateToDoHandler = async () => {
    const toDo = {
      ...todos.find((item) => item.id === taskId),
      title: toDoValue,
    };
    console.log(toDo);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        {
          method: "PUT",
          body: JSON.stringify(toDo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      // finding the index of the todo to replace it with the updated todo
      let foundIndex = todos.findIndex((item) => item.id === taskId);
      todos[foundIndex] = toDo;
      setUpdating(false);
      setTaskId("");
      setToDoValue("");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  // function to change the status of the todo
  const CheckboxChangeHandler = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className={Style.container}>
      <h2 className={Style.heading}>ToDo App</h2>
      <div className={Style.todoContainer}>
        <div className={Style.todoForm}>
          <input
            type="text"
            placeholder="Enter ToDo"
            value={toDoValue}
            onChange={inputChangeHandler}
          />

          {/* checking if the update button of any todo is clicked, else it should be the add button */}
          {updating ? (
            <button onClick={updateToDoHandler} className={Style.editBtn}>
              Update
            </button>
          ) : (
            <button onClick={addToDoHandler} className={Style.addBtn}>
              Add
            </button>
          )}
        </div>
        <div className={Style.todoItems}>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* looping through the todos in react state */}
              {todos.map((item, index) => (
                <tr key={index} className={Style.todo}>
                  <td>
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      data-id={item.id}
                      className="custom-checkbox"
                      checked={item.completed}
                      onChange={() => CheckboxChangeHandler(item.id)}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      onClick={() => editToDoHandler(item.id)}
                      className={Style.editBtn}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteToDoHandler(item.id)}
                      className={Style.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
