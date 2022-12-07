import React, {useState, useEffect} from 'react'

function View_Paciente(props) {


const [nombre, setNombre] = useState(props.nombre)


  return (
    <div className="row">
        
        <div className="row d-flex align-items-center mb-4">
          <div className="col-6 text-start px-4">
            <p className="h1 "> <i className="fa-solid fa-tooth me-3"></i>Benavente</p>
          </div>
          <div className="col-6 px-4 text-end">
            <div className="d-flex float-end align-items-center">
              <p className="m-0 me-4">{nombre.nombre} {nombre.aPaterno}</p>
              <button className="btn btn-outline-danger"><i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
          </div>
          <hr />
        </div>

        <div className="row">
          <div class="d-flex align-items-start">
            <div class="nav col-2 flex-column nav-pills me-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">

              <button class="nav-link active text-start" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-solid fa-chart-simple me-2"></i>Resumen</button>
              <button class="nav-link text-start" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i className="fa-solid fa-address-card me-2"></i>Directorio</button>
              <button class="nav-link text-start" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false"><i className="fa-solid fa-calendar-check me-2"></i>Citas</button>
              <button class="nav-link text-start" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i className="fa-solid fa-trophy me-2"></i>Puntos</button>
              <button class="nav-link text-start" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa-solid fa-gear me-2"></i>Settings</button>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                <div className="row text-start">
                  <div className="col-12">
                      <p className="h2 mb-4">Dashboard</p>
                  </div>
                  <div className="col-6">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur cum reprehenderit odit ratione! Dicta voluptatem corrupti a. Magnam molestias dolorem dolorum iste cum delectus repudiandae explicabo. Modi, tempore minus!</p>
                  </div>
                  <div className="col-6">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur cum reprehenderit odit ratione! Dicta voluptatem corrupti a. Magnam molestias dolorem dolorum iste cum delectus repudiandae explicabo. Modi, tempore minus!</p>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">...</div>
              <div class="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">...</div>
              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">...</div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0">...</div>
            </div>
          </div>
        </div>
        </div>
  )
}

export default View_Paciente