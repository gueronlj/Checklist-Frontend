import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
const endpoint = 'https://hangrypanda-backend.herokuapp.com/'

const Menu = (props)=>{

   return(
      <>
         <Button variant="dark"
         onClick={props.uncheckAll}
         className="uncheck-button">Uncheck All</Button>

         <Button variant="dark"
            onClick={()=>{props.setShowList(true);props.setShowNotes(false)}}
            className="list-button">Checklist</Button>

         <Button variant="dark"
            onClick={()=>{props.setShowNotes(true);props.setShowList(false)}}
            className="notes-button">Notes</Button>


      </>
   )
}

export default Menu
