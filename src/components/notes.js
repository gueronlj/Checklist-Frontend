import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
const endpoint = 'https://hangrypanda-backend.herokuapp.com/'
//const localendpoint ='http://localhost:3001/'

const Notes = (props) => {

   const [notes, setNotes] = useState([])
   const [showInput, setShowInput] = useState(false)

   const getNotes = ()=> {
      axios.get(endpoint+'notes')
         .then((res, error)=>{
            if(error){
               res.json(error);
               console.log(error);
            }else{
               setNotes(res.data)
               console.log('notes retrieved');
            }
         })
   }

   useEffect(()=> {getNotes()},[])

   return(
      <main-container>
      {notes.map((note)=> {
         return(
            <card key={notes._id}>
               <h6>{note.message}</h6>
               <p>{note.createdAt}</p>
            </card>
         )
      })}
      <Button
         variant="warning"
         onClick={()=>setShowInput(true)}>Add New</Button>
      </main-container>
   )
}

export default Notes
