import React, { useState, useEffect } from "react";
import "./Main.css";
import Task from "./Task.js";
import axios from "axios";

var flag = 0;
var newId;

function Main() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setList(res.data))
      .catch((error) => console.log(error));
  }, [list]);

  // const submitTask = () => {
  //    if (flag === 1) {
  //      let newArray = [...list];
  //      newArray[temp] = input;
  //      setList(newArray);
  //      setInput("");
  //      list[temp] = input;
  //      setList(list);
  //      flag = 0;
  //    } else {
  //      setList((list) => [...list, input]);
  //      setInput("");
  //    }
  // };

  const addTask = (event) => setInput(event.target.value);

  const submitTask = (event) => {
    event.preventDefault();

    if (!input)
      alert("🤬 KAI TO LAKH TOPA !! 🤬 BAPA NI JAAN MA AYO CHE ?? 🤬");
    else {
      if (flag) {
        axios
          .patch("http://localhost:5000/" + newId + "/" + input)
          .then((res) => console.log(res.data));
        flag = 0;
      } else {
        const Item = {
          name: input,
        };
        axios
          .post("http://localhost:5000/", Item)
          .then((res) => console.log(res.data));
      }
      setInput("");
    }
  };

  // const deleteTask = (deleteItemId) =>
  //   setList(list.filter((task, id) => id !== deleteItemId));

  const editTask = (editItemId) => {
    const newItem = list.filter((item) => item._id === editItemId);
    setInput(newItem[0].name);
    flag = 1;
    newId = editItemId;
  };

  const deleteTask = (deleteItemId) => {
    var confirm = window.confirm("Are you sure you want to delete the item ??");
    confirm &&
      axios.delete("http://localhost:5000/" + deleteItemId).then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="main">
      <div className="tasks">
        {list.map((task) => (
          <Task
            className="main_task"
            key={task._id}
            id={task._id}
            text={task.name}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>

      <div className="input">
        <form action="/" onSubmit={submitTask} method="post">
          <input
            name="newItem"
            placeholder="Enter task"
            type="text"
            value={input}
            onChange={addTask}
            align="middle"
            autoComplete="off"
          />
          <span id="span" style={{ display: "none" }}></span>
          <button>{flag ? "UPDATE" : "ADD"}</button>
        </form>
      </div>
    </div>
  );
}

export default Main;
