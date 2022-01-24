
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import LoadingOverlay from "../../components/LoadingOverlay/loading_overlay";
import NoData from "../../components/NoData/nodata";
import "./home.scss";



export default function Home() {

    const [shows, setShows] = useState([]);
    const [apiPage, setApiPage] = useState(1);
    const [itemsAmount, setItemsAmount] = useState(20);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);



useEffect(() => {
        console.log(itemsAmount);
        setTimeout( getShows, 1500);
       

        window.addEventListener('scroll', loadMore);
      
        // returned function will be called on component unmount 
        return () => {
           window.removeEventListener('scroll', loadMore);
        }
  }, [itemsAmount])

  function getShows(){
   
    if(!shows.length || itemsAmount >= shows.length*0.8){
      
        fetch("https://api.tvmaze.com/shows?page="+apiPage)
        .then(res => {console.log(res); return res.json();})
        .then(
            (result) => {
                setShows(shows.concat(result));
                setIsLoaded(true);
                setApiPage(apiPage + 1);
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
  }
  
  function loadMore(){
    if (window.innerHeight + document.documentElement.scrollTop > document.scrollingElement.scrollHeight) {
        setItemsAmount(itemsAmount + 20)
    }
  }

  if(isLoaded){
    if(shows.length){
        return (
            <div id="home" className="wrapper">
                {shows.slice(0,itemsAmount).map((value, index) => {
                return <Card key={index} show={value}/>
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
