import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Checklist from './components/checklist.js'
import Menu from './components/menu.js'

const endpoint = 'https://hangrypanda-backend.herokuapp.com/'
//const localendpoint ='http://localhost:3001/'

const App = () => {

   const [items, setItems] = useState([])

   const getList = () =>{
      axios
         .get(endpoint+'checklist')
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
         .put(endpoint+'checklist/uncheck-all')
         .then((response, error)=>{
            getList()
         })
   }

   return (
     <main>
         <h1>Checklist</h1>
         <h4>for Hangry Panda</h4>
         <Menu uncheckAll={uncheckAll}/>
         <Checklist
            getList={getList}
            items={items}/>
     </main>
  )
}

export default App;
