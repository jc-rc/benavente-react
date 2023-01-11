import React, { useState } from 'react'
import Table_Citas from './Components/Table_Citas';
import Table_Ventas from './Components/Table_Ventas';
import Table_Usuarios from './Components/Table_Usuarios';
import Test_Comp from './Components/Test_Comp';

function View_Recepcion(props) {


    const [user, setUser] = useState(props.user)
    const [dummy, setDummy] = useState(0)

    const handleSignOut = ()=>{
        console.log("Bye!");
        window.location.reload()
    }
    const handleRefresh = ()=>{
        console.log("Reload!");
        setDummy(dummy=> dummy+1)
        
    }


    return (
        <div className="row">

            <div className="row d-flex align-items-center mb-4">
                <div className="col-6 text-start px-4">
                    <p className="h1 m-0"> <img src="https://www.benaventedental.com.mx/assets/images/logo.svg" className='image-fluid' width={40} height={40} alt="" /> Benavente</p>
                    <p className="small mb-3 fst-italic">Plataforma de Control de Citas</p>
                </div>
                <div className="col-6 px-4 text-end">
                    <div className="d-flex float-end align-items-center">
                        <p className="m-0 me-4">Bienvenido(a), <span className="fw-bold">{user.nombre} {user.aPaterno}</span></p>
                        <button className="btn btn-outline-primary me-3" id='btn-refresh' onClick={handleRefresh}><i className="fa-solid fa-rotate"></i></button>
                        <button className="btn btn-outline-danger" onClick={handleSignOut}><i className="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                </div>
                <hr />
            </div>

            <div className="row gx-1">
                <div className="d-flex align-items-start">
                    <div className="nav col-1 flex-sm-column flex-row nav-pills bg-light py-4 me-3 rounded" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{height:"80vh"}}>

                        <button className="nav-link active text-start p-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-solid fa-chart-simple me-1"></i> Resumen</button>
                        <button className="nav-link text-start p-3" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false"><i className="fa-solid fa-calendar-check me-1"></i> Citas</button>
                        <button className="nav-link text-start p-3" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i className="fa-solid fa-address-card me-1"></i> Directorio</button>
                        <button className="nav-link text-start p-3" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i className="fa-solid fa-dollar-sign me-1"></i> Ventas</button>
                        <button className="nav-link text-start p-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa-solid fa-gear me-1"></i> Opciones</button>
                    </div>
                   
                    <div className="tab-content col bg-light rounded p-4" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                            <div className="row" >
                                <div className="col-12">
                                    <p className="h2 mb-4" >Dashboard</p>
                                </div>
                                <div className="col-2 text-center border p-3">
                                <iframe style={{}} width="100%" height="100%" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=6392f49b-52ab-4463-8d3a-e91db375f7bd&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-2 text-center border p-3">
                                <iframe style={{}} width="100%" height="100%" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=639757cf-6a27-4560-84ec-e16f3e922ce4&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-2 border p-1">
                                <iframe style={{}} width="100%" height="100%" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=63b84f68-f194-48a0-8d10-7f8e538c094a&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-2 border p-1">
                                <iframe style={{}} width="100%" height="100%" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=465f3638-0219-4e5b-8455-7906860583ec&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-2 border p-1">
                                <iframe style={{}} width="100%" height="100%" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=63b84e34-4545-48c6-8fa5-848d95073d89&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-2 border p-1">
                                <iframe style={{}} width="100%" height="100%" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=63bee7ac-14d0-4c0b-8403-ec4c7af59ce1&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-6 border p-1">
                                <iframe style={{}} width="100%" height="350px" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=63b84948-f194-4f39-8fc0-7f8e5386b091&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                                <div className="col-6 border p-1">
                                <iframe style={{}} width="100%" height="350px" src="https://charts.mongodb.com/charts-tutorial-tlnug/embed/charts?id=00b339ba-dfe0-4eb3-98fe-b8b4b739d66f&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                            <div className="row text-start">
                                <div className="col-12">
                                    <Table_Usuarios dummy={dummy}/>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">
                             <div className="row text-start">
                                
                                <div className="col-12">
                                    <Table_Citas dummy={dummy}></Table_Citas>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">
                             <div className="row text-start">
                                <div className="col-12">
                                <Table_Ventas dummy={dummy}/>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0">
                             <div className="row text-start">
                                <div className="col-12">
                                <p className="h2 mb-4">Opciones</p>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default View_Recepcion