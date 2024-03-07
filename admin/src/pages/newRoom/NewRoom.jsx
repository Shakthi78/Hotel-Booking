import React, { useState } from 'react'
import './newRoom.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])

  const {data, loading, error} = useFetch("http://localhost:8800/api/hotels")

  const handleChange = (e)=>{
    setInfo({...info, [e.target.id]: e.target.value})
  }

  const handleClick = async (e)=>{
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room => ({number: room}))
    try {
      await fetch(`http://localhost:8800/api/rooms/${hotelId}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...info, roomNumbers})

      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add new room</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form >
              
              {roomInputs.map((input)=>{
              return (
              <div key={input.id} className="formInput">
                <label>{input.label}</label>
                <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
              </div>
              )
              })}
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={(e)=> setRooms(e.target.value)} placeholder='Give comma between room numbers'></textarea>
              </div>
              <div className="formInput">
                <label>Choose hotel</label>
                <select id="hotelId" onChange={(e)=> setHotelId(e.target.value)}>
                  {loading ? "loading" : 
                  data && data.map((hotel)=>(
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom