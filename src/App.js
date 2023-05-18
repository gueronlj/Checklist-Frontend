import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Checklist from './components/checklist.js'
import Menu from './components/menu.js'
import Notes from './components/notes.js'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const App = () => {
  
   const firebaseConfig = {
     apiKey: "AIzaSyCjll9zk5mNMzwKHzmtsR4qrOCFPDjiq7g",
     authDomain: "ems-helper.firebaseapp.com",
     projectId: "ems-helper",
     storageBucket: "ems-helper.appspot.com",
     messagingSenderId: "815108243427",
     appId: "1:815108243427:web:2cf2989423e766feccaad6",
     measurementId: "G-F4715MJXFE"
   };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);

   const [showNotes, setShowNotes] = useState(false)
   const [showList, setShowList] = useState(true)

   return (
     <main>
         <h1>Hangry Panda Helper</h1>
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
