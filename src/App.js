import { React, useState, useEffect } from "react";
import "./styles.css";
const inputstyle = {
  padding: 10,
  borderColor: "blue"
};
const itemInputStyle = {
  padding: 20,
  borderColor: "red"
};
export default function App() {
  const [username, setUserName] = useState("");
  const [shoppingList, updateShoppingList] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
    document.querySelector("#iteminput").value = "";
  });

  const addItem = () => {
    var newItem = document.querySelector("#iteminput").value;
    updateShoppingList(() => [...shoppingList, newItem]);
  };

  const removeItem = (id) => {
    console.log(id);
    var updatedList = shoppingList.filter((item) => item !== id);

    updateShoppingList(() => updatedList);
  };

  const saveLocalTodos = () => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("shoppingList") === null) {
      localStorage.setItem("shoppingList", []);
    } else {
      const localTodos = JSON.parse(localStorage.getItem("shoppingList"));
      updateShoppingList(localTodos);
    }
  };
  return (
    <div className="App">
      <input
        style={inputstyle}
        placeholder="Write your name here"
        onChange={(event) => setUserName(event.target.value)}
      ></input>

      <h2>
        Welcome
        <span style={{ color: "green", fontWeight: "bold" }}>
          {" "}
          {username}{" "}
        </span>{" "}
        , get ready to feel the magic of React!
      </h2>
      <input
        style={itemInputStyle}
        placeholder="Enter item name"
        id="iteminput"
      ></input>
      <br />
      <button
        style={{
          padding: 10,
          marginTop: 20,
          backgroundColor: "black",
          color: "white"
        }}
        onClick={addItem}
      >
        Add Item
      </button>
      <div style={{ padding: 20, borderColor: "blue" }}>
        <h2>Your Shopping List Contains</h2>
        <hr style={{ width: 400 }} />
        <ul style={{ listStyle: "none" }}>
          {shoppingList.map((item) => (
            <li style={{ padding: "0.5rem" }} key={item}>
              {item}
              <span style={{ padding: "0.5rem" }}>
                <button
                  id={item}
                  onClick={() => {
                    removeItem(item);
                  }}
                >
                  Remove Item
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
