import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clockOutDB, clockInDB, changeClockedInStatus } from '../components/helpers.js'

const TimeClock = () => {
  const [clockInDisabled, setClockInDisabled] = useState(false);
  const [clockOutDisabled, setClockOutDisabled] = useState(true)
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0()

  const clockIn = async() => {
    try{
      //toggle button status
      setClockInDisabled(true)
      setClockOutDisabled(false)
    }catch (error) {
      console.log(error);
    }
  }

  const clockOut = async() => {
    const userId = '1';
    const token = await getAccessTokenSilently()
    try{
      clockOutDB(token, userId)
      //toggle button status
      changeClockedInStatus(false, token, userId)
      setClockOutDisabled(true)
      setClockInDisabled(false)
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='time-clock'>
      <button id="clockin" onClick={clockIn} disabled={clockInDisabled} >Clock In</button>
      <button id="clockout" onClick={clockOut} disabled={clockOutDisabled} >Clock Out</button>
    </div>
  );
}
export default TimeClock;
