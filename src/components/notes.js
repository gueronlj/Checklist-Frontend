import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { formatRelative, parseJSON } from 'date-fns'
const endpoint = 'https://hangrypanda-backend.herokuapp.com/'
//const localendpoint ='http://localhost:3001/'

const Notes = (props) => {

   const [notes, setNotes] = useState([])
   const [newMesage,setNewMessage] = useState('')

   const getNotes=()=>{
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

  const handleNoteSubmit=(event)=>{
  event.preventDefault()
  axios.post(endpoint+'notes/new',{message:newMesage})
     .then((res,error)=>{
        if(error){
           res.json(error);
           console.log(error);
        }else{
           getNotes()
        }
     })
  }

   const deleteMessage=(note)=>{
      axios.delete(endpoint+'notes/'+note._id)
         .then((res,error)=>{
            if(error){
               res.json(error);
               console.log(error);
            }else{
               getNotes()
            }
         })
   }

   const takeUserInput=(event)=>{
      setNewMessage(event.target.value)
   }

   const todaysDate = new Date();
   // const formatRelative = require('date-fns/formatRelative')

   useEffect(()=>{getNotes()},[])

   return(
      <main-container>
         {notes.map((note)=> {
            return(
               <div key={note._id} className='note'>
                  <div className='note-top'>
                     <h6>
                        {note.message}
                     </h6>
                     <img src="./images/xthin.png" onClick={()=>deleteMessage(note)} alt=""/>
                  </div>
                  <div className='note-bottom'>
                     <p>{formatRelative(parseJSON(note.createdAt), todaysDate)}</p>
                  </div>
               </div>
            )
         })}
         <form className='sendMsg' onSubmit={handleNoteSubmit}>
             <textarea onChange={takeUserInput} /><br/>
             <input className = "button" type='submit' value='Submit'/>
         </form>
      </main-container>
   )
}

export default Notes
