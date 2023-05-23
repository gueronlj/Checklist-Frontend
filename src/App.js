import './App.css'
import {useState, useEffect} from 'react'
import Checklist from './components/checklist.js'
import Menu from './components/menu.js'
import Notes from './components/notes.js'
import LoginPage from './views/login.js'
import TimeClock from './views/time-clock.js'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logoutUser, useCheckUser } from "./components/helpers.js"

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
  const [showTimeClock, setShowTimeClock] = useState(false)
  const [userInfo, setUserInfo] = useState('')
  const [isAuthenticated, setIsAuthenticated ] = useState(false)

  useEffect(() => {
    //Attatch Firebase authentication Observer
    const auth = getAuth()
    const user = auth.currentUser
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in
        setIsAuthenticated(true)
        setUserInfo(user.email)
      } else {
        setUserInfo()
        setIsAuthenticated(false)//User signed off
      }
    })
  },[userInfo])

  const signOut = async () => {
    logoutUser()
    setUserInfo('')
    setIsAuthenticated(false)
  }

  if( !isAuthenticated ){
    return(
      <LoginPage/>
    )
  }else{
    return (
      <main>
      {isAuthenticated &&
        <div className="header">{`Welcome, ${userInfo}`}
           <button onClick={signOut}>Logout</button>
        </div>
      }
        <h1>Hangry Panda Helper</h1>
        <Menu
          showNotes={showNotes}
          setShowNotes={setShowNotes}
          showList={showList}
          setShowList={setShowList}
          showTimeClock={showTimeClock}
          setShowTimeClock={setShowTimeClock}/>
      {showTimeClock &&
        <TimeClock/>}
      {showList &&
        <Checklist/>}
      {showNotes &&
        <Notes/>}
      </main>
    )
  }
}

export default App;
