import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import axios from 'axios'
import {parse} from 'date-fns'

const URL = process.env.REACT_APP_DEV_URI;
//---------------------------------------------
export function loginUser( email, password ) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential// Signed in
  })
  .catch((error) => {
    return error.message
  })
}
///-----------------------------------------
export function logoutUser(){
  const auth = getAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
  console.log('signed out!');
}).catch((error) => {
  // An error happened.
  console.log(error.message);
});
}
//--------------------------------------------
export function addObserver(auth, user){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in,
      return user
    } else {
      //User signed off
    }
  })
}
//------------------------------------------
export async function clockInDB(){
  try{

  }catch(error){
    console.log(error);
  }
}
//------------------------------------------
export async function clockOutDB(token, userId){
  try{
    const clockOutOptions = {
      method: 'get',
      url: `http://localhost:3002/schedule/${userId}/clockout`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios(clockOutOptions)
    /*Adds the current time as End time to current shift of employee on server.*/
    let time = new Date().toLocaleTimeString()
    let endTimeISO = parse(time, 'pp' , new Date())
    let payload = {
      id:res.data.id,
      date:res.data.date,
      start:res.data.start,
      end:endTimeISO,
      period:res.data.period
    }
    const callOptions = {
      method: 'put',
      url: `https://ems-backend-eight.vercel.app/schedule/${userId}/edit/${payload.id}`,
      data: payload,
      headers: {
       Authorization: `Bearer ${token}`
      }
    }
    await axios(callOptions)
  }catch(error){
    console.log(error);
  }
}
//----------------------------------------
export async function changeClockedInStatus(boolean, token, userId){
  try{
    const payload = {
      clockedIn:boolean
    }
    const options = {
      method:'put',
      url:`https://ems-backend-eight.vercel.app/admin/${userId}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios(options)
  } catch ( error ) {
    console.log(error);
  }
}
//------------------------------------------
export function useCheckUser(){
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkUser = () => {
    const auth = getAuth();
    const user = auth.currentUser
    if (user) {
      setIsAuthenticated(true)
      console.log(`checkUser found ${isAuthenticated}`);
    } else {
      setIsAuthenticated(false)
      console.log(`checkUser found ${isAuthenticated}`);
    }
  }

  useEffect(() => {
    console.log(isAuthenticated);
    checkUser()
  }, [isAuthenticated]);

  return { isAuthenticated }
}
