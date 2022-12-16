import React, { useState, useEffect } from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from "@fullcalendar/core/locales/es"
import { Modal } from 'bootstrap'


function Chart_Month_Citas(props) {

    const [data, setData] = useState([])
    const [details, setDetails] = useState(null)
    const [statusUpdate, setStatusUpdate] = useState("")
    var colorOption = ""

    useEffect(() => {

    //     fetch("https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllCitas")
    //         .then(response => response.json())
    //         .then(response => setData(response))
    //     console.log("Citas Loaded");
    //     //Traer Todas las citas
       setData(props.data)

     }, [props.dummy])


    const handleEventClick = (e) => {
        setDetails(e.event._def.extendedProps)
        console.log("Click", e.event._def.extendedProps._id, e.event._def.extendedProps.status)
        //Somehow summon a detail

        const myModal = new Modal("#detailModal")
        myModal.show()

    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        console.log("SUBMIT")

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/updateCitaStatus?_id=${details._id}&status=${statusUpdate}`,
        {method: "PUT"})
        .then(response => response.json())
        .then(response => response.modifiedCount === 1? alert("STATUS DE CITA ACTUALIZADO") : alert("NO HUBO CAMBIO"))
        .then(document.querySelector(".btn-close-detail").click())
        .then(setTimeout(() => {
            document.querySelector("#btn-refresh").click()
        }, 500))
    }
    const handleStatusChange = (e) => {
        setStatusUpdate(e.target.value)
               switch (statusUpdate) {
                        case "PENDIENTE":
                            colorOption = "orange"
                            break;
                        case "CONFIRMADA":
                            colorOption = "info"
                            break;
                        case "EN PROGRESO":
                            colorOption = "primary"
                            break;
                        case "REALIZADA":
                            colorOption = "success"
                            break;
                        case "NO REALIZADA":
                            colorOption = "warning"
                            break;
                        case "CANCELADA":
                            colorOption = "danger"
                            break;
                        default:
                            break;
                    }
        

    }




    return (


        <div className="">
            <FullCalendar
                headerToolbar={{
                    center: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                height={600}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                showNonCurrentDates={false}
                fixedWeekCount={false}
                slotDuration="00:20:00"
                slotLabelFormat={[
                    { hour: "2-digit", minute: "2-digit" }]
                }
                slotMinTime="08:00:00"
                slotMaxTime="19:00:00"
                events={data&& data.map((cita, key) => {
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
                            title: "Sillón " + cita.consultorio,
                            start: cita.fechaHoraI,
                            end:cita.fechaHoraF,
                            fechaHoraI: cita.fechaHoraI,
                            fechaHoraF: cita.fechaHoraF,
                            asunto: cita.asunto,
                            paciente: cita.paciente,
                            médico: cita.médico,
                            consultorio: cita.consultorio,
                            status: cita.status,
                            _id: cita._id,
                            allDay: false,
                            display: "block",
                            className: ` px-1 text-bg-${colorBadge} border rounded `,

                        }
                    )
                })}
                eventClick={handleEventClick}
                // eventMouseEnter ={handleEventClick}
                locale={esLocale}
                buttonText={
                    { today: "HOY", month: "MES", week: "SEMANA", day: "DÍA"  }
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
            {details && <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close btn-close-detail" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <p className='h4'>{details.paciente}</p>
                            <hr />
                            <p className='mb-2 '><i className="fa-regular fa-clock me-3"></i>{details.fechaHoraI.substring(8, 10)}-{details.fechaHoraI.substring(5, 7)}-{details.fechaHoraI.substring(0, 4)} / {details.fechaHoraI.substring(11)}</p>
                            <p className='mb-2 '><i className="fa-regular fa-clock me-3"></i>{details.fechaHoraF.substring(8, 10)}-{details.fechaHoraF.substring(5, 7)}-{details.fechaHoraF.substring(0, 4)} / {details.fechaHoraF.substring(11)}</p>
                            <p className='mb-2'><i className="fa-solid fa-house-medical me-3"></i>Sillón {details.consultorio}</p>
                            <p className='mb-2'> <i className="fa-solid fa-user-doctor me-3"></i>{details.médico}</p>
                            <p className='mb-2'><i className="fa-solid fa-file-medical me-3"></i>{details.asunto}</p>
                            <p className='mb-2'><i className="fa-solid fa-square-check me-3"></i>{details.status}</p>
                        </div>
                        <div className=" modal-footer d-flex justify-content-center">
                            
                            <form className='form col-12' action="" onSubmit={handleSubmitUpdate}>
                                
                                <p className='mb-3'>Actualizar Status:</p>
                                <select required className={`form-select mb-3 text-bg-${colorOption}`} name="" id="" onChange={handleStatusChange}>
                                    <option hidden value="">Selecciona:</option>
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="CONFIRMADA">CONFIRMADA</option>
                                    <option value="EN PROGRESO" >EN PROGRESO</option>
                                    <option value="REALIZADA">REALIZADA</option>
                                    <option value="NO REALIZADA">NO REALIZADA</option>
                                    <option value="CANCELADA">CANCELADA</option>
                                </select>
                                <button className='btn btn-primary float-end' type='submit'>Actualizar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>}
        </div>

    )
}

export default Chart_Month_Citas