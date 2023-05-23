import { useState } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Key from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import CheckFormControl from '../components/checkFormControlState.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";
import { useCheckUser } from "../components/helpers.js"

const Login = () => {
  const [credentials, setCredentials] = useState({email:'', password:''})
  const [emailIsFilled, setEmailedIsFilled] = useState(false)
  const [credentialsError, setCredentialsError] = useState('')
  const { register, formState: { errors }, handleSubmit, watch } = useForm({
    mode: "onChange"
  });

  const loginUser = ( email, password )=> {
    // const [credentialsError, setCredentialsError] = useState(``)
    // const [user, setUser] = useState(null)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    })
    .catch((error) => {
      setCredentialsError(error.message)
    })
  }

  const signIn = async () => {
    loginUser(credentials.email, credentials.password);
    console.log(credentialsError);
  }

  const handleChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return(
    <div id="login-page">
        <div className="login-form">
          <img id='logo' src="images/hangrypanda-icon.png" alt=""/>
          <h1>Employee Login</h1>
          <Box
            component="form"
            sx={{ display:'flex', flexDirection:'column',
             '& .MuiInput-root': { m:2, width: '30ch' },
            }}
            noValidate
            autoComplete="off">
            <FormControl
              onChange={handleChange}
              variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Email
              </InputLabel>
              <Input
                {...register("email", { required: "Email is required",
                 pattern: {
                   value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                   message: "Must be a valid email address."
                 }})}
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
              <CheckFormControl
                errors={errors}
                setEmailedIsFilled={setEmailedIsFilled}/>
            </FormControl>
            <FormControl onChange={handleChange} variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Password
              </InputLabel>
              <Input
                 {...register("password", { required: "Enter password"})}
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
          {credentialsError &&
            <p className="error">{credentialsError}</p>}
            <Button id="submit" type="submit" variant="outlined" size="large" onClick={handleSubmit(signIn)}>Submit</Button>
          </Box>
        </div>
    </div>
  )
}

export default Login;
