import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Header from "./components/Header/header";
import Details from "./pages/Details/details";

import Home from "./pages/Home/home";
import Search from "./pages/Search/search";

import "./styles.scss";

export default function App() {
  return (
    <Router>
    <div className="App">
      <Header />

      <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route path='/search/:search' element={< Search />}></Route>
            <Route path='/details/:id' element={< Details />}></Route>
          </Routes>

    </div>
    </Router>
  );
}
