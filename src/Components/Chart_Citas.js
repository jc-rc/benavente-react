import React, { useState, useEffect } from 'react'

function Chart_Citas(props) {

    const [data, setData] = useState([])
    const [filterTerm, setFilterTerm] = useState("")

    const [filterDay, setFilterDay] = useState("")
    const [date, setDate] = useState("")
    var today = new Date()
    var todayString = ""

    useEffect(() => {
        
        setFilterDay(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);

        setFilterTerm("")

        fetch("https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas")
            .then(response => response.json())
            .then(response => setData(response))
        console.log("Citas Loaded");
        //Traer Todas las citas
    }, [props.dummy])


    const nextDay = ()=>{
        
        today.setDate(today.getDate() + 1)
        todayString = `${today.getFullYear()}-${today.getMonth()+1}-${(today.getDate()<10? "0" : "")+(today.getDate())}`
        console.log(todayString);
        setDate(todayString)

    }
    const prevDay = ()=>{
        today.setDate(today.getDate() - 1)
        todayString = `${today.getFullYear()}-${today.getMonth()+1}-${(today.getDate()<10? "0" : "")+(today.getDate())}`
        console.log(todayString);
        setDate((todayString)=>todayString)
    }


    return (
        <div className="container-fluid p-0">

            <div className="row">
                <div className="col-12">
                    <p className="h3">Citas para el día: {date}</p>
                    <input className='form-control w-25' type="date" name="" id="" value={filterDay} onChange={(e)=>setFilterDay(e.target.value)}/>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-4 ">
                    <p className="h4">Consultorio 1 </p>
                    <hr />
                    {data.map((cita, key) => {
                        if (cita.consultorio === "1") {
                           if(cita.fechaHora.includes(filterDay)) 
                            {let colorBadge = ""
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
                                <div className="row mb-2 d-flex justify-content-evenly">
                                    <span className={`badge text-bg-${colorBadge} d-block text-start p-2 col-9`}>
                                        <p className=' h5 m-0 lh-1'>{cita.fechaHora.substring(11)} <span className='small'>({cita.status})</span></p>
                                        <hr className='my-1' />
                                        <p className='mb-2'>{cita.paciente}</p>
                                        <p className='m-0 small'>{cita.asunto}</p>
                                    </span>
                                    <button className='btn btn-outline-secondary m-0 p-0 col-1'><i className="fa-solid fa-pencil"></i></button>
                                    <button className='btn btn-outline-danger m-0 p-0 col-1'><i className="fa-solid fa-trash"></i></button>
                                </div>
                            )}
                        }
                    })}
                </div>
                <div className="col-4 ">
                    <p className="h4">Consultorio 2 </p>
                    <hr />
                    {data.map((cita, key) => {
                        if (cita.consultorio === "2") {
                           if(cita.fechaHora.includes(filterDay)) 
                            {let colorBadge = ""
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
                                <div className="row mb-2 d-flex justify-content-evenly">
                                    <span className={`badge text-bg-${colorBadge} d-block text-start p-2 col-9`}>
                                        <p className=' h5 m-0 lh-1'>{cita.fechaHora.substring(11)} <span className='small'>({cita.status})</span></p>
                                        <hr className='my-1' />
                                        <p className='mb-2'>{cita.paciente}</p>
                                        <p className='m-0 small'>{cita.asunto}</p>
                                    </span>
                                    <button className='btn btn-outline-secondary m-0 p-0 col-1'><i className="fa-solid fa-pencil"></i></button>
                                    <button className='btn btn-outline-danger m-0 p-0 col-1'><i className="fa-solid fa-trash"></i></button>
                                </div>
                            )}
                        }
                    })}
                </div>
                <div className="col-4 ">
                    <p className="h4">Consultorio 3 </p>
                    <hr />
                    {data.map((cita, key) => {
                        if (cita.consultorio === "3") {
                           if(cita.fechaHora.includes(filterDay)) 
                            {let colorBadge = ""
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
                                <div className="row mb-2 d-flex justify-content-evenly">
                                    <span className={`badge text-bg-${colorBadge} d-block text-start p-2 col-9`}>
                                        <p className=' h5 m-0 lh-1'>{cita.fechaHora.substring(11)} <span className='small'>({cita.status})</span></p>
                                        <hr className='my-1' />
                                        <p className='mb-2'>{cita.paciente}</p>
                                        <p className='m-0 small'>{cita.asunto}</p>
                                    </span>
                                    <button className='btn btn-outline-secondary m-0 p-0 col-1'><i className="fa-solid fa-pencil"></i></button>
                                    <button className='btn btn-outline-danger m-0 p-0 col-1'><i className="fa-solid fa-trash"></i></button>
                                </div>
                            )}
                        }
                    })}
                </div>
                
               

            </div>
        </div>
    )
}

export default Chart_Citas