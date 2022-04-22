import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
const endpoint = 'https://hangrypanda-backend.herokuapp.com/'
//const localendpoint ='http://localhost:3001/'

const Checklist = (props) => {

   const handleCheckbox = (item) =>{
      if(item.status === true){
         axios.put(endpoint+`checklist/disable/${item._id}`)
            .then((response, error)=>{
               console.log('Item is unloaded');
               props.getList()
            })
      } else {
         axios.put(endpoint+`checklist/enable/${item._id}`)
            .then((response, error)=>{
               console.log('Item is loaded');
               props.getList()
            })
      }
   }

   const handleIncrease = (item) =>{
      axios
         .put(endpoint+`checklist/increase/${item._id}`)
         .then((response,error)=>{
            if(error){
               console.log(error);
            }else{
               console.log("Item qty increased",response.data);
            }
            props.getList()
         })
   }

   const handleDecrease = (item) =>{
      axios
         .put(endpoint+`checklist/decrease/${item._id}`)
         .then((response,error)=>{
            if(error){
               console.log(error);
            }else{
               console.log("Item qty decreased",response.data);
            }
            props.getList()
         })
   }

   useEffect(() => {
      props.getList()
   },[])

   return (
      <>
      <Table striped bordered hover variant="dark" className="checklist">
         <thead>
            <tr>
               <th>Loaded</th>
               <th>Name</th>
               <th>Recommended Qty</th>
               <th>Qty</th>
               <th></th>
               <th></th>
            </tr>
         </thead>
         <tbody>
            {props.items.map((item)=>{
                  return(
                     <tr key={item._id}>
                        <td>
                           <form>
                              <input
                                 type='checkbox'
                                 name='status'
                                 checked={item.status}
                                 onChange={(event)=>handleCheckbox(item)}/>
                           </form>
                        </td>
                        <td style={item.status===true?{color:'#89DF87'}:{}}>{item.name}</td>
                        <td>{item.recommended}</td>
                        <td>{item.quantity}</td>
                        <td className="buttonColumn"><img onClick={(event)=>handleIncrease(item)} src="./images/plus-white.png"/></td>
                        <td className="buttonColumn"><img onClick={(event)=>handleDecrease(item)} src="./images/minus-white.png"/></td>
                     </tr>
                  )
               }
            )}
         </tbody>
      </Table>
      </>
   )
}

export default Checklist
