import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const Menu = (props)=>{

  return(
    <nav>
      <button
        onClick={()=>{props.setShowList(true);props.setShowNotes(false)}}
        className="list-button">Checklist</button>

      <button
        onClick={()=>{props.setShowNotes(true);props.setShowList(false)}}
        className="notes-button">Notes</button>

      <button
        onClick={()=>{
          props.showTimeClock?props.setShowTimeClock(false):props.setShowTimeClock(true)
        }}
        className="timeclock-button">Clock In/Out</button>
    </nav>
  )
}

export default Menu
