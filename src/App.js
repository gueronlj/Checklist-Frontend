import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Checklist from './components/checklist.js'
import Menu from './components/menu.js'
import Notes from './components/notes.js'

const endpoint = 'https://hangrypanda-backend.herokuapp.com/'
//const localendpoint ='http://localhost:3001/'

const App = () => {

   const [showNotes, setShowNotes] = useState(false)
   const [showList, setShowList] = useState(true)

   return (
     <main>
         <h1>Checklist</h1>
         <h4>for Hangry Panda</h4>
         <Menu
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            showList={showList}
            setShowList={setShowList}/>
         {showList?<Checklist/>:<></>}
         {showNotes?<Notes/>:<></>}
     </main>
  )
}

export default App;
