import React from "react";
import { Link } from "react-router-dom";

import "./card.scss";
import noImage from '../../assets/no_image.jpg'

export default function Card(props) {
  const show = props.show;

  return (
    <Link className="card" to={"/details/"+show.id}>

        <div className="thumbnail">
          <img src={show.image ? show.image.medium : noImage}></img>
          <span className="name">{show.name}</span>
        </div>

        <div className="description">
          <p>  {show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No info'}</p>
        </div>
      
    </Link>
  );
}
