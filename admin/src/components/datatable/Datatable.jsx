import React, { useEffect, useState } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../../../client/src/hooks/useFetch';

const Datatable = ({columns}) => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]

  console.log(path);
  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/${path}`)
  
  console.log(data);
  const [list, setList] = useState([])
  useEffect(() => {
    setList(data)
  }, [data])
  console.log(list);
  

  const handleClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8800/api/${path}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const newList = list.filter((list) => {
        return list._id !== id
      })
      setList(newList)
      return response.json();

    } catch (error) {
      console.error(error)
    }
  }
  
    const actionColumn = [
        {
            field: 'action',
            headerName: "ACTION",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                      <Link to="/users/test" style={{textDecoration: 'none'}}>
                         <div className="viewButton">View</div>
                      </Link>
                          <div className="deleteButton" onClick={()=>handleClick(params.row._id)}>Delete</div>
                    </div>
                )
            }
        }
    ]

  return (
    <div className='datatable'>
      <div className="datatableTitle">
      <Link to={`/${path}/new`} className='link'>
        Add New {path}
      </Link>
        
      </div>
        <DataGrid
        className='datagrid'
        rows={list}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        pageSizeOptions={[ 10]}
        checkboxSelection
        getRowId={row=> row._id}
      />
    </div>
  )
}

export default Datatable