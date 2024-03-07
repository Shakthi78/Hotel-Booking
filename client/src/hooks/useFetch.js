import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch = (url)=>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
      const fetchData = async() => {
        setLoading(true)
        try {
            const res = await fetch(url)
            const response = await res.json();
            // console.log(response);
            setData(response)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
      }
      fetchData();
    }, [url])

    const reFetch = async() => {
        setLoading(true)
        try {
            const res = await fetch(url)
            const response = await res.json();
            setData(response)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }    

    return {data, loading, error, reFetch}
}

export default useFetch;

