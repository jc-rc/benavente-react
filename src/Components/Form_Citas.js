import React, {useState, useEffect} from 'react'

function Form_Citas(props) {

    const [pacienteOptions, setPacienteOptions] = useState([])
    const [médicoOptions, setMédicoOptions] = useState([])
    const [form, setForm] = useState({})


    useEffect(() => {
        
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getPacientesOptions`)
        .then(response=>response.json())
        .then(response=>setPacienteOptions(response))
        .then(console.log("Pacientes Options Loaded!"))


        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getMedicosOptions`)
        .then(response=>response.json())
        .then(response=>setMédicoOptions(response))
        .then(console.log("Médicos Options Loaded!"))

    }, [props.dummy])
    

    const handleNewCita = (e) =>{
        e.preventDefault()
        //CREAR CITA EN DB
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/createCita?fecha=${form.fecha}&hora=${form.hora}&paciente=${form.paciente}&médico=${form.médico}&consultorio=${form.consultorio}&asunto=${form.asunto}&fechaHora=${form.fechaHora}`,
        {method: "POST"})
        .then(response=> response.json())
        .then(response=> {
            if (response.error){
                alert(`ERROR:\n Ya existe una cita con esta fecha/hora en este consultorio.`)
            }else{
                alert("CITA CREADA, RECARGANDO LISTADO...")
            }
        })
        .then(document.querySelector(".btn-close").click())
        .then(setTimeout(() => {
            document.querySelector("#btn-refresh").click()
        }, 500))
    }

    const handleFecha = (e)=>{
        setForm({...form, fecha: e.target.value})
    }
    const handleHora = (e)=>{
        setForm({...form, hora: e.target.value})
    }
    const handleFechaHora = (e)=>{
        setForm({...form, fechaHora: e.target.value})
    }
    const handlePaciente = (e)=>{
        setForm({...form, paciente: e.target.value})
    }
    const handleMédico = (e)=>{
        setForm({...form, médico: e.target.value})
    }
    const handleConsultorio = (e)=>{
        setForm({...form, consultorio: e.target.value})
    }
    const handleAsunto = (e)=>{
        setForm({...form, asunto: e.target.value})
    }


  return (
    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="exampleModalLabel">Nueva Cita</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="" onSubmit={handleNewCita}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <label className='form-label' htmlFor="">Fecha y Hora:</label>
                                        <input required className='form-control' type="datetime-local"  onChange={handleFechaHora} step="1200" pattern="\d\d\d\d-\d\d-\d\dT([0]?[8-9]|1[0-8]):((0|2|4)0)" title='Cool'/>
                                    </div>
                                    {/* <div className="col-6 mb-3">
                                        <label className='form-label' htmlFor="">Hora:</label>
                                        <input className='form-control' type="time"  onChange={handleHora}/>
                                    </div> */}
                                    <div className="col-12 mb-3">
                                        <label className='form-label' htmlFor="">Paciente:</label>
                                        <select required className='form-select' name="" id="" onChange={handlePaciente}>
                                            <option hidden value="">Selecciona..</option>
                                            {pacienteOptions.map((paciente, key)=>{
                                                return(
                                                    <option key={key} value={paciente.nombre + " " + paciente.aPaterno + " "+ paciente.aMaterno}>{paciente.nombre} {paciente.aPaterno} {paciente.aMaterno}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className='form-label' htmlFor="">Médico:</label>
                                        <select required className='form-select' name="" id="" onChange={handleMédico}>
                                            <option hidden value="">Selecciona..</option>
                                            {médicoOptions.map((médico, key)=>{
                                                return(
                                                    <option key={key} value={médico.nombre + " " + médico.aPaterno + " "+ médico.aMaterno}>{médico.nombre} {médico.aPaterno} {médico.aMaterno}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className='form-label' htmlFor="">Consultorio:</label>
                                        <select required className='form-select' name="" id="" onChange={handleConsultorio}>
                                            <option hidden value="">Selecciona..</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className='form-label' htmlFor="">Asunto:</label>
                                        <textarea required className='form-control' name="" id="" cols="30" rows="5" onChange={handleAsunto}></textarea>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-outline-danger">Limpiar</button>
                                <button type="submit" className="btn btn-primary">Agendar</button>
                            </div>
                        </form>
                    </div>
  )
}

export default Form_Citas