import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Checklist = (props) => {

   const [items, setItems] = useState([])

   const getList = () =>{
      axios
         .get('http://localhost:3001/checklist')
         .then((response, error)=>{
            if(error){
               console.log(error)
            } else {
               setItems(response.data)
               console.log('Item list retrieved', response.data);
            }
         })
   }

   const uncheckAll = () => {
      axios
         .put('http://localhost:3001/checklist/uncheck-all')
         .then((response, error)=>{
            getList()
         })
   }

   const handleCheckbox = (item) =>{
      if(item.status === true){
         axios.put(`http://localhost:3001/checklist/disable/${item._id}`)
            .then((response, error)=>{
               console.log('Item is unloaded');
               getList()
            })
      } else {
         axios.put(`http://localhost:3001/checklist/enable/${item._id}`)
            .then((response, error)=>{
               console.log('Item is loaded');
               getList()
            })
      }
   }

   const handleIncrease = (item) =>{
      axios
         .put(`http://localhost:3001/checklist/increase/${item._id}`)
         .then((response,error)=>{
            if(error){
               console.log(error);
            }else{
               console.log("Item qty increased",response.data);
            }
            getList()
         })
   }

   const handleDecrease = (item) =>{
      axios
         .put(`http://localhost:3001/checklist/decrease/${item._id}`)
         .then((response,error)=>{
            if(error){
               console.log(error);
            }else{
               console.log("Item qty decreased",response.data);
            }
            getList()
         })
   }

   useEffect(() => {
      getList()
   },[])

   return (
      <>
      <Button variant="dark" onClick={uncheckAll} className="uncheck-button">Uncheck All</Button>
      <Table striped bordered hover variant="dark" className="checklist">
         <thead>
            <tr>
               <th>Loaded</th>
               <th>Name</th>
               <th>Qty</th>
               <th></th>
               <th></th>
               <th>Recommended Qty</th>
            </tr>
         </thead>
         <tbody>
            {items.map((item)=>{
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
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td><button onClick={(event)=>handleIncrease(item)}>+</button></td>
                        <td><button onClick={(event)=>handleDecrease(item)}>-</button></td>
                        <td>{item.recommended}</td>
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
