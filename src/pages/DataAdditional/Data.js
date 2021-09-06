import {Component} from 'react';
class DataAdditional extends Component{

    componentDidMount(){
        document.getElementById('root').className = 'cv';
    }


    render(){
     return   <><div className="card">
                    <div  className="card-header">Datos adicionales</div>
                </div>
                &nbsp;
                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-pills" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="recreacion-tab" data-bs-toggle="tab" data-bs-target="#recreacion" type="button" role="tab" aria-controls="recreacion" aria-selected="true">Recreaci&oacute;n</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link " id="activity-tab" data-bs-toggle="tab" data-bs-target="#activity" type="button" role="tab" aria-controls="activity" aria-selected="true">Actividades extra</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link " id="otros-tab" data-bs-toggle="tab" data-bs-target="#otros" type="button" role="tab" aria-controls="otros" aria-selected="true">Otros</button>
                            </li>
                        </ul>

                        &nbsp;
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="recreacion" role="tabpanel" aria-labelledby="recreacion-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4">
                                        <label>Mis hobbies</label>
                                        <input className="form-control " type="text" id="hobbies" name="hobbies" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Tiene mascotas&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="mascota" className="btn-check" id="havepets" autoComplete="off"  onChange={() => document.getElementById("mascotacual").removeAttribute('readOnly')  } />
                                                    <label className="btn btn-outline-primary" htmlFor="havepets">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="mascota" className="btn-check" id="havepets2" autoComplete="off" onChange={() => {
                                                        document.getElementById("mascotacual").setAttribute('readOnly','readOnly') 
                                                        document.getElementById("mascotacual").value= ''} } />
                                                    <label className="btn btn-outline-primary" htmlFor="havepets2">NO</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;l&#63;</label>
                                        <input readOnly className="form-control " type="text" id="mascotacual" name="mascotacual" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Realiza actividades de recreaci&oacute;n&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="actirecreacion" className="btn-check" id="realizeSport" autoComplete="off"  onChange={() => document.getElementById("actipractica").removeAttribute('readOnly')  }></input>
                                                    <label className="btn btn-outline-primary" htmlFor="realizeSport">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="actirecreacion" className="btn-check" id="realizeSport2" autoComplete="off"  onChange={() => {
                                                        document.getElementById("actipractica").setAttribute('readOnly','readOnly') 
                                                        document.getElementById("actipractica").value= ''} 
                                                        }/>
                                                    <label className="btn btn-outline-primary" htmlFor="realizeSport2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;l&#63;</label>
                                        <input readOnly className="form-control " type="text" id="actipractica" name="actipractica" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>Frecuencia</label>
                                        <select className="form-select loadDir" name="frecuencia"  id="frecuencia" >
                                            <option value=""></option>
                                            {/* {nomenclaturaComplemento} */}
                                        </select>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>Cu&aacute;l es de tu mayor inter&eacute;s</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="interes" id="interes1"></input>
                                            <label className="form-check-label" htmlFor="interes1">
                                                Deportes
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="interes" id="interes2" ></input>
                                            <label className="form-check-label" htmlFor="interes2">
                                               Maquillaje
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;l&#63;</label>
                                        <input className="form-control " type="text" id="interescual" name="interescual" ></input>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="tab-pane fade " id="activity" role="tabpanel" aria-labelledby="activity-tab">
                                <div className="row">

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Practica alg&uacute;n deporte&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="practiceSport" className="btn-check" id="practiceAny" ></input>
                                                    <label className="btn btn-outline-primary" htmlFor="practiceAny">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="practiceSport" className="btn-check" id="practiceAny2" ></input>
                                                    <label className="btn btn-outline-primary" htmlFor="practiceAny2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Que deportes practicas&#63;</label>
                                        <input className="form-control " type="text" id="acti-practica" name="acti-practica" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Con qu&eacute; frecuencia hace deporte&#63;</label>
                                        <select className="form-select loadDir" name="acti-deportfrecuen"  id="acti-deportfrecuen" >
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;l es su oficio&#63;</label>
                                        <input className="form-control " type="text" id="acti-oficio" name="acti-oficio" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;ntos a&ntilde;os   &#63;</label>
                                        <input className="form-control " type="text" id="acti-practicaTime" name="acti-practicaTime" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Que deportes practicas&#63;</label>
                                        <input className="form-control " type="text" id="acti-practiceSport" name="acti-practiceSport" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Tiene otro trabajo&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="otherjob" className="btn-check" id="btn-check-outlined" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="otherjob" className="btn-check" id="btn-check-outlined2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="btn-check-outlined2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Que trabajo tiene adicional&#63;</label>
                                        <input className="form-control " type="text" id="acti-jobadd" name="acti-jobadd" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Con qu&eacute; frecuencia realiza el trabajo adicional&#63;</label>
                                        <input className="form-control " type="text" id="acti-jobfrecuency" name="acti-jobfrecuency" ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="otros" role="tabpanel" aria-labelledby="otros-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Tiene vehiculo propio&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="haveVehicule" className="btn-check" id="radioHaveVehicule" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioHaveVehicule">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="haveVehicule" className="btn-check" id="radioHaveVehicule2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioHaveVehicule2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Tiene licencia de conduci&oacute;n&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="haveLicense" className="btn-check" id="radioHaveLicense" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioHaveLicense">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="haveLicense" className="btn-check" id="radioHaveLicense2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioHaveLicense2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Qu&eacute; tipo de licencia de tiene&#63;</label>
                                        <select className="form-select" name="typeLicence"  id="typeLicence" >
                                            <option value=""></option>
                                            {/* <!-- {nomenclaturaComplemento} --> */}
                                        </select>
                                    </div>


                                    <div className="col-sm-12 col-md-4">
                                    <label>&#191;Pertence alg&uacute;n grupo social&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="groupSocialñ" className="btn-check" id="radiogroupSocialñ" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiogroupSocialñ">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="groupSocialñ" className="btn-check" id="radiogroupSocialñ2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiogroupSocialñ2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;l &#63;</label>
                                        <input className="form-control " type="text" id="acti-oficioWhich" name="acti-oficioWhich" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Pertence a alguna poblaci&oacute;n especial &#63;</label>
                                        <select className="form-select" name="groupSocial"  id="groupSocial" >
                                            <option value=""></option>
                                            {/* <!-- {nomenclaturaComplemento} --> */}
                                        </select>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Usted ahorra&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="saveMoney" className="btn-check" id="radiosaveMoney" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosaveMoney">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="saveMoney" className="btn-check" id="radiosaveMoney2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosaveMoney2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;En que destina sus ahorros&#63;</label>
                                        <input className="form-control " type="text" id="acti-savemoneyDestiny" name="acti-savemoneyDestiny" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#19;Cu&aacute;ales bienes esta pagando actualmente  &#63;</label>
                                        <select className="form-select" name="otro-bien"  id="otro-bien" >
                                            <option value=""></option>
                                        </select>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Cu&aacute;l bien desea adquirir a corto plazo&#63;</label>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="acquire" id="acquire1"></input>
                                            <label className="form-check-label" htmlFor="acquire1">
                                                Deportes
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="acquire" id="acquire2" ></input>
                                            <label className="form-check-label" htmlFor="acquire2">
                                            Maquillaje
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-12 col-md-4">
                                        <label>&#191;Que beneficio le gustar&iacute; obtener&#63;</label>
                                        <input className="form-control " type="text" id="acti-savemoney" name="acti-savemoney" ></input>
                                    </div>

                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </>
    }



}

export default DataAdditional;