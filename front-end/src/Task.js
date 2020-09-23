import React from "react";
import "./Task.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Task({ id, text, deleteTask, editTask }) {
  return (
    <div className="task">
      {text}
      <div className="task __button">
        <EditIcon
          onClick={() => editTask(id)}
          className="task__edit"
          style={{ color: "white", cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => deleteTask(id)}
          className="task__delete"
          style={{ color: "white", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default Task;
