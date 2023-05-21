import {useState, useEffect, useRef} from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginUser} from "../components/helpers.js"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Key from '@mui/icons-material/Key';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({email:'', password:''})

  const signIn = async (e) => {
    e.preventDefault()
    console.log(credentials);
    loginUser(credentials.email, credentials.password);
  }

  const handleChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return(
    <div id="login-page">
        <div className="login-form">
        <img id='logo' src="images/hangrypanda-icon.png"/>
        <h1>Employee Login</h1>
        <Box
          component="form"
          sx={{ display:'flex', flexDirection:'column',
           '& .MuiInput-root': { m:3, width: '30ch' },
          }}
          noValidate
          autoComplete="off">
          <FormControl onChange={handleChange} variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Email
            </InputLabel>
            <Input
               required
               type="email"
               name="email"
               id="standard-required"
               variant="standard"
               autoComplete="email"
               startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }/>
          </FormControl>
          <FormControl onChange={handleChange} variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Password
          </InputLabel>
            <Input
               required
               id="standard-password-input"
               name="password"
               type="password"
               variant="standard"
               autoComplete="current-password"
               startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }/>
          </FormControl>
        </Box>
        <Button id="submit" variant="outlined" size="large" onClick={signIn}>Submit</Button>
        </div>
    </div>
  )
}

export default LoginPage;
