
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/card";
import LoadingOverlay from "../../components/LoadingOverlay/loading_overlay";
import NoData from "../../components/NoData/nodata";
import "./search.scss";



export default function Search() {
    const { search } = useParams('id')
    const [shows, setShows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

useEffect(() => {
  setIsLoaded(false);
  setTimeout(()=> getShows(search), 1500);
    
  }, [search])

  function getShows(search){
    fetch("https://api.tvmaze.com/search/shows?q="+search)
    .then(res => {console.log(res); return res.json();})
    .then(
      (result) => {
        console.log(result);
        setShows(result);
        setIsLoaded(true);
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  if(isLoaded){
    if(shows.length){
      return (
          <div id="home" className="wrapper">
              {shows.map((value, index) => {
              return <Card key={index} show={value.show}/>
          })}
          </div>   
      );
  }
  else{
    return (<NoData></NoData>)
  }
  }
else{
    return(
        <LoadingOverlay />
    
    )
}
}
