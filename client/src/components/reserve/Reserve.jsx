import React, { useContext, useState } from 'react'
import './reserve.css'
import CloseIcon from '@mui/icons-material/Close';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({setOpen, hotelId, dates}) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const {data, loading, error} = useFetch(`http://localhost:8800/api/hotels/find/room/${hotelId}`)
    // const { dates } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const date = new Date(start.getTime());
  
      const dates = [];
  
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
  
      return dates;
    };
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
      const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))

      return isFound
    }

    const handleSelect = (e) => {
      const checked = e.target.checked
      const value = e.target.value
      setSelectedRooms(checked ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value))
    }

    const navigate = useNavigate()

    const handleClick = async () => {
      try {
        await Promise.all(selectedRooms.map((roomId)=>{
          const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {dates: allDates})
          return res.data
        }))
        setOpen(false)
        // navigate("/")
      } catch (error) {
        console.log(error);
      }
      
    }


    console.log(selectedRooms)

  return (
    <div className="reserve">
      <div className="rContainer">
        <CloseIcon
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your rooms: </span>
        {data.map((item,i)=>(
            <div key={i} className="rItem">
                <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">
                        Max People: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rDesc">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber,i)=>(
                  <div key={i} className="room">
                      <label htmlFor="">{roomNumber.number}</label>
                      <input type="checkbox" 
                      value={roomNumber._id} 
                      onChange={handleSelect}
                      disabled={isAvailable(roomNumber)}/>
                  </div>
                  ))}
                  </div>
            </div>
        ))}
               
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve
