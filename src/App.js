import React, { useState, useEffect } from 'react'
import Loading from "./Loading"

import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }
   
  
    const fetchTours = async() =>{
      try {
      setIsLoading(true)
      const response = await fetch(url)
      const tours = await response.json()
      setTours(tours) 
      setIsLoading(false)
      console.log(tours);
    }catch(error) {
      setIsLoading(false)
      setIsError(true)

    }
      }
  useEffect(()=>{
      fetchTours()
  },[])

  if(isLoading){
    return(
      <Loading/>
    )
  }

  if(isError){
    return(
      <h1>Error...</h1>
    )
  }

 if (tours.length === 0) {
   return (
     <main>
       <div className='title'>
         <h2>no tours left</h2>
         <button className='btn' onClick={()=>fetchTours()}>
           refresh
         </button>
       </div>
     </main>
   )
 }

  return (
   <section>
    <Tours tours={tours} removeTour={removeTour}/>
   </section>
  )
}

export default App
