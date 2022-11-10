import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Books from "./Books";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import Issue from "./Issue";
import Delete from "./Delete";
import Register from "./Register";
import Login from "./Login";

function App(){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/books" exact element={<Books />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/add" exact element={<Add />}/>
        <Route path="/edit" exact element={<Edit />} />
        <Route path="/issue" exact element={<Issue />}/>
        <Route path="/delete" exact element={<Delete />}/>
        <Route path="/register" exact element={<Register />}/>
        <Route path="/login" exact element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App;