import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div>
      <List />
    </div>
  );
}
const List = () => {
  const [todoname, settodoname] = useState("");
  const [tododescription, settododescription] = useState("");
  const [todoList, settodoList] = useState([]);
  const [update_todo, set_update_todo] = useState("");
  const [id, set_id] = useState("");

  const fetchdata = async () => {
    const res = await axios.get("http://localhost:3000/readtodos");
    settodoList(await res.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const  addToList = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/todos", {
        todoname: todoname,
        tododescription: tododescription,
      })
      .then(console.log("data posted successfully"));

    fetchdata();
  };

  const updatetodo = async(e) => {
    e.preventDefault();
    await axios.put("http://localhost:3000/update", {
      update_todo: update_todo,
      id: id,
    });
    fetchdata();
  };

  const deletetodo = async(id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    fetchdata();
  };

  return (
    <div className="container text-center">
      <div className="m-5">
        <h4 className="p-3">MERN Stack TODO App</h4>
        <input
          className="m-2"
          type="text"
          name="todoname"
          placeholder="Enter Name:"
          onChange={(event) => {
            settodoname(event.target.value);
          }}
        ></input>
        <br />
        <textarea
          className="m-2"
          cols="23"
          rows="2"
          type="text"
          name="tododescription"
          placeholder="Enter Description:"
          onChange={(event) => {
            settododescription(event.target.value);
          }}
        ></textarea>
        <br />
        <button className="btn btn-success" onClick={addToList}>
          Submit
        </button>
      </div>
      {todoList.map((todo) => {
        return (
          <div key={todo._id} className="p-4 jumbotron ">
            <h4 className="">{todo.todoName}</h4>

            <input
              className="p-1"
              type="text"
              placeholder="Update TODO"
              name="updatename"
              onChange={(event) => {
                set_update_todo(event.target.value);
                set_id(todo._id);
              }}
            ></input>
            <button
              name="update_todo"
              className="btn btn-success m-1"
              onClick={updatetodo}
            >
              Update
            </button>
            <button
              name="delete"
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                deletetodo(todo._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
