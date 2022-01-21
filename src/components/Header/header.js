import React from "react";

import "./header.scss";
import logo from '../../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";


export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSearch(event){
    
    if (event.which == 13 || event.keyCode == 13) {
      navigate('search/'+event.target.value);
    }
  }
  return (
    <header className="header" className="flex-container">
      <div className="row logo">
        <Link to='/' >
          <img src={logo} alt="Logo"></img>
        </Link>

        <div className="search-box">
          <input type="text" onChange={e => setSearch(e.target.value)} onKeyPress={e=>handleSearch(e)}></input>
          <Link to={'search/'+search}>
          <button>Buscar</button>
          </Link>
        </div> 
      </div>
    </header>
  );
}
