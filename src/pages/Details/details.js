
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay/loading_overlay";
import "./details.scss";



export default function Details(props) {
    const { id } = useParams('id')
    const [show, setShow] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);



useEffect(() => {
        if(!isLoaded)
        setTimeout(()=>getShowInfo(id), 1500);

  }, [])

  function getShowInfo(id){
    fetch("https://api.tvmaze.com/shows/"+id)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result);
            setShow(result);
            
            setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  

  if(isLoaded && show){
        return (
            <div id="details" className="flex-container wrapper">
                <div className="row data">
                    <div className="image">
                    <img src={show.image.original}></img>  
                    </div>
              
                <div className="info">
                   
                    <ul className="row about">
                    <h2>About</h2>
                        <li><b>Name:</b> {show.name}</li>
                        <li><b>Language:</b> {show.language}</li>
                        <li><b>Genres:</b> 
                            {show.genres.map((value, index) => {
                                return <span key={index} >{value}</span>
                            })}
                        </li>
                        
                        <li><b>Release/End:</b> <span>{show.premiered} - {show.ended ? show.ended : 'Now'}</span></li>
                        <li><b>Status:</b> {show.status}</li>
                        </ul>
                    
                    
                      <ul className="row schedule">
                      <h2>Schedule</h2>
                          <li><b>At {show.schedule.time} -</b> 
                
                        {
                            show.schedule.days.map((value,index)=>{
                                return <span key={index} >{value}</span>
                            })
                        }</li>

                        {show.webChannel ? (<li><b>Channel: </b><a href={show.officialSite} target="_blank">{show.webChannel.name}</a></li>) : <></>
                        }
                      
                        </ul>

                    
                </div>

                </div>

                <div className="row summary" dangerouslySetInnerHTML={{ __html: show.summary }} >


                </div>
               
            </div>
        );
    }
    else{
        return(
            <LoadingOverlay />        
        )
    }
}
