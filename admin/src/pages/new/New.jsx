import React, { useState } from 'react'
import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios'
const New = ({inputs, title}) => {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState({})

  const handleChange = (e)=>{
    setInfo({...info, [e.target.id]: e.target.value})
  }

  const handleClick = async(e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/de3ktiphf/image/upload", data)

      const {url} = uploadRes.data

      const newUser = {
        ...info,
        img: url
      }
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      
      return response.json()

    } catch (error) {
      console.log(error)
    }
  }
  console.log(info)


  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file)
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNlCvCIk-K3ZPzfPDDaLDK9GUr8aEOitcbQ&usqp=CAU"} alt="" />
          </div>
          <div className="right">
            <form >
              <div className="formInput">
                <label htmlFor='file'>
                  Image: <DriveFolderUploadIcon className='icon'/></label>
                <input type="file" id='file' onChange={e => setFile(e.target.files[0])}  style={{display: 'none'}}/>
              </div>
              {inputs.map((input)=>{
              return (
              <div key={input.id} className="formInput">
                <label>{input.label}</label>
                <input onChange={handleChange } type={input.type} placeholder={input.placeholder} id={input.id}/>
              </div>
              )
              })}
              
              <button onClick={handleClick}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New