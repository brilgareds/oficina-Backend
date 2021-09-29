import {Component,Fragment} from 'react';
import { getData, loadDataValidate, postData, putInputRequerid, simulateClick, validateInputTabs } from '../../components/general/General';
import fotoW from '../../assets/img/cv/reporte-embarazo.jpg';
import { baseUrl } from '../../config/config';
import Swal from 'sweetalert2';
import moment from 'moment';
import { postFetch } from '../../generalHelpers';

class Salud extends Component{
    constructor(props){
        super(props)
        this.state ={
            seePregnancy:'hidden',
            dataGroupBlood:'',
            dataFactor:'',
            dataEtnia:'',
            dataPlanSalud:'',
            estadonav:'disabled',
            sexo:''
        }
    }

    componentDidMount(){
        document.getElementById('root').className = 'cv';



        // consultar grupo sanquineo
        const urlGroup = `${baseUrl}/v1/salud/buscarDatosGrupoSanguineo`;
        getData(urlGroup).then(result =>{
            let option = result.map((value,x) =>{
            let required = x === 0 ? 'btn-check inputRequired':'btn-check'
            return  <Fragment key={x}>
                        <input type="radio" className={required}    name="gruposanguineo" value={value.TIP_NOMBRE} id={`#btn-check${x}`} autoComplete="off"></input>
                        <label className="btn btn-outline-primary" htmlFor={`#btn-check${x}`}>{value.TIP_NOMBRE}</label>&nbsp;
                        </Fragment>
            });
            this.setState({dataGroupBlood:option});             
        });

        // consultar grupo sanquineo
        const urlFactor = `${baseUrl}/v1/salud/buscarDatosFactor`;
        getData(urlFactor).then(result =>{
            let option = result.map((value,x) =>{
            let required = x === 0 ? 'btn-check inputRequired':'btn-check'
            return  <Fragment key={x}>
                        <input type="radio" className={required} name="datosfactor" value={value.TIP_NOMBRE} id={`#btn-checkfactor${x}`} autoComplete="off"></input>
                        <label className="btn btn-outline-primary" htmlFor={`#btn-checkfactor${x}`}>{value.TIP_NOMBRE}</label>&nbsp;
                        </Fragment>
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
                let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
                this.setState({dataPlanSalud:option});                    
        });

        this.loadDataPrincipal();

    }   

    seePregnancyTab = (response) =>{
        this.setState({estadonav:''})
        if(response){
            simulateClick('pregnancy-tab',0,'click')
            setTimeout(() => {
                this.setState({estadonav:'disabled'})
            }, 500);
            putInputRequerid('input[name=haveDangerPregnancyF]','','add','haveDangerPregnancyF')
            putInputRequerid(`#${this.dateexam.id}`,'','add',this.dateexam.id)
            putInputRequerid(`#${this.tiempogesta.id}`,'','add',this.tiempogesta.id)
            putInputRequerid(`#${this.dateprobably.id}`,'','add',this.dateprobably.id)
            this.setState({seePregnancy:''})
            simulateClick('pregnancy-tab',0,'click');
        }else{
            this.setState({seePregnancy:'hidden'})
            putInputRequerid('input[name=haveDangerPregnancyF]','','remove','haveDangerPregnancyF')
            putInputRequerid(`#${this.dateexam.id}`,'','remove',this.dateexam.id)
            putInputRequerid(`#${this.tiempogesta.id}`,'','remove',this.tiempogesta.id)
            putInputRequerid(`#${this.dateprobably.id}`,'','remove',this.dateprobably.id)
            simulateClick('characteristic-tab',0,'click');
             setTimeout(() => {
                this.setState({estadonav:'disabled'})
            }, 500);
        }
    }

    saveDataPrincipal = () =>{

        if(!validateInputTabs()){
          
                const dataUser = JSON.parse( localStorage.getItem("d_u"));
                const cedula = parseInt(dataUser['cedula'])
                const empresa = parseInt(dataUser['empresa'])  
            
                let formData = new FormData();
                formData.append("EMPRESA", empresa)
                formData.append("NRO_DOCUMENTO", cedula)
                formData.append("GRUPO_SANGUINEO", document.querySelector('input[name=gruposanguineo]:checked')? document.querySelector('input[name=gruposanguineo]:checked').value.trim():'')
                formData.append("FACTOR", document.querySelector('input[name=datosfactor]:checked')? document.querySelector('input[name=datosfactor]:checked').value.trim():'')
                formData.append("ESTATURA", this.estatura.value.toString().trim())
                formData.append("PESO", this.peso.value.toString().trim())
                formData.append("RAZA", this.raza.value.trim())
                formData.append("FUMADOR", document.querySelector('input[name=smoke]:checked')? document.querySelector('input[name=smoke]:checked').value.trim():'')
                formData.append("BEBEDOR", document.querySelector('input[name=licor]:checked')? document.querySelector('input[name=licor]:checked').value.trim():'')
                formData.append("ANTEOJOS", document.querySelector('input[name=anteojosF]:checked')? document.querySelector('input[name=anteojosF]:checked').value.trim():'')
                formData.append("ENFERMEDADES", this.sicks.value.trim())
                formData.append("RESTRICCIONES_MEDICAS", this.restri.value.trim())
                formData.append("FRECUENCIA_ASISTENCIA_MEDICA", this.fredocotr.value.trim())
                formData.append("SUFRE_ALERGIAS", document.querySelector('input[name=typeAlergyF]:checked')? document.querySelector('input[name=typeAlergyF]:checked').value:'')
                formData.append("ALERGIAS", this.alergias.value.trim())
                formData.append("CONTACTO_EMERGENCIA",this.contact.value.trim())
                formData.append("NUMERO_CONTACTO_EMERGENCIA", this.numbercontact.value.trim())
                formData.append("ENFERMEDAD_LABORAL", document.querySelector('input[name=sickCalificateF]:checked')? document.querySelector('input[name=sickCalificateF]:checked').value:'')
                formData.append("PERDIDA_CAPACIDAD_SALUD", this.percent.value?parseInt(this.percent.value):null)
                formData.append("PLAN_SALUD_NO_EPS", document.querySelector('input[name=planSalud]:checked')? document.querySelector('input[name=planSalud]:checked').value:'')
                formData.append("PLAN_SALUD", this.planhave.value)
                formData.append("PLAN_SALUD_OTROS",this.planhaveother.value)
                formData.append("ENTIDAD_OTROS", this.entity.value)
                formData.append("EMBARAZO_ALTO_RIESGO", document.querySelector('input[name=haveDangerPregnancyF]:checked')? parseInt(document.querySelector('input[name=haveDangerPregnancyF]:checked').value):null)
                formData.append("FECHA_EXAMEN_EMBARAZO", this.dateexam.value)
                formData.append("TIEMPO_GESTACION", this.tiempogesta.value?parseInt(this.tiempogesta.value):null)
                formData.append("FECHA_PARTO", this.dateprobably.value)
                formData.append("OBSERVACION", this.observa.value.trim())
                formData.append('file',this.file.files[0]?this.file.files[0]:{})



                const urlSave =  `${baseUrl}/v1/salud/crearRegistroSalud`;
                postFetch({url:urlSave,params:formData}).then(result => {
                    
                if(result.ok){
                    Swal.fire({
                        title: '',
                        text: "Se registro con éxito",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#A6A6A6",
                        confirmButtonText: 'Cerrar'
                    })
                    this.loadDataPrincipal();
                }
            })
        }
    }

    loadDataPrincipal = () => {
        
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa']) 
        this.setState({sexo:dataUser.genero})

        const datos = {
            "cedula": cedula,
            "empresa": empresa
          }

        const urlSave =  `${baseUrl}/v1/salud/buscarDatos`;
        postData(urlSave,datos).then(result => {
            
            result.forEach(element => {
                
                this.estatura.value = element.ESTATURA?element.ESTATURA.trim():''
                this.peso.value = element.PESO?element.PESO.trim():''
                this.raza.value = element.RAZA?element.RAZA.trim():''
                this.sicks.value = element.ENFERMEDADES?element.ENFERMEDADES.trim():''
                this.restri.value = element.RESTRICCIONES_MEDICAS?element.RESTRICCIONES_MEDICAS.trim():''
                this.fredocotr.value = element.FRECUENCIA_ASISTENCIA_MEDICA?element.FRECUENCIA_ASISTENCIA_MEDICA.trim():''
                this.alergias.value = element.ALERGIAS?element.ALERGIAS.trim():''
                this.contact.value = element.CONTACTO_EMERGENCIA?element.CONTACTO_EMERGENCIA.trim():''
                this.numbercontact.value = element.NUMERO_CONTACTO_EMERGENCIA?element.NUMERO_CONTACTO_EMERGENCIA.trim():''
                this.percent.value = element.PERDIDA_CAPACIDAD_SALUD? parseInt(element.PERDIDA_CAPACIDAD_SALUD):''
                this.planhave.value = element.PLAN_SALUD?element.PLAN_SALUD.trim():''
                this.planhaveother.value = element.PLAN_SALUD_OTROS?element.PLAN_SALUD_OTROS.trim():''
                this.entity.value = element.ENTIDAD_OTROS?element.ENTIDAD_OTROS.trim():''
                
                this.dateexam.value = moment.utc(element.FECHA_EXAMEN_EMBARAZO).format('yyyy-MM-DD') 
                this.tiempogesta.value = element.TIEMPO_GESTACION
                this.dateprobably.value = moment.utc(element.FECHA_PARTO).format('yyyy-MM-DD') 
                this.observa.value = element.OBSERVACION


                if(element.EMBARAZO_ALTO_RIESGO != null){
                    this.setState({seePregnancy:''})
                    document.getElementById('radioPregnancy').checked = true
                   if( element.EMBARAZO_ALTO_RIESGO === 1 ){
                    document.getElementById('radiohaveDangerPregnancy').checked = true
                   }else{
                    document.getElementById('radiohaveDangerPregnancy2').checked = true

                   }
                }else{
                    document.getElementById('radioPregnancy2').checked = true
                }

                if(element.SUFRE_ALERGIAS != null){
                    if( element.SUFRE_ALERGIAS === 'S' ){ 
                        document.getElementById('radiotypeAlergy').checked = true
                        putInputRequerid('#diag-allergy','','add','diag-allergy')
                    }else{
                        document.getElementById('radiotypeAlergy2').checked = true
                    }
                    
                }
                if(element.ANTEOJOS != null){
                    element.ANTEOJOS === 'S' ?document.getElementById('radioanteojos').checked = true:document.getElementById('radioanteojos2').checked = true
                }
                if(element.ENFERMEDAD_LABORAL != null){
                    if(element.ENFERMEDAD_LABORAL === 'S'){
                        document.getElementById('radiosickCalificate').checked = true
                        putInputRequerid('#diag-percent','','add','diag-percent')
                       }else{
                        document.getElementById('radiosickCalificate2').checked = true
                    }
                }
                if(element.BEBEDOR != null){
                    element.BEBEDOR === 'S' ?document.getElementById('radioLicor').checked = true:document.getElementById('radioLicor2').checked = true
                }
                if(element.FUMADOR != null){
                    element.FUMADOR === 'S' ?document.getElementById('radiosmoke').checked = true:document.getElementById('radiosmoke2').checked = true
                }

                if(element.PLAN_SALUD != null){
                    putInputRequerid('#diag-entity','','add','diag-entity')
                    putInputRequerid('#comp-planHave','','add','comp-planHave')
                    if(element.PLAN_SALUD_OTROS != null){
                        this.planhaveother.value = element.PLAN_SALUD_OTROS
                        putInputRequerid(`#${this.planhaveother.id}`,'','add',this.planhaveother.id)
                    }

                    if(element.PLAN_SALUD_NO_EPS === null){
                        document.getElementById('radioPlansalud').checked = true
                    }
                }


                if(element.PLAN_SALUD_NO_EPS != null){
                    if(element.PLAN_SALUD_NO_EPS === 'S') {
                        document.getElementById('radioPlansalud').checked = true
                        putInputRequerid('#diag-entity','','add','diag-entity')
                        putInputRequerid('#comp-planHave','','add','comp-planHave')

                        if(element.PLAN_SALUD_OTROS != null){
                            this.planhaveother.value = element.PLAN_SALUD_OTROS
                            putInputRequerid(`#${this.planhaveother.id}`,'','add',this.planhaveother.id)
                        }
                    }else{
                        document.getElementById('radioPlansalud2').checked = true
                    }
                }
                if(element.FACTOR != null){
                    const grup = element.FACTOR.trim()
                    document.getElementsByName('datosfactor').forEach(element => {
                        if(element.value.trim() === grup){
                            element.setAttribute('checked','checked')
                        }
                    });
                }
                if(element.GRUPO_SANGUINEO != null){
                    const grup = element.GRUPO_SANGUINEO.trim()
                    document.getElementsByName('gruposanguineo').forEach(element => {
                        if(element.value === grup){
                            element.setAttribute('checked','checked')
                        }
                    });
                }

            });

            loadDataValidate()
  
        })

    }

    validateInputTabsIn = (tab) => {
        let valtab =  validateInputTabs(tab)
        if(valtab === ''){
            this.setState({estadonav:''})
            simulateClick(tab,0,'click')
            setTimeout(() => {
                this.setState({estadonav:'disabled'})
            }, 500);
        }
    }



   

    vaidateBack =(tabidentificador) =>{
        this.setState({estadonav:''})
        simulateClick(tabidentificador,0,'click')
        setTimeout(() => {
            this.setState({estadonav:'disabled'})
        }, 500);
    }

    render(){

        const {seePregnancy,dataGroupBlood,dataFactor,dataEtnia,dataPlanSalud,estadonav,sexo} = this.state;

        return<>
        
                <div className="card">
                    <div  className="card-header">Salud</div>
                </div>
                &nbsp;
                <div className="card">
                    <img className="card" hidden={seePregnancy}  src={fotoW} alt="" />
                    <div className="card-body">
                        <ul className="nav nav-pills" id="myTab" role="tablist">
                            <li  className="nav-item" role="presentation">
                                <button disabled={estadonav}   className="nav-link active " id="sick-tab" data-bs-toggle="tab" data-bs-target="#sick" type="button" role="tab" aria-controls="sick" aria-selected="true">Diagn&oacute;stico de enfermedades</button>
                            </li>
                            <li   className="nav-item" role="presentation">
                                <button  disabled={estadonav} className="nav-link " id="complementary-tab" data-bs-toggle="tab" data-bs-target="#complementary" type="button" role="tab" aria-controls="complementary" aria-selected="true">Salud complementaria</button>
                            </li>
                           
                            <li  hidden={seePregnancy} className="nav-item " role="presentation">
                                <button disabled={estadonav} className="nav-link " id="pregnancy-tab" data-bs-toggle="tab" data-bs-target="#pregnancy" type="button" role="tab" aria-controls="pregnancy" aria-selected="true">Reporte de embarazo</button>
                            </li>
                            
                            <li readOnly className="nav-item" role="presentation">
                                <button disabled={estadonav} className="nav-link readONly" id="characteristic-tab" data-bs-toggle="tab" data-bs-target="#characteristic" type="button" role="tab" aria-controls="characteristic" aria-selected="true">Caracter&iacute;sticas f&iacute;sicas y m&aacute;s</button>
                            </li>
                        </ul>
                        <hr/>
                        &nbsp;
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="sick" role="tabpanel" aria-labelledby="sick-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="diag-padece">&#191;Padece alguna enfermedad&#63; &#191;Cu&aacute;l&#63;<span className="text-danger">*</span></label>
                                            <input ref={inp => this.sicks = inp}  type="text" className="form-control inputRequired" id="diag-padece" name="diag-padece"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Escriba sus restricciones m&eacute;dicas</label>
                                        <input ref={inp => this.restri = inp} type="text" className="form-control" id="diag-restriccion" name="diag-restriccion"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >&#191;Con qu&eacute; frecuencia asiste al m&eacute;dico&#63;</label>
                                        <input ref={inp => this.fredocotr = inp} type="text" className="form-control" id="diag-frecuency" name="diag-frecuency"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="radiotypeAlergy">&#191;Sufre alg&uacute;n tipo de alergia&#63;</label>
                                        <div className=" d-flex justify-content-around ">
 
                                            <input type="radio" value="S" onChange={() => {
                                                putInputRequerid('#diag-allergy','textselectdate','add','diag-allergy')
                                            
                                            }}  name="typeAlergyF" className="btn-check" id="radiotypeAlergy" autoComplete="off"></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiotypeAlergy">SI</label>&nbsp;
                                            <input type="radio" value="N" onChange={() => {
                                                                            putInputRequerid('#diag-allergy','textselectdate','remove','diag-allergy')
                                                                        }}
                                                    name="typeAlergyF" className="btn-check" id="radiotypeAlergy2" autoComplete="off"></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiotypeAlergy2">No</label>
                                           
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-allergy" >&#191;Qu&eacute; alergia tiene&#63;</label>
                                        <input ref={inp => this.alergias = inp}  readOnly type="text" className="form-control" id="diag-allergy" name="diag-allergy"></input>
                                    </div>

                                    </div>
                                <div className="row">

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Tiene una enfermedad laboral calificada&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                          
                                            <input type="radio" value="S" onChange={() => putInputRequerid('#diag-percent','textselectdate','add','diag-percent') }  name="sickCalificateF" className="btn-check" id="radiosickCalificate" autoComplete="off"></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiosickCalificate">SI</label>&nbsp;
                                            <input type="radio" value="N" onChange={() => {
                                                putInputRequerid('#diag-percent','textselectdate','remove','diag-percent')
                                                                     
                                                                        }} name="sickCalificateF" className="btn-check" id="radiosickCalificate2" autoComplete="off"></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiosickCalificate2">NO</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-percent" >&#37; de p&eacute;rdida de capacidad laboral</label>
                                        <input  ref={inp => this.percent = inp} readOnly type="number" min="0" max="100" className="form-control" id="diag-percent" name="diag-percent"></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Usa anteojos&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                                    <input type="radio" name="anteojosF" value="S" className="btn-check" id="radioanteojos" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioanteojos">SI</label>&nbsp;
                                                    <input type="radio" value="N" name="anteojosF" className="btn-check" id="radioanteojos2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioanteojos2">NO</label>

                                        </div>
                                    </div>                             
                                </div>
                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button   onClick={() => this.validateInputTabsIn('complementary-tab')     } className="btn succesButton">Siguiente</button>
                                        {/* <button   onClick={() => simulateClick('parent-tab',0,'click')} className="btn succesButton">Siguiente</button> */}
                                    </div>
                                </div>



                            </div>
                            <div className="tab-pane fade " id="complementary" role="tabpanel" aria-labelledby="complementary-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Plan de salud diferente a la Eps&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                                    <input value="S" type="radio" onChange={() => {
                                                                        putInputRequerid('#diag-entity','textselectdate','add','diag-entity')
                                                                        putInputRequerid('#comp-planHave','textselectdate','add','comp-planHave')

                                                                            }} name="planSalud" className="btn-check" id="radioPlansalud" autoComplete="off" />
                                                    <label className="btn btn-outline-primary" htmlFor="radioPlansalud">SI</label>&nbsp;
                                                    <input value="N" type="radio" name="planSalud" className="btn-check" id="radioPlansalud2" autoComplete="off" onChange={() => {

                                                                                    putInputRequerid('#diag-entity','textselectdate','remove','diag-entity')
                                                                                    putInputRequerid('#comp-planHave','textselectdate','remove','comp-planHave')
                                                                                    putInputRequerid(`#${this.planhaveother.id}`,'','remove',this.planhaveother.id)
                                                                                    
                                                                                }} />
                                                    <label className="btn btn-outline-primary" htmlFor="radioPlansalud2">NO</label>
                                        </div>
                                    </div>  
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label  htmlFor="comp-planHave">&#191;Cu&aacute;l plan tiene&#63;</label>
                                        <select ref={inp =>this.planhave = inp} disabled className="form-select" name="comp-planHave"  id="comp-planHave" onChange={e => {
                                                                                    const input = e.target.value
                                                                                    if(input === 'O'){
                                                                                        this.planhaveother.removeAttribute('readOnly')
                                                                                        putInputRequerid(`#${this.planhaveother.id}`,'','add',this.planhaveother.id)
                                                                                    }else{
                                                                                        putInputRequerid(`#${this.planhaveother.id}`,'','remove',this.planhaveother.id)
                                                                                    }
                                                                                        }} >
                                            <option value=""></option>
                                            {dataPlanSalud}
                                        </select>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-other">Si respondio otro, indique &#191;Cu&aacute;l es &#63;</label>
                                        <input ref={inp => this.planhaveother = inp} readOnly type="text" className="form-control" id="diag-other" name="diag-other"></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-entity" >&#191;Con qu&eacute; entidad lo tiene&#63;</label>
                                        <input ref={inp => this.entity = inp} readOnly type="text" className="form-control" id="diag-entity" name="diag-entity"></input>
                                    </div>

                                    <div   hidden={sexo ==='M'?'hidden':''}  className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="pregnancyF">&#191;Est&aacute;s en embarazo&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                                    <input type="radio" name="pregnancyF" value="1" className="btn-check" id="radioPregnancy" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" onClick={() => this.seePregnancyTab(true)} htmlFor="radioPregnancy">SI</label>&nbsp;
                                                    <input type="radio" name="pregnancyF" value="0" className="btn-check" id="radioPregnancy2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" onClick={() => this.seePregnancyTab(false)} htmlFor="radioPregnancy2">No</label>
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
                                        <label >Nombre de su contacto de emergencia:</label>
                                        <input ref={inp => this.contact = inp} type="text" className="form-control" id="comp-contactEmer" name="comp-contactEmer"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Tel&eacute;fono del contacto de emergencia:</label>
                                        <input ref={inp => this.numbercontact = inp} type="text" className="form-control" id="comp-contacNumber" name="comp-contacNumber"></input>
                                    </div>
                                </div>
                                                                                                                            
                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-start">
                                        <button onClick={() => this.vaidateBack('sick-tab')} className="btn succesButton">Atr&aacute;s</button>
                                    </div>
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button onClick={() => {
                                            let seePreg = !seePregnancy? 'pregnancy-tab':'characteristic-tab'
                                            this.validateInputTabsIn(seePreg) 
                                            }} className="btn succesButton">Siguiente</button>
                                        {/* <button onClick={() => simulateClick('report-tab',0,'click')} className="btn succesButton">Siguiente</button> */}
                                    </div>
                                </div>
                            </div>
                            <div hidden={seePregnancy} className="tab-pane fade " id="pregnancy" role="tabpanel" aria-labelledby="pregnancy-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="haveDangerPregnancyF">&#191;Tienes embarazo de alto riesgo&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                                    <input type="radio" name="haveDangerPregnancyF"  value="1" className="btn-check" id="radiohaveDangerPregnancy" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiohaveDangerPregnancy">SI</label>&nbsp;
                                                    <input type="radio" name="haveDangerPregnancyF" value="0" className="btn-check" id="radiohaveDangerPregnancy2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiohaveDangerPregnancy2">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-dateExamen">&#191;Fecha de entrega del examen de embarazo&#63;</label>
                                        <input ref={inp => this.dateexam = inp} type="date" className="form-control" id="diag-dateExamen" name="diag-dateExamen"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-timeweek">Tiempo de gestaci&oacute;n (SEMANAS)</label>
                                        <input ref={inp => this.tiempogesta = inp} type="number" min={1} max={9} className="form-control" id="diag-timeweek" name="diag-timeweek"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="diag-dateApro">&#191;Fecha probable del parto</label>
                                        <input ref={inp => this.dateprobably = inp} type="date" className="form-control" id="diag-dateApro" name="diag-dateApro"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Observaci&oacute;n</label>
                                        <input ref={inp => this.observa = inp} type="text" className="form-control" id="diag-obser" name="diag-obser"></input>
                                    </div>

                                    {/* <div className="col-sm-12 col-md-4 pb-4">
                                        <label >Resultado de la prueba de embarazo</label>
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            <i className="text-danger far fa-file-pdf"></i> Subir archivo
                                        </label>
                                        <input ref={el => this.file = el} id="file-upload" name="file-upload" type="file" accept="application/pdf" />


                                    </div> */}

                                    <div className="mb-3 col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="file-upload" className="form-label">Resultado de la prueba de embarazo</label>
                                        <input className="form-control" ref={el => this.file = el} id="file-upload" name="file-upload" type="file" accept="application/pdf"/>
                                    </div>



                                </div>
                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-start">
                                        <button onClick={() => this.vaidateBack('complementary-tab')} className="btn succesButton">Atr&aacute;s</button>
                                    </div>
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button onClick={() => this.validateInputTabsIn('characteristic-tab') } className="btn succesButton">Siguiente</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="characteristic" role="tabpanel" aria-labelledby="characteristic-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label  htmlFor="gruposanguineo">Grupo sangu&iacute;neo<span className="text-danger">*</span></label>
                                        <div className=" d-flex justify-content-around">
                                            {dataGroupBlood}
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="datosfactor">Factor<span className="text-danger">*</span></label>
                                        <div className=" d-flex justify-content-around">
                                            {dataFactor}
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label  htmlFor="carac-height">Estatura<span className="text-danger">*</span></label>
                                        <input ref={inp => this.estatura = inp} type="number" className="form-control inputRequired" id="carac-height" name="carac-height"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="carac-weight" >Peso<span className="text-danger">*</span></label>
                                        <input ref={inp => this.peso = inp} type="number" className="form-control inputRequired" id="carac-weight" name="carac-weight"></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="carac-etnia">Grupo &eacute;tnico<span className="text-danger">*</span></label>
                                        <select ref={inp => this.raza = inp}  className="form-select inputRequired" name="carac-etnia"  id="carac-etnia" >
                                            <option value=""></option>
                                            {dataEtnia}
                                        </select>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Consume licor&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                                    <input type="radio" name="licor" value="S" className="btn-check" id="radioLicor" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioLicor">SI</label>&nbsp;
                                                    <input type="radio" name="licor" value="N" className="btn-check" id="radioLicor2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radioLicor2">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Fuma&#63;</label>
                                        <div className=" d-flex justify-content-around">
                                                    <input type="radio" name="smoke" value="S" className="btn-check" id="radiosmoke" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosmoke">SI</label>&nbsp;
                                                    <input type="radio" name="smoke" value="N" className="btn-check" id="radiosmoke2" autoComplete="off"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="radiosmoke2">No</label>
                                        </div>
                                    </div>
                                                                    
                                </div>

                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-start">
                                        <button onClick={() =>{

                                            let seePreg = !seePregnancy? 'pregnancy-tab':'complementary-tab'
                                            

                                            this.vaidateBack(seePreg)
                                             
                                             }} className="btn succesButton">Atr&aacute;s</button>
                                    </div>
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button onClick={() => this.saveDataPrincipal()} className="btn succesButton">Guardar</button>
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