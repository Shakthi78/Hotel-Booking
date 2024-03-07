export const userColumns = [
    { field: "id", headerName: "ID", width: 70},
    {
        field: "user",
        headerName: "USER",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img src={params.row.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-bmqm7mCI2OBNsFo6PDo9QD3NPzXnpn9vA&usqp=CAU"} alt="avatar" className="cellImg"/>
                    {params.row.username}
                </div>
            )
        }
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      width: 230
    },
    {
      field: "country",
      headerName: "COUNTRY",
      width: 100
    },
    {
      field: "city",
      headerName: "CITY",
      width: 100
    },
    {
      field: "phone",
      headerName: "PHONE",
      width: 100
    }
    
];



export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];