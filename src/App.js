import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Checklist from './components/checklist.js'
import Menu from './components/menu.js'
import Notes from './components/notes.js'
import LoginPage from './views/login.js'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUser, loginUser, logoutUser } from "./components/helpers.js"

const App = () => {
   const API_KEY = process.env.REACT_APP_AUTH_API_KEY
   const DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
   const PROJECT_ID = process.env.REACT_APP_AUTH_PROJECT_ID
   const BUCKET = process.env.REACT_APP_AUTH_BUCKET
   const SENDER_ID = process.env.REACT_APP_AUTH_SENDER_ID
   const APP_ID = process.env.REACT_APP_AUTH_APP_ID
   const MEASUREMENT_ID = process.env.REACT_APP_AUTH_MEASUREMENT_ID

   const firebaseConfig = {
     apiKey: API_KEY,
     authDomain: DOMAIN,
     projectId: PROJECT_ID,
     storageBucket: BUCKET,
     messagingSenderId: SENDER_ID,
     appId: APP_ID,
     measurementId: MEASUREMENT_ID
   };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);

   const [showNotes, setShowNotes] = useState(false)
   const [showList, setShowList] = useState(true)
   const [userInfo, setUserInfo] = useState('')
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   useEffect(() => {
     //Attatch Firebase authentication Observer.
     const auth = getAuth()
     const user = auth.currentUser
     onAuthStateChanged(auth, (user) => {
       if(user){
         setUserInfo(user.email)
         setIsAuthenticated(true)
       }
     })
   },[])

   const signOut = async () => {
     logoutUser()
     setUserInfo('')
     setIsAuthenticated(false)
   }

   const signIn = async () => {
     loginUser('gueronlj@gmail.com','karma666');
   }

   if(!isAuthenticated){
     return(
       <LoginPage/>
     )
   }else{
     return (
       <main>
         {isAuthenticated &&
           <div>{userInfo&&`Welcome, ${userInfo}`}
              <button onClick={signOut}>Logout</button>
           </div>}
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

}

export default App;
