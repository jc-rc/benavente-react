import React, { useState, useEffect } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/es"
import { Modal } from 'bootstrap'


function Chart_Month_Citas(props) {

    const [data, setData] = useState([])
    const [details, setDetails] = useState({})
    
    useEffect(() => {
       
        fetch("https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas")
            .then(response => response.json())
            .then(response => setData(response))
        console.log("Citas Loaded");
        //Traer Todas las citas
    }, [props.dummy])


    const handleEventClick = (e) =>{
        console.log("Click", e.event._def.extendedProps._id)
        //Somehow summon a detail
        setDetails(e.event._def.extendedProps)

        const myModal = new Modal("#detailModal")
        myModal.show()

        
       
    }
  


    return (
        

            <div className="">
                <FullCalendar
                    height = {735}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends= {true}
                   showNonCurrentDates = {false}
                   fixedWeekCount = {false}
                    events= {data.map((cita,key)=>{
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
                            {
                                title: "| Sillón "+ cita.consultorio,
                                start: cita.fechaHora,
                                asunto: cita.asunto,
                                paciente: cita.paciente,
                                médico: cita.médico,
                                consultorio: cita.consultorio,
                                _id: cita._id,
                                allDay: false,
                                display: "block",
                                className: ` px-1 text-bg-${colorBadge} border rounded `,
                
                            }
                        )
                    })}
                    eventClick = {handleEventClick}
                    // eventMouseEnter ={handleEventClick}
                    locale = {esLocale}
                    buttonText ={
                        {today:  "HOY"}
                    }
                bootstrapFontAwesome={{
                    close: 'fa-times',
                    prev: 'fa-chevron-left',
                    next: 'fa-chevron-right',
                    prevYear: 'fa-angle-double-left',
                    nextYear: 'fa-angle-double-right'
                }}
                
                    // dayMaxEvents = {7}
                
                
                />


                {/* MODAL DETAIL */}
                <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>{details.paciente}</p>
                            <p>{details.médico}</p>
                            <p>{details.asunto}</p>
                            <p>Sillón {details.consultorio}</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <p className='col-12'>ACTUALIZAR EL STATUS</p>
                            <button className='col-3 btn btn-sm text-bg-orange'>PENDIENTE</button>
                            <button className='col-3 btn btn-sm text-bg-info'>CONFIRMADA</button>
                            <button className='col-3 btn btn-sm text-bg-primary'>EN PROGRESO</button>
                            <button className='col-3 btn btn-sm text-bg-success'>REALIZADA</button>
                            <button className='col-3 btn btn-sm text-bg-warning'>NO REALIZADA</button>
                            <button className='col-3 btn btn-sm text-bg-danger'>CANCELADA</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        
    )
}

export default Chart_Month_Citas