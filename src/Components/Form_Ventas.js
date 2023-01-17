import React, { useState, useEffect } from 'react'

function Form_Ventas(props) {

  const [productosOptions, setProductosOptions] = useState([])
  const [serviciosOptions, setServiciosOptions] = useState([])
  const [pacienteOptions, setPacienteOptions] = useState([])
  const [form, setForm] = useState({
    status: "FACTURADA"
  })
  const [multiplicador, setMultiplicador] = useState(0)
  const [ptsRedeem, setPtsRedeem] = useState(0)
  const [ptsAvail, setPtsAvail] = useState(0)



  useEffect(() => {

    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getPacientesOptions`)
      .then(response => response.json())
      .then(response => setPacienteOptions(response))
      .then(console.log("Pacientes Options Loaded!"))

    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getServiciosOptions`)
      .then(response => response.json())
      .then(response => setServiciosOptions(response))
      .then(console.log("Servicios Options Loaded!"))

  }, [props.dummy])


  



  const handleNewVenta = (e) => {
    e.preventDefault()
    console.log("VENTA!");

    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/createVenta?fechaHora=${form.fechaHora}&nivel=${form.nivel}&paciente=${form.paciente}&_idP=${form._idP}&consultorio=${form.consultorio}&status=${form.status}&desc=${form.desc}&venta=${form.venta}&pago=${form.pago}&total=${form.total}&puntos=${form.puntos}`,
    {method: "POST"})
    .then(response => response.json())
    .then( response => {response? alert("VENTA CREADA"): alert("ALGO SALIÓ MAL")})
    .then( document.querySelector("#add-venta-form").reset())
    .then(document.querySelector(".btn-close-venta").click())
    .then(()=>{
      if(form.pago === "puntos"){
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/subsPtsPaciente?_id=${form._idP}&puntos=${form.puntos}`, {method: "PUT"})
        .then(response => response.json())
        .then(response => response.modifiedCount > 0 ? alert(`${form.puntos} PUNTOS REDIMIDOS`): alert("ALGO SALIÓ MAL"))
      }
    })
    .then(setTimeout(() => {
      document.querySelector("#btn-refresh").click()
  }, 500))


    


  }

  const handleServicios = (e) => {
    const selected = document.querySelectorAll('#servicios-select option:checked');
    const values = Array.from(selected).map(el => {
      return ({ nombre: el.value, precio: el.dataset.price })
    });
    setForm({ ...form, servicios: values })


  }

  const handleReset = (e) => {

  }

  const handlePaciente = (e) => {
    var selectedP = document.querySelector("#paciente-select option:checked")
  

    switch (selectedP.dataset.nivel) {
      case "1":
        setMultiplicador ( 0.1)
        console.log(multiplicador);
        setForm({ ...form, nivel: selectedP.dataset.nivel, paciente: selectedP.value, _idP: selectedP.dataset.id })
        setPtsAvail(selectedP.dataset.pts)
        break;
      case "2":
        setMultiplicador ( 0.105)
        console.log(multiplicador);
        setForm({ ...form, nivel: selectedP.dataset.nivel, paciente: selectedP.value, _idP: selectedP.dataset.id })
        setPtsAvail(selectedP.dataset.pts)
        break;
      case "3":
        setMultiplicador ( 0.11)
        console.log(multiplicador);
        setForm({ ...form, nivel: selectedP.dataset.nivel, paciente: selectedP.value, _idP: selectedP.dataset.id })
        setPtsAvail(selectedP.dataset.pts)
        break;

      default:
        break;
    }

    
  }

  const handleFechaHora = (e) => {
    setForm({ ...form, fechaHora: e.target.value })
  }
  const handleConsultorio = (e) => {
    setForm({ ...form, consultorio: e.target.value })
  }
  const handleStatus = (e) => {
    setForm({ ...form, status: e.target.value })
  }
  const handleVenta = (e) => {
    setForm({ ...form, venta: Number(e.target.value) })
  }

  const handlePago = (e)=>{

    switch (e.target.value) {

      case "directo":
        let puntosCalc = Number(form.venta) * Number(multiplicador)
        console.log(form.venta, multiplicador);
        setForm({...form, pago: e.target.value, total: form.venta, puntos: puntosCalc})
        break;
    
      case "puntos":
        
        setForm({...form, pago: e.target.value})
        break;
    
      default:
        break;
    }
    
  }

  const handleDesc = (e) =>{
    setForm({...form, desc: e.target.value})
  }

  const handlePtsRedeem = (e) =>{
    setForm({...form, puntos: Number(e.target.value), total: form.venta - ((0.5)*(Number(e.target.value)))})

    console.log(form.venta - ((0.5)*(Number(e.target.value))));
    
   
  }


  return (
    <div className="modal-content">
      <div className="modal-header">
        <p className="modal-title h3" id="exampleModalLabel">Nueva Venta</p>
        <button type="button" className="btn-close btn-close-venta" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="" onSubmit={handleNewVenta} onReset={handleReset} id="add-venta-form">
        <div className="modal-body">
          <div className="row">
            <div className="col-6 mb-3">
              <label className='form-label' htmlFor="">Fecha / Hora:</label>
              <input className='form-control' type="datetime-local" name="" id="" onChange={handleFechaHora} required />
            </div>
            <div className="col-6 mb-3">
              <label className='form-label' htmlFor="">Consultorio:</label>
              <select className='form-select' name="" id="" onChange={handleConsultorio} required>
                <option hidden value="">Selecciona..</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="Tienda">Tienda</option>
              </select>

            </div>
            <div className="col-10 mb-3">
              <label className='form-label' htmlFor="">Paciente:</label>
              {/* <input className='form-select' list="paciente-select" onChange={handlePaciente} required placeholder='Busca...'/> */}
              <select className='form-select' name="" id="paciente-select" onChange={handlePaciente} required>
                <option hidden value="">Selecciona..</option>
                {pacienteOptions.map((paciente, key) => {
                  return (
                    <option key={key} value={paciente.nombre + " " + paciente.aPaterno + " " + paciente.aMaterno} data-nivel={paciente.nivelReward} data-id={paciente._id} data-pts={paciente.puntos}>{paciente.nombre} {paciente.aPaterno} {paciente.aMaterno}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-2">
              <label className='form-label' htmlFor="">Nivel:</label>
              <input className='form-control' type="text" disabled value={form.nivel} />
            </div>
           
            {/* <div className="col-6 mb-3">
              <label className='form-label' htmlFor="">Status:</label>
              <select className='form-select' name="" id="" onChange={handleStatus} required>
                <option hidden value="">Selecciona..</option>
                <option value="FACTURADA">FACTURADA</option>
                <option value="CANCELADA">CANCELADA</option>
                <option value="PAGADA">PAGADA</option>
              </select>

            </div> */}
            {/* <div className="col-12 mb-3">
              <label className='form-label' htmlFor="">Servicios:</label>
              
              <select id='servicios-select' class="form-select" multiple  onChange={handleServicios} required>
                <option hidden>Open this select menu</option>
                {
                serviciosOptions.map((servicioOpt, key)=>{
                  return(
                    <option value={servicioOpt.nombre} data-price={servicioOpt.precio} key={key}>{servicioOpt.nombre} {"..... "+ servicioOpt.precio}</option>
                  )
                })
                }
                
              </select>


              <div className='alert alert-info small mb-3 p-1'>Para seleccionar varios servicios, mantén presionada la tecla: <kbd>Ctrl</kbd> (en Windows) o <kbd>Cmd</kbd> (en Mac).</div>
            </div>
             */}
            <div className="col-12 mb-3">
              <label htmlFor="" className="form-label">Descripción:</label>
              <textarea className='form-control' name="" id="" cols="30" rows="2" placeholder='Productos o Servicios vendidos...' onChange={handleDesc} required></textarea>
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="" className='form-label'>Venta:</label>
              <div className="input-group">
                <span className='input-group-text'>$</span>
                <input type="tel" name="" id="" className='form-control' placeholder='Valor de los productos / servicios' pattern='[0-9]+' title='<<Solo números >>' onChange={handleVenta} required />
              </div>

            </div>


            <hr />
             <div className="col-12 mb-3">
              <label htmlFor="" className="form-label d-block">Tipo de Pago:</label>
              <select name="" id="" className="form-select" onChange={handlePago} required>
                <option value="" hidden>Selecciona..</option>
                <option value="directo">Directo</option>
                { ptsAvail > 0 && <option value="puntos">Usando Puntos</option>}
              </select>
                

             </div>
            <hr />

            {/* ZONA VARIABLE */}
            {form.pago === "directo" ? 
               <div className="col-12">
                <dl className='row'>
                  <dt className='col-6'>Total</dt>
                  <dd className='col-6 text-end'>$ {form.total}</dd>

                  <dt className='col-6'>Puntos Generados</dt>
                  <dd className='col-6 text-end text-success'>+{form.puntos}</dd>
                </dl>
               </div>
             :  null}
            {form.pago === "puntos" ? 
              <div className="col-12">
                <label htmlFor="" className="form label">¿Cuántos Puntos?</label>
                <input type="number" name="" id="" className="form-control" placeholder={'Puntos Máximos: '+ ptsAvail} max={ptsAvail} required pattern='[0-9]+' title='<<Solo números >>' onChange={handlePtsRedeem}/>
                <hr />
                <dl className='row'>
                  <dt className='col-6'>Puntos Redimidos</dt>
                  <dd className='col-6 text-end text-danger'>-{form.puntos}</dd>
                  <dt className='col-6'>Total</dt>
                  <dd className='col-6 text-end'>$ {form.total}</dd>
                </dl>
              </div>
             :  null}


          </div>
        </div>
        <div className="modal-footer">
          <div className="row">
            <div className="col-12 p-0">
              <button className='btn btn-outline-danger me-2' type='reset'>Borrar</button>
              <button className='btn btn-primary' type='submit'>Registrar</button>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Form_Ventas