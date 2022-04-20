import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Checklist from './components/checklist.js'

const App = () => {

   return (
     <main>
         <h1>Checklist</h1>
         <h4>for Hangry Panda</h4>
         <Checklist/>
     </main>
  )
}

export default App;
