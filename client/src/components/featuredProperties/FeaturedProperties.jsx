import React from 'react'
import './featuredProperties.css'
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? ("Loading")
      : 
      <>
      {data.map((data)=>(

      <div key={data._id} className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{data.name}</span>
        <span className="fpCity">{data.city}</span>
        <span className="fpPrice">Starting from ${data.cheapestPrice}</span>
        {data.rating && <div className="fpRating">
          <button>{data.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
      ))}
      </> }
     
    </div>
    
  )
}

export default FeaturedProperties