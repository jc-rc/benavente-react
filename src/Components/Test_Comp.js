import React, { useState, useEffect } from 'react'

export default function Test_Comp() {

  const [data, setData] = useState([{
    nombre: "Venta 1",
    paciente: "JUAN CARLOS RODRÍGUEZ CHÁVEZ",
    nivel: 1,
    consultorio: "2",
    fechaHora: "2023-01-01T08:00",
    status: "FACTURADA",
    servicios: [
      {
        nombre: "Limpieza",
        precio: 500
      },
      {
        nombre: "Revisión",
        precio: 700
      }
      ,
      {
        nombre: "Ortodoncia",
        precio: 1000
      }
    ]
  }])


  return (
    <div className="row p-3 border rounded">
      {data.map((venta, key)=>{

        var total = 0
        var puntosTotal = 0
        var colorBadge = ""
        switch (venta.status) {
          case "FACTURADA":
            colorBadge = "secondary"
            break;
          case "PAGADA":
            colorBadge = "success"
            break;
          case "CANCELADA":
            colorBadge = "danger"
            break;
        
          default:
            break;
        }


        return(
          <div className="row" key={key}>
            <p className='h5 m-0'>{venta.paciente} <span className='badge text-bg-primary m-0'>Nivel {venta.nivel}</span></p>
            <p className='m-0'></p>
            <p className='h6 m-0'>{venta.fechaHora}</p>
            <p className='h5 m-0'>Sillón {venta.consultorio}</p>
            <p className='h5 mb-3'> <span className={`badge text-bg-${colorBadge} m-0`}>{venta.status}</span></p>
            <hr />
            <p className='h3 mb-3'>Servicios: </p>
           
            {venta.servicios.map((servicio, key)=>{
              total = total += servicio.precio
              

              return(
                <div className="row" key={key}>
                  <div className="col-4">
                    <p className=''>{servicio.nombre}</p>
                  </div>
                  <div className="col-4">
                    <p className=''>${servicio.precio}</p>
                  </div>
                  
                  <hr />
                </div>
              )
            })}
            
            <p className='h4'> Total: ${total}</p>
            <p className='small'> Puntos Generados: {total*0.1}</p>
          </div>
        )
      })}
    </div>
  )
}
