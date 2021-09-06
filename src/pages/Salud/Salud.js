import {Component} from 'react';
import { getData, simulateClick } from '../../components/general/General';
import fotoW from '../../assets/img/cv/reporte-embarazo.jpg';
import { baseUrl } from '../../config/config';

class Salud extends Component{
    constructor(props){
        super(props)
        this.state ={
            seePregnancy:'hidden',
            dataGroupBlood:'',
            dataFactor:'',
            dataEtnia:'',
            dataPlanSalud:''
        }
    }

    componentDidMount(){
        document.getElementById('root').className = 'cv';

        // consultar grupo sanquineo
        const urlGroup = `${baseUrl}/v1/salud/buscarDatosGrupoSanguineo`;
        getData(urlGroup).then(result =>{
            let option = result.map((value,x) =>{
            return  <>
                        <input type="radio" className="btn-check" name="gruposanguineo" value={value.TIP_NOMBRE} id={`#btn-check${x}`} autoCompleteomplete="off"></input>
                        <label className="btn btn-outline-primary" htmlFor={`#btn-check${x}`}>{value.TIP_NOMBRE}</label>&nbsp;
                        </>
            });
            this.setState({dataGroupBlood:option});             
        });

        // consultar grupo sanquineo
        const urlFactor = `${baseUrl}/v1/salud/buscarDatosFactor`;
        getData(urlFactor).then(result =>{
            let option = result.map((value,x) =>{
            return  <>
                        <input type="radio" class="btn-check" name="datosfactor" value={value.TIP_NOMBRE} id={`#btn-checkfactor${x}`} autocomplete="off"></input>
                        <label class="btn btn-outline-primary" htmlFor={`#btn-checkfactor${x}`}>{value.TIP_NOMBRE}</label>&nbsp;
                        </>
            });
            this.setState({dataFactor:option});             
        });

        // consultar  grupo etnico
        const urlEtnia = `${baseUrl}/v1/salud/buscarDatosRaza`;
        getData(urlEtnia).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_NOMBRE"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataEtnia:option});             
        });

        // consultar plan salud
        const urlPlan = `${baseUrl}/v1/salud/buscarDatosPlanSalud`;
        getData(urlPlan).then(result =>{
                let option = result.map((value,x) => <option  key={x} value={value["TIP_NOMBRE"]}>{value["TIP_NOMBRE"]}</option>);
                this.setState({dataPlanSalud:option});                    
        });

    }   

    seePregnancyTab = (response) =>{
        if(response){
            this.setState({seePregnancy:''})
            simulateClick('pregnancy-tab',0,'click');
        }else{
            this.setState({seePregnancy:'hidden'})
            simulateClick('characteristic-tab',0,'click');
        }
    }

    render(){

        const {seePregnancy,dataGroupBlood,dataFactor,dataEtnia,dataPlanSalud} = this.state;

        return<>
        
                <div className="card">
                    <div  className="card-header">Salud</div>
                </div>
                &nbsp;
                <div className="card">
                    <img hidden={seePregnancy}  src={fotoW} alt="" />
                    <div className="card-body">
                        <ul className="nav nav-pills" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="sick-tab" data-bs-toggle="tab" data-bs-target="#sick" type="button" role="tab" aria-controls="sick" aria-selected="true">Diagn&oacute;stico de enfermedades</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link " id="complementary-tab" data-bs-toggle="tab" data-bs-target="#complementary" type="button" role="tab" aria-controls="complementary" aria-selected="true">Salud complementaria</button>
                            </li>
                           
                            <li hidden={seePregnancy} className="nav-item " role="presentation">
                                <button className="nav-link " id="pregnancy-tab" data-bs-toggle="tab" data-bs-target="#pregnancy" type="button" role="tab" aria-controls="pregnancy" aria-selected="true">Reporte de embarazo</button>
                            </li>
                            
                            <li className="nav-item" role="presentation">
                                <button className="nav-link " id="characteristic-tab" data-bs-toggle="tab" data-bs-target="#characteristic" type="button" role="tab" aria-controls="characteristic" aria-selected="true">Caracter&iacute;sticas f&iacute;sicas y h&aacute;s</button>
                            </li>
                        </ul>

                        &nbsp;
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="sick" role="tabpanel" aria-labelledby="sick-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                    <label>&#191;Padece alguna enfermedad&#63; &#191;Cu&aacute;l&#63;</label>
                                            <input type="text" className="form-control" id="diag-padece" name="diag-padece"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Escriba sus restricciones m&eacute;dicas</label>
                                        <input type="text" className="form-control" id="diag-restriccion" name="diag-restriccion"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Con qu&eacute; frecuencia asiste al m&eacute;dico&#63;</label>
                                        <input type="text" className="form-control" id="diag-frecuency" name="diag-frecuency"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Sufre alg&uacute;n tipo de alergia&#63;</label>
                                        <div className="input-group d-flex justify-content-around d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" onChange={() => document.getElementById("diag-allergy").removeAttribute('readOnly')  }  name="typeAlergyF" className="btn-check" id="radiotypeAlergy" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiotypeAlergy">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" onChange={() => {
                                                                                    const input =  document.getElementById("diag-allergy")
                                                                                    input.setAttribute('readOnly','readOnly')
                                                                                    input.value= ''
                                                                                }}
                                                         name="typeAlergyF" className="btn-check" id="radiotypeAlergy2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiotypeAlergy2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Qu&eacute; alergia tiene&#63;</label>
                                        <input readOnly type="text" className="form-control" id="diag-allergy" name="diag-allergy"></input>
                                    </div>

                                    </div>
                                    <div className="row">

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Tiene una enfermedad laboral calificada&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" onChange={() => document.getElementById("diag-percent").removeAttribute('readOnly')  }  name="sickCalificateF" className="btn-check" id="radiosickCalificate" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosickCalificate">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" onChange={() => {
                                                                                    const input =  document.getElementById("diag-percent")
                                                                                    input.setAttribute('readOnly','readOnly')
                                                                                    input.value = ''
                                                                                }} name="sickCalificateF" className="btn-check" id="radiosickCalificate2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosickCalificate2">NO</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#37; de p&eacute;rdida de capacidad  de salud</label>
                                        <input readOnly type="number" className="form-control" id="diag-percent" name="diag-percent"></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Usa anteojos&#63;</label>
                                        <div className="input-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="anteojosF" className="btn-check" id="radioanteojos" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioanteojos">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="anteojosF" className="btn-check" id="radioanteojos2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioanteojos2">NO</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>                             
                                </div>




                            </div>
                            <div className="tab-pane fade " id="complementary" role="tabpanel" aria-labelledby="complementary-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Plan de salud diferente a la EPS&#63;</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" onChange={() => {
                                                                            const entity = document.getElementById("diag-entity")
                                                                            const other = document.getElementById("diag-other")
                                                                            const input =  document.getElementById("comp-planHave")
                                                                            input.removeAttribute('disabled')
                                                                            entity.removeAttribute('readOnly') 
                                                                            other.setAttribute('readOnly','readOnly')
                                                                            entity.value= ''
                                                                            other.value = ''
                                                                            input.value= ''
                                                                            // document.getElementById("diag-other")
                                                                            }} name="planSalud" className="btn-check" id="radioPlansalud" autoComplete="off" />
                                                    <label className="btn btn-outline-primary" htmlFor="radioPlansalud">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="planSalud" className="btn-check" id="radioPlansalud2" autoComplete="off" onChange={() => {
                                                                                    const input =  document.getElementById("comp-planHave")
                                                                                    const entity = document.getElementById("diag-entity")
                                                                                    const other = document.getElementById("diag-other")
                                                                                    entity.setAttribute('readOnly','readOnly')
                                                                                    other.setAttribute('readOnly','readOnly')
                                                                                    input.setAttribute('disabled','disabled')
                                                                                    entity.value= ''
                                                                                    other.value = ''                                                                                    
                                                                                    input.value = ''
                                                                                    
                                                                                }} />
                                                    <label className="btn btn-outline-primary" htmlFor="radioPlansalud2">NO</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>  
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Cu&aacute;l plan tiene&#63;</label>
                                        <select disabled className="form-select" name="comp-planHave"  id="comp-planHave" onChange={e => {
                                                                                                                            const input = e.target.value
                                                                                                                            const other = document.getElementById("diag-other")
                                                                                                                            if(input === 'OTROS POLIZAS'){
                                                                                                                                other.removeAttribute('readOnly')
                                                                                                                            }else{
                                                                                                                                other.setAttribute('readOnly','readOnly')
                                                                                                                                other.value = ''
                                                                                                                            }

                                                                                                                                }} >
                                            <option value=""></option>
                                            {dataPlanSalud}
                                        </select>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Si respondio otro, indique &#191;Cu&aacute;l es &#63;</label>
                                        <input readOnly type="text" className="form-control" id="diag-other" name="diag-other"></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Con qu&eacute; entidad lo tiene&#63;</label>
                                        <input readOnly type="text" className="form-control" id="diag-entity" name="diag-entity"></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Est&aacute;s en embarazoa&#63;</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="pregnancyF" className="btn-check" id="radioPregnancy" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" onClick={() => this.seePregnancyTab(true)} htmlFor="radioPregnancy">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="pregnancyF" className="btn-check" id="radioPregnancy2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" onClick={() => this.seePregnancyTab(false)} htmlFor="radioPregnancy2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                </div>
                                &nbsp;
                                <div className="row">
                                    <h5 className="text-primary">Contacto de emergencia</h5>
                                    &nbsp;
                                    <hr></hr>
                                    &nbsp;
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Nombre de su contacto de emergencia</label>
                                        <input type="text" className="form-control" id="comp-contactEmer" name="comp-contactEmer"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Tel&eacute;fono del contacto de emergencia</label>
                                        <input type="text" className="form-control" id="comp-contacNumber" name="comp-contacNumber"></input>
                                    </div>
                                </div>

                            </div>
                            <div hidden={seePregnancy} className="tab-pane fade " id="pregnancy" role="tabpanel" aria-labelledby="pregnancy-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Tienes embarazo de alto riesgo&#63;</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="haveDangerPregnancyF" className="btn-check" id="radiohaveDangerPregnancy" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiohaveDangerPregnancy">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="haveDangerPregnancyF" className="btn-check" id="radiohaveDangerPregnancy2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiohaveDangerPregnancy2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Fecha de entrega del examen de embarazo&#63;</label>
                                        <input type="date" className="form-control" id="diag-dateExamen" name="diag-dateExamen"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Tiempo de gestaci&oacute;n (SEMANAS)</label>
                                        <input type="number" className="form-control" id="diag-dateExamen" name="diag-dateExamen"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Fecha probable del parto</label>
                                        <input type="date" className="form-control" id="diag-dateApro" name="diag-dateApro"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Observaci&oacute;n</label>
                                        <input type="text" className="form-control" id="diag-dateExamen" name="diag-dateExamen"></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Resultado de la prueba de embarazo</label>
                                        <input type="file" className="form-control" id="diag-fileExamen" name="diag-fileExamen"></input>
                                    </div>



                                </div>

                            </div>
                            <div className="tab-pane fade " id="characteristic" role="tabpanel" aria-labelledby="characteristic-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Grupo sangu&iacute;neo</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            {dataGroupBlood}
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Factor</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            {dataFactor}
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Estatura</label>
                                        <input type="text" className="form-control" id="carac-height" name="carac-height"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Peso</label>
                                        <input type="text" className="form-control" id="carac-weight" name="carac-weight"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>Grupo &eacute;tnico</label>
                                        <select className="form-select" name="carac-etnia"  id="carac-etnia" >
                                            <option value=""></option>
                                            {dataEtnia}
                                        </select>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Consume licor&#63;</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="licor" className="btn-check" id="radioLicor" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioLicor">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="licor" className="btn-check" id="radioLicor2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioLicor2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Fuma&#63;</label>
                                        <div className="nput-group d-flex justify-content-around">
                                            <div className="row">
                                                <div className="col">
                                                    <input type="radio" name="smoke" className="btn-check" id="radiosmoke" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosmoke">SI</label>
                                                </div>
                                                <div className="col">
                                                    <input type="radio" name="smoke" className="btn-check" id="radiosmoke2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosmoke2">No</label>
                                                </div>
                                            </div>                                       
                                        </div>
                                    </div>
                                                                    
                                </div>

                            </div>

                        </div>
                        
                    </div>
                </div>

        </>
    }


}

export default Salud;