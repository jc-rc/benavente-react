import React, {useEffect, useState} from 'react'

function Table_Usuarios(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        //GET USUARIOS
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getPacientesOptions`)
          .then(response => response.json())
          .then(response => setData(response))
          .then(console.log("Directorio Loaded"))
    
    
      }, [props.dummy])


      const handleFilterTerm = (e)=>{}
      const handleSearch = (e)=>{}

  return (
    <div>

<div className="row d-flex align-items-center">
        <div className="col">
          <p className="h2 m-0">Directorio</p>
        </div>
        {/* <div className="col-5 p-0 m-0">
          <div className="input-group input-group">
            <input type="text" className="form-control" placeholder='Ingresa fecha, hora, paciente, médico, etc...' onChange={handleFilterTerm} />
            <button className='btn btn-outline-secondary input-group-text' onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
          </div>
        </div> */}
        {/* <div className="col align-items-center">
          <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#VentaModal">
            <i className="fa-solid fa-circle-plus me-1"></i> NUEVA VENTA</button>
        </div> */}
        <hr className='my-4' />
      </div>

      <div className="row">
        <div className="col-1">ID</div>
        <div className="col-4">Paciente</div>
        <div className="col-1">Nivel</div>
        <div className="col-1">Puntos</div>
        <div className="col">Correo</div>
        
      </div>

      <div className="list-group" style={{ overflowY: "scroll", height: "55vh" }}>
        {data && data.map((paciente, key) =>{



            return (
                <div className="list-group-item row d-flex"  key={key}>
                    <div className="col-1">
                        <p className="m-0 py-2 small">{paciente.idInt}</p>
                    </div>
                    <div className="col-4">
                        <p className="m-0 py-2 small">{paciente.nombre} {paciente.aPaterno} {paciente.aMaterno}</p>
                    </div>
                    <div className="col-1">
                        <p className="m-0 py-2 small">{paciente.nivelReward}</p>
                    </div>
                    <div className="col-1">
                        <p className="m-0 py-2 small">{paciente.puntos}</p>
                    </div>
                    <div className="col">
                        <p className="m-0 py-2 small">{paciente.username}</p>
                    </div>
                </div>
            )
        })}
      </div>


    </div>
  )
}

export default Table_Usuarios