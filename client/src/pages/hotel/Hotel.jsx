import React, { useContext, useState } from 'react'
import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
// import { SearchContext } from '../../context/SearchContext'
import {AuthContext} from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
  const location = useLocation()
  const [dates, setDates] = useState(location.state.dates)
  const path = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
 
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if(direction === 'l'){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
    }
    else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1
    }

    setSlideNumber(newSlideNumber)
  }

  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels/${path}`);

  // const { dates, options } = useContext(SearchContext)
  // console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 3600 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // const [{startDate, endDate}] = dates
  const days = dayDifference(dates[0].endDate, dates[0].startDate);


  const handleClick = (e) => {
    // e.preventDefault()
    reFetch() //e.preventDefault()  
    //Above 2 are working fine You can use one of them.
    if(user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }

  // console.log(days);


  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <CloseIcon
                className="close"
                onClick={() => setOpen(false)}
              />
              <ArrowBackIosIcon
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <ArrowForwardIosIcon
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <LocationOnIcon />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && 
      <>
      <Reserve setOpen={setOpenModal} dates={dates} hotelId={path}/>
      </>}
    </div>
  )
}

export default Hotel