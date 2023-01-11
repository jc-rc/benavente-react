import React, { useState, useEffect } from 'react'

function Form_Status_Ventas(props) {

    const [form, setForm] = useState({})

    useEffect(() => {
        setForm(props.venta)


    }, [props])


    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/consolidarVenta?_id=${form._id}&_idP=${form._idP}&pago=${form.pago}&status=${form.status}&puntos=${form.puntos}`,
            { method: "PUT" })
            .then(response => response.json())
            .then(response => response.status === 200 ? alert("VENTA CONSOLIDADA") : alert("ALGO SALIÓ MAL"))
            .then(document.querySelector("#form-status-venta").reset())
            .then(document.querySelector(".btn-close-venta-status").click())
        .then(setTimeout(() => {
            document.querySelector("#btn-refresh").click()
        }, 500))



        console.log("VENTA CONSOLIDADA", form);
        document.querySelector("#form-status-venta").reset()
    }
    const handleStatus = (e) => {
        setForm({ ...form, status: e.target.value })

    }

    return (
        <div className="modal-content">
            <div className="modal-header">
                <p className="modal-title h3" id="exampleModalLabel">Consolidar Venta</p>
                <button type="button" className="btn-close btn-close-venta-status" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" id='form-status-venta' onSubmit={handleSubmit}>
                <div className="modal-body row">
                    <div className="col 12 mb-3">
                        <label htmlFor="" className="form-label" >Status:</label>
                        <select name="" id="" className="form-select" onChange={handleStatus} required  >
                            <option hidden value="">Selecciona..</option>
                            <option value="PAGADA">PAGADA</option>
                            <option value="CANCELADA">CANCELADA</option>

                        </select>
                    </div>
                    <div className="col-12">
                        <div class="alert alert-info" role="alert">
                            <p>CANCELADA - si fue pagada "directo", resta los puntos al paciente; si fue pagada con "puntos", suma los puntos al paciente.</p>
                            <p>PAGADA -  si fue pagada  "directo", suma los puntos al paciente.</p>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className='btn btn-outline-danger' type='rest'>Borrar</button>
                    <button className='btn btn-primary' type='submit'>Consolidar</button>
                </div>
            </form>
        </div>
    )
}

export default Form_Status_Ventas