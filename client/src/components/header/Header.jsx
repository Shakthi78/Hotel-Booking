import React, { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import './header.css'
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Header = ({ type }) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const today = new Date();
    const [dates, setDates] = useState([
        {
          startDate: today,
          endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
          key: "selection",
        },
      ]); 
      
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
            adult: 1,
            children: 0,
            room: 1
        })  

    const handleOption = (name, operation) => {
        setOptions((prev) =>{
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] -1
            }
        } )
    }    

    const navigate = useNavigate()
    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({type: "NEW_SEARCH",  payload:{ destination, dates, options }})
        navigate("/hotels", {state:{ destination, dates, options }})
    }

  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
                <HotelIcon/>
                <span>Stays</span>
            </div>
            <div className="headerListItem">
                <FlightIcon/>
                <span>Flights</span>
            </div>
            <div className="headerListItem">
                <DirectionsCarIcon/>
                <span>Car rentals</span>
            </div>
            <div className="headerListItem">
                <HotelIcon/>
                <span>Attractions</span>
            </div>
            <div className="headerListItem">
                <LocalTaxiIcon/>
                <span>Airport taxis</span>
            </div>
        </div>
        { type !== "list" &&
            <>
            <h1 className="headerTitle">A lifetime of discount? It's genius</h1>
        <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a HotelBooking account</p>
        {!localStorage.getItem('user') && <button className="headerButton">Sign in/Register</button>}
        <div className="headerSearch">
            <div className="headerSearchItem">
                <HotelIcon className="headerIcon"/>
                <input type="text" 
                placeholder='Where are you going'
                className='headerSearchInput' 
                onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="headerSearchItem" onClick={()=>setOpenDate(!openDate)}>
                <CalendarMonthIcon className="headerIcon"/>
                <span className='headerSearchText'>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />}
            </div>
            <div className="headerSearchItem" onClick={()=> setOpenOptions(!openOptions)}>
                <PersonIcon className="headerIcon"/>
                <span className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                {openOptions &&
                <div className="options">
                    <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                        <button 
                        disabled={options.adult<=1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                        <button 
                        disabled={options.children<1} className="optionCounterButton"  onClick={()=>handleOption("children", "d")}>-</button>
                        <span className="optionCounterNumber">{options.children} </span>
                        <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                        <button 
                        disabled={options.room<=1}className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div className="headerSearchItem">
                <button className="headerButton" onClick={handleSearch}>Search</button>
            </div>
            </div></>}
        </div>
    </div>
  )
}

export default Header