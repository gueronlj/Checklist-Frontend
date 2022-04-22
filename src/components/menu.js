import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
const endpoint = 'https://hangrypanda-backend.herokuapp.com/'

const Menu = (props)=>{

   return(
      <>
         <Button variant="dark" onClick={props.uncheckAll} className="uncheck-button">Uncheck All</Button>
      </>
   )
}

export default Menu
