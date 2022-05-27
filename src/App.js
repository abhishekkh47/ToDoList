// import logo from './logo.svg';
import './App.css';
import { Todos } from './MyComponents/Todos';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import AddTodo from './MyComponents/AddTodo';
import About from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    // console.log("I am onDelete of todo ", todo);
    // we can try the below method to delete a list item, but it will not work this way react
    /*let index = todos.indexOf(todo);
    todos.splice(index,1);*/

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    // localStorage.getItem("todos");
  }

  const addTodo = (title, desc) => {
    console.log("I am adding this ", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

    // if(localStorage.getItem("todos")){
    //   localStorage.setItem("todos", JSON.stringify(todos));
    // }
  }

  // So, to delete the items, we'll use the "state hook"

  // let todos = [
  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  // {
  //   sno: 1,
  //   title: "Go to the market",
  //   desc: "You need to go to the market to get this job1 done"
  // },
  // {
  //   sno: 2,
  //   title: "Go to the mall",
  //   desc: "You need to go to the mall to get this job2 done"
  // },
  // {
  //   sno: 3,
  //   title: "Go to the park",
  //   desc: "You need to go to the park to get this job3 done"
  // },
  // ]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={true} />
        <Routes>
          {/* <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            )
          }} >
          </Route> */}
          <Route exact path="/" element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            
          } ></Route>
          <Route exact path="/about" element={<About/>}>
            {/* <About /> */}
          </Route>
        </Routes>


        <Footer />
      </Router>
    </>
  );
}

export default App;
