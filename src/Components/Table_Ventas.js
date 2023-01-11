import React, { useState, useEffect } from 'react'
import Form_Ventas from './Form_Ventas'
import Form_Status_Ventas from './Form_Status_Ventas'

function Table_Ventas(props) {

  const [data, setData] = useState([])
  const [currentVenta, setCurrentVenta] = useState({})

  useEffect(() => {
    //GET VENTAS
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/getAllVentas`)
      .then(response => response.json())
      .then(response => setData(response))
      .then(console.log("Ventas Loaded"))


  }, [props.dummy])


  const handleFilterTerm = () => {

  }
  const handleSearch = () => {

  }



  return (
    <div className="">
      <div className="row d-flex align-items-center">
        <div className="col">
          <p className="h2 m-0">Ventas</p>
        </div>
        <div className="col-5 p-0 m-0">
          <div className="input-group input-group">
            <input type="text" className="form-control" placeholder='Ingresa fecha, hora, paciente, médico, etc...' onChange={handleFilterTerm} />
            <button className='btn btn-outline-secondary input-group-text' onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
          </div>
        </div>
        <div className="col align-items-center">
          <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#VentaModal">
            <i className="fa-solid fa-circle-plus me-1"></i> NUEVA VENTA</button>
        </div>
        <hr className='my-4' />
      </div>

      <div className="row">
        <div className="col-2">Fecha</div>
        <div className="col-3">Paciente</div>
        <div className="col-1">Nivel</div>
        <div className="col">Pago</div>
        <div className="col">Venta</div>
        <div className="col">Puntos</div>
        <div className="col">Total</div>
        <div className="col">Status</div>
      </div>

      <div className=" list-group p-0">
        {data && data.map((venta, key) => {

          let colorBadge = ""
          let colorText = ""
          let prefixPuntos = ""
          let colorPago = ""
          let modalAccess = ""

          venta.pago === "directo" ? colorText = "success" : colorText = "danger"
          venta.pago === "directo" ? prefixPuntos = "+" : prefixPuntos = "-"
          venta.pago === "directo" ? colorPago = "primary" : colorPago = "warning"
          switch (venta.status) {
            case "FACTURADA":
              colorBadge = "secondary"
              modalAccess = "#VentaStatusModal"
              break;
            case "PAGADA":
              colorBadge = "success"
              modalAccess = ""
              break;
            case "CANCELADA":
              colorBadge = "danger"
              modalAccess = ""
              break;

            default:
              break;
          }

          return (
            <div className="list-group-item row d-flex px-0" key={key}>
              <div className="col-2"><p className='m-0 py-2 small'>{venta.fechaHora.substring(8, 10)}-{venta.fechaHora.substring(5, 7)}-{venta.fechaHora.substring(0, 4)} / {venta.fechaHora.substring(11)}</p></div>
              <div className="col-3"><p className='m-0 py-2 small'>{venta.paciente}</p></div>
              <div className="col-1"><p className='m-0 py-2 small'>{venta.nivel}</p></div>
              <div className="col"><p className='m-0 py-2 small'><span className={"badge text-bg-" + colorPago}>{venta.pago}</span></p></div>
              <div className="col"><p className='m-0 py-2 small'>${venta.venta}</p></div>
              <div className="col"><p className={'m-0 py-2 small text-' + colorText}>{prefixPuntos}{venta.puntos}</p></div>
              <div className="col"><p className='m-0 py-2 small'>${venta.total}</p></div>
              <div className="col" onClick={()=>{setCurrentVenta({_id: venta._id, _idP: venta._idP, pago: venta.pago, puntos: venta.puntos})}}><p className='m-0 py-2' data-bs-toggle="modal" data-bs-target={modalAccess}><span className={"p-2 badge text-bg-" + colorBadge}>{venta.status}</span></p></div>
            </div>
          )
        })}
      </div>


      {/* MODAL ADD VENTA */}
      <div className="modal fade" id="VentaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <Form_Ventas dummy={props.dummy} />
        </div>
      </div>

      {/* MODAL EDITAR STATUS DE VENTA */}
      <div className="modal fade" id="VentaStatusModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <Form_Status_Ventas dummy = {props.dummy} venta= {currentVenta}/>
        </div>
      </div>
    </div>
  )
}

export default Table_Ventas