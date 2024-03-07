import React, { useState } from 'react'
import './newHotel.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewHotel = () => {
  const [files, setFiles] = useState("")
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])

  const {data, loading, error} = useFetch("http://localhost:8800/api/rooms")

  const handleChange = (e)=>{
    setInfo({...info, [e.target.id]: e.target.value})
  }

  const handleSelect = (e)=> {
    const value = Array.from(e.target.selectedOptions, (option)=> option.value)
    setRooms(value)
  }
  const handleClick = async(e)=>{
    e.preventDefault()
    try {
      const list = await Promise.all(Object.values(files).map(async(file)=>{
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")

        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/de3ktiphf/image/upload", data)

        const {url} = uploadRes.data
        return url
      }))
      const newHotel = {
        ...info,
        rooms,
        photos: list,
      }

      const response = await fetch("http://localhost:8800/api/hotels", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHotel),
      })
      
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }
  console.log(files)

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add new hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={files ? URL.createObjectURL(files[0])
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNlCvCIk-K3ZPzfPDDaLDK9GUr8aEOitcbQ&usqp=CAU"} alt="" />
          </div>
          <div className="right">
            <form >
              <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadIcon className='icon'/></label>
                <input type="file" id='file' multiple onChange={e => setFiles(e.target.files)}  style={{display: 'none'}}/>
              </div>
              {hotelInputs.map((input)=>{
              return (
              <div key={input.id} className="formInput">
                <label>{input.label}</label>
                <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
              </div>
              )
              })}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>                
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "loading" 
                  : 
                  data && data.map((room)=>(
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))
                  }
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

export default NewHotel