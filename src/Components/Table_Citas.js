import React, { useState, useEffect } from 'react'
import Form_Citas from './Form_Citas'

function Table_Citas(props) {

    const [data, setData] = useState([])
    const [filterTerm, setFilterTerm] = useState("")

    useEffect(() => {
        setFilterTerm("")

        fetch("https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas")
            .then(response => response.json())
            .then(response => setData(response))
        console.log("Citas Loaded");
        //Traer Todas las citas
    }, [props.dummy])


    const handleFilterTerm = (e) => {
        setFilterTerm(e.target.value)

    }

    const handleSearch = () => {
        console.log("Searching...");
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getFilteredCitas?term=${filterTerm}`)
            .then(response => response.json())
            .then(response => setData(response))
    }

    const handleDelete = (id)=>{
        console.log("Deleting...", id);

        if(window.confirm("¿EN VERDAD DESEA ELIMINAR ESTA CITA?")){
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/deleteCita?_id=${id}`, 
            {method: "DELETE"})
            .then(alert("CITA ELIMINADA"))
            .then(setTimeout(() => {
                document.querySelector("#btn-refresh").click()
            }, 300))
        }else{
            alert("OPERACIÓN CANCELADA, RECARGANDO LISTADO...")
        }

        

    }


    return (
        <div className='row'>

            <div className="row d-flex  align-items-center ">
                <div className="col-3">
                    <p className="h2 m-0 ">Citas</p>
                </div>
                <div className="col-6 p-0 m-0">
                    <div className="input-group input-group">
                        <input type="text" className="form-control" placeholder='Ingresa fecha, hora, paciente, médico, etc...' onChange={handleFilterTerm} />
                        <button className='btn btn-outline-secondary input-group-text' onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
                    </div>
                </div>
            </div>
            <hr className='my-4'/>



            <div className="col d-flex align-items-start">
                <p className=" h5 m-0">Total: {data.length}</p>
            </div>
            <div className="col-2 mb-4 align-items-center me-2">
                <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa-solid fa-circle-plus me-1"></i> Nueva Cita</button>
            </div>
            <div className="col-12 px-4">
                <div className="row mb-3">
                    
                    <div className="col fw-bold">Fecha y Hora</div>
                    
                    <div className="col fw-bold">Paciente</div>
                    <div className="col fw-bold">Médico</div>
                    <div className="col-1 fw-bold">Sillón</div>
                    <div className="col fw-bold">Asunto</div>
                    <div className="col-1 fw-bold">STATUS</div>
                    <div className="col-1 text-end fw-bold">Editar</div>
                    <div className="col-1 text-end fw-bold">Borrar</div>
                </div>
            </div>

            <div className="col-12">
                <ul className="list-group" style={{overflowY: "scroll", height: "55vh"}}>
                    {
                        data.map((cita, key) => {
                            let colorBadge = ""
                            switch (cita.status) {
                                case "PENDIENTE":
                                    colorBadge = "orange"
                                    break;
                                case "CONFIRMADA":
                                    colorBadge = "info"
                                    break;
                                case "EN PROGRESO":
                                    colorBadge = "primary"
                                    break;
                                case "REALIZADA":
                                    colorBadge = "success"
                                    break;
                                case "NO REALIZADA":
                                    colorBadge = "warning"
                                    break;
                                case "CANCELADA":
                                    colorBadge = "danger"
                                    break;

                                default:
                                    break;
                            }

                            return (
                                
                            <li className='list-group-item py-3' key={key}>
                                
                                <div className="row d-flex align-items-center">
                                    {/* <div className="col-1">{cita.fecha}</div>
                                    <div className="col-1">{cita.hora}</div> */}
                                    
                                    <div className="col small">{cita.fechaHora.substring(8,10)}-{cita.fechaHora.substring(5,7)}-{cita.fechaHora.substring(0,4)} / {cita.fechaHora.substring(11)}</div>
                                    <div className="col small">{cita.paciente}</div>
                                    <div className="col small">{cita.médico}</div>
                                    <div className="col-1 small text-center">{cita.consultorio}</div>
                                    <div className="col small">{cita.asunto}</div>
                                    <div className="col-1 small"><span className={`badge py-2 text-bg-${colorBadge}`}>{cita.status}</span></div>
                                    <div className="col-1 text-end"><button className='btn btn-outline-secondary'><i className="fa-solid fa-pencil"></i></button></div>
                                    <div className="col-1 text-end"><button  className='btn btn-outline-danger' onClick={()=>handleDelete(cita._id)}><i className="fa-solid fa-trash" ></i></button></div>
                                </div>
                            </li>)
                        })
                    }
                </ul>
            </div>



            {/* MODAL ADD CITA */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <Form_Citas dummy={props.dummy}/>
                </div>
            </div>

        </div>
    )
}

export default Table_Citas