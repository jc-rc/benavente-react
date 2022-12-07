
import './App.css';
import View_Paciente from './View_Paciente';
import { useState } from 'react';
import View_Medic from './View_Medic';
import View_Recepcion from './View_Recepcion';


function App() {

  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [currentUser, setCurrentUser] = useState(null)
  const [exists, setExists] = useState(true)


  const handleSubmit = (e)=>{
    e.preventDefault()

    //Enviar datos a validar
    console.log(user);

    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/benavente-jinwz/endpoint/validateUser?username=${user.username}&password=${user.password}`)
      .then(response => response.json())
      .then(response => {
        if (response.length === 0) {
          //En caso de error; generar alerta o Toast?
          console.log("Empty!")
          setExists(false)
        } else {


          //En caso de éxito; asignar currentUser 
          setCurrentUser(response[0])

        }
      }


      )
    
    
    
  }

  const handleUsernameChange = (e) =>{
    setUser({...user, username: e.target.value})
    setExists(true)
  }
  const handlePasswordChange = (e) =>{
    setUser({...user, password: e.target.value})
    setExists(true)
  }

  return (

    <div className="container-fluid p-4">

      { !currentUser && <div className="container border" style={{maxWidth: 600}}>
        <div className="row">
          <form action="" onSubmit={handleSubmit}>
            <div className="col-12">
              <p className='h2'>Bienvenido a Benavente</p>
            </div>
            <div className='col-12'>
              <label className='form-label' htmlFor="">Usuario</label>
              <input className='form-control mb-3' type="text" name="" onChange={handleUsernameChange} required value={user.username}/>
            </div>
            <div className='col-12'>
              <label className='form-label' htmlFor="">Contraseña</label>
              <input className='form-control mb-3' type="password" name=""  onChange={handlePasswordChange} required value={user.password}/>
            </div>
            {!exists && <div className="alert alert-danger" role="alert">
              <p className="m-0 fw-bold"><i className="fa-solid fa-triangle-exclamation me-2"></i>Credenciales Inválidas</p>
              <p className="m-0 small">Por favor revise los datos ingresados</p>
            </div>}

            <button className='btn btn-primary'>Ingresar</button>
          </form>
        </div>    

      </div>}

      {(currentUser) && (currentUser.role === "PACIENTE") && <View_Paciente nombre={currentUser.nombre}/> }
      {(currentUser) && (currentUser.role === "MÉDICO") && <View_Medic nombre={currentUser.nombre}/> }
      {(currentUser) && (currentUser.role === "EMPLEADO") && <View_Recepcion nombre={currentUser.nombre}/> }
       
     

    </div>
    

  );
}

export default App;
