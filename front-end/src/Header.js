import React from "react";
import "./Header.css";

function Header() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  return (
    <div className="header">
      <h1 className="header__title">
        To - Do List
        <span className="date"> {today} </span>
      </h1>{" "}
    </div>
  );
}

export default Header;
