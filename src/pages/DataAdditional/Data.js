import {Component} from 'react';
import Swal from 'sweetalert2';
import { getData, loadDataValidate, postData, putInputRequerid, simulateClick, validateInputTabs } from '../../components/general/General';
import { baseUrl } from '../../config/config';
class DataAdditional extends Component{
    constructor(){
        super()
        this.state = {
            buscarDatosFrecuencia:'',
            buscarDatosVehiculos:'',
            dataTypeLicense:'',
            dataCondiEspe:'',
            buscarDatosBienesServicios:'',
            buscarDatosTemasInteres:'',
            buscarDatosBienesServiciosCortoPlazo:'',
            estadonav:'disabled'
        }
    }

    componentDidMount(){
        document.getElementById('root').className = 'cv';
        // consultar  buscarDatosFrecuencia
        const urlEtnia = `${baseUrl}/v1/datosAdicionales/buscarDatosFrecuencia`;
        getData(urlEtnia).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({buscarDatosFrecuencia:option});             
        });

        // consultar  buscarDatosVehiculos
        const urlvehi = `${baseUrl}/v1/datosAdicionales/buscarDatosVehiculos`;
        getData(urlvehi).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({buscarDatosVehiculos:option});             
        });

        // consultar  dataTypeLicense
        const urltypelicense = `${baseUrl}/v1/datosAdicionales/buscarDatosLicenciaConduccion`;
        getData(urltypelicense).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_NOMBRE"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataTypeLicense:option});             
        });

        // consultar  buscarDatosCondicionEspecial
        const urlCondicion = `${baseUrl}/v1/datosAdicionales/buscarDatosCondicionEspecial`;
        getData(urlCondicion).then(result =>{
            let option = result.map((value,x) => {   

            return  <div  key={x} className="form-check">
                    <input className="form-check-input checkServices"  type="checkbox" id={`check${value["TIP_CODIGO"]}`}  value={value["TIP_CODIGO"]} />
                    <label className="form-check-label" htmlFor={`check${value["TIP_CODIGO"]}`}>{value["TIP_NOMBRE"]}</label>
                </div>
                
                }
            );
            this.setState({dataCondiEspe:option});             
        });

        // consultar  buscarDatosBienesServicios
        const urlbuscarDatosBienesServicios = `${baseUrl}/v1/datosAdicionales/buscarDatosBienesServicios`;
        getData(urlbuscarDatosBienesServicios).then(result =>{
            console.log(result);
            let option = result.map((value,x) => {   
            return  <div  key={x} className="form-check">
                    <input className="form-check-input checkServicesBienes"  type="checkbox" id={`check${value["TIP_NOMBRE"]}`}  value={value["TIP_CODIGO"]} />
                    <label className="form-check-label" htmlFor={`check${value["TIP_NOMBRE"]}`}>{value["TIP_NOMBRE"]}</label>
                </div>
                }
            );
            let option2 = result.map((value,x) => {   
                return  <div  key={x} className="form-check">
                        <input className="form-check-input checkServicesBienesCortoPlazo"  type="checkbox" id={`checkCortoPlazo${value["TIP_NOMBRE"]}`}  value={value["TIP_CODIGO"]} />
                        <label className="form-check-label" htmlFor={`checkCortoPlazo${value["TIP_NOMBRE"]}`}>{value["TIP_NOMBRE"]}</label>
                    </div>
                    }
                );
            this.setState({
                buscarDatosBienesServicios:option,
                buscarDatosBienesServiciosCortoPlazo:option2
            });             
        });

        // consultar  buscarDatosTemasInteres
        const urlbuscarDatosTemasInteres = `${baseUrl}/v1/datosAdicionales/buscarDatosTemasInteres`;
        getData(urlbuscarDatosTemasInteres).then(result =>{
            let option = result.map((value,x) => {   
            return  <div  key={x} className="form-check">
                    <input className="form-check-input checkServicesTemas" data-parent={value["TIP_NOMBRE"]}  type="checkbox" id={`checkInteres${value["TIP_NOMBRE"]}`}  value={value["TIP_CODIGO"]} onChange={(e) => {
                        if(e.target.dataset.parent === 'OTROS'){
                            if(e.target.checked ){
                                putInputRequerid(`#${this.cualInteres.id}`,'','add',this.cualInteres.id);
                            }else{
                                putInputRequerid(`#${this.cualInteres.id}`,'','remove',this.cualInteres.id);
                            }
                           
                        }else if(e.target.dataset.parent === 'DEPORTES'){
                            if(e.target.checked ){
                                putInputRequerid(`#${this.sportcualInteres.id}`,'','add',this.sportcualInteres.id);
                            }else{
                                putInputRequerid(`#${this.sportcualInteres.id}`,'','remove',this.sportcualInteres.id);
                            }
                        }
                    }} />
                    <label className="form-check-label" htmlFor={`checkInteres${value["TIP_NOMBRE"]}`}>{value["TIP_NOMBRE"]}</label>
                </div>
                }
            );
            this.setState({buscarDatosTemasInteres:option});             
        });

        this.loadDataPincipal()
    }

    loadDataPincipal = () =>{
        loadDataValidate()

        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])

       const datos = {
            CODIGO_EMPRESA: empresa,
            NRO_DOCUMENTO: cedula
          }

          const urlSave =  `${baseUrl}/v1/datosAdicionales/buscarDatos`;
        postData(urlSave,datos).then(result => {
            console.log(result);

            const datos = result.buscarDatos[0]
            this.hobbies.value =datos.HOBBIES
            this.profesion.value = datos.PROFESION
            this.experienciaNum.value = datos.ANOS_PROFESION?parseInt(datos.ANOS_PROFESION):null
            this.ingresos.value = datos.INGRESOS_ADICIONALES?parseFloat(datos.INGRESOS_ADICIONALES):null
            this.havepet.value = datos.CUAL_MASCOTA
            this.cualFrecuSport.value = datos.CUAL_RECREACION
            this.selectFrecuSport.value = datos.FRECUENCIA_RECREACION
            this.practiceSport.value = datos.CUAL_DEPORTE
            this.practiceSportFrecu.value = datos.FRECUENCIA_DEPORTE
            this.jobAdditional.value = datos.CUAL_OTRO_TRABAJO
            this.jobAdditionalFrecu.value = datos.FRECUENCIA_OTRO_TRABAJO
            this.tipoVehiculo.value = datos.CUAL_VEHICULO
            this.typeLicense.value = datos.LICENCIA_CONDUCCION_TIPO
            this.haveGroupSocial.value = datos.CUAL_GRUPO_SOCIAL
            this.percentMOney.value = datos.PORCENTAJE_AHORRO_SALARIAL
            this.saveMoney.value = datos.DESTINO_AHORROS
            this.cualInteres.value = datos.INTERES_OTRO
            this.beneficio.value = datos.CONVENIOS_ADICIONALES
            this.sportcualInteres.value = datos.DEPORTES_INTERES

            if(datos.INTERES_OTRO){
                putInputRequerid(`#${this.cualInteres.id}`,'','add',this.cualInteres.id);
            }


            if(datos.DEPORTES_INTERES){
                putInputRequerid(`#${this.sportcualInteres.id}`,'','add',this.sportcualInteres.id);
            }

//             this.cualInteres
// this.sportcualInteres

            if(datos.MASCOTA != null){
                if(datos.MASCOTA === 1){
                    document.getElementById('havepets').checked = true
                    putInputRequerid(`#${this.havepet.id}`,'','add',this.havepet.id)
                }else{
                    document.getElementById('havepets2').checked = true
                }
            }

            if(datos.RECREACION != null){
               if( datos.RECREACION === 1 ){
                   document.getElementById('realizeSport').checked = true
                   putInputRequerid(`#${this.cualFrecuSport.id}`,'','add',this.cualFrecuSport.id);
                   putInputRequerid(`#${this.selectFrecuSport.id}`,'','add',this.selectFrecuSport.id);
                }else{
                   document.getElementById('realizeSport2').checked = true
                }
            }

            if(datos.DEPORTE != null){
                if(datos.DEPORTE === 1 ){
                    document.getElementById('practiceAny').checked = true
                    putInputRequerid(`#${this.practiceSport.id}`,'','add',this.practiceSport.id);
                    putInputRequerid(`#${this.practiceSportFrecu.id}`,'','add',this.practiceSportFrecu.id);
                }else{
                    document.getElementById('practiceAny2').checked = true
                }

            }

            if(datos.OTRO_TRABAJO != null){
                if(datos.OTRO_TRABAJO === 1 ){
                    document.getElementById('btn-check-outlined').checked = true
                    putInputRequerid(`#${this.jobAdditional.id}`,'','add',this.jobAdditional.id);
                    putInputRequerid(`#${this.jobAdditionalFrecu.id}`,'','add',this.jobAdditionalFrecu.id);
                }else{
                    document.getElementById('btn-check-outlined2').checked = true
                }
            }
            if(datos.VEHICULO != null){
                if(datos.VEHICULO === 1){
                    document.getElementById('radioHaveVehicule').checked = true
                    putInputRequerid(`#${this.tipoVehiculo.id}`,'','add',this.tipoVehiculo.id);
                }else{
                    document.getElementById('radioHaveVehicule2').checked = true
                }
            }
            if(datos.LICENCIA_CONDUCCION != null){
                datos.LICENCIA_CONDUCCION === 1 ?document.getElementById('radiohaveLicen').checked = true:document.getElementById('radiohaveLicen2').checked = true
                if(datos.LICENCIA_CONDUCCION === 1 ){
                    document.getElementById('radiohaveLicen').checked = true
                    putInputRequerid(`#${this.typeLicense.id}`,'','add',this.typeLicense.id);

                }else{
                    document.getElementById('radiohaveLicen2').checked = true
                }
            }
            if(datos.GRUPO_SOCIAL != null){
                if(datos.GRUPO_SOCIAL === 1){
                    document.getElementById('radiogroupSocial').checked = true
                    putInputRequerid(`#${this.haveGroupSocial.id}`,'','add',this.haveGroupSocial.id);

                }else{
                    document.getElementById('radiogroupSocial2').checked = true
                }
            }
            if(datos.AHORRO != null){
                datos.AHORRO === 1 ?document.getElementById('radiosaveMoney').checked = true:document.getElementById('radiosaveMoney2').checked = true
                if(datos.AHORRO === 1){
                    document.getElementById('radiosaveMoney').checked = true
                    putInputRequerid(`#${this.saveMoney.id}`,'','add',this.saveMoney.id);
                    putInputRequerid(`#${this.percentMOney.id}`,'','add',this.percentMOney.id);

                }else{
                    document.getElementById('radiosaveMoney2').checked = true
                }

            }

            result.arrayIntereses.forEach(element => {
                document.querySelectorAll('.checkServicesTemas').forEach(element2 => {
                    if(parseInt(element.TIP_CODIGO) === parseInt(element2.value)){
                        element2.setAttribute('checked','checked')
                    }
                })
            });

            result.arrayDeudasFuturas.forEach(element => {
                document.querySelectorAll('.checkServicesBienesCortoPlazo').forEach(element2 => {
                    if(parseInt(element.TIP_CODIGO) === parseInt(element2.value)){
                        element2.setAttribute('checked','checked')
                    }
                })
            });

            result.arrayDeudas.forEach(element => {
                document.querySelectorAll('.checkServicesBienes').forEach(element2 => {

                    if(parseInt(element.TIP_CODIGO) === parseInt(element2.value)){
                        element2.setAttribute('checked','checked')
                    }
                })
            });

            result.arrayEspeciales.forEach(element => {
                document.querySelectorAll('.checkServices').forEach(element2 => {
                    if(parseInt(element.TIP_CODIGO) === parseInt(element2.value)){
                        element2.setAttribute('checked','checked')
                    }
                })
            });

        })
    }

    saveDataAdditional = () =>{

        if(!validateInputTabs()){
            const dataUser = JSON.parse( localStorage.getItem("d_u"));
            const cedula = parseInt(dataUser['cedula'])
            const empresa = parseInt(dataUser['empresa'])
            let checkServicesTemas = [];
            var interest = document.querySelectorAll('.checkServicesTemas:checked');
            interest.forEach(element => checkServicesTemas.push(parseInt(element.value)) );
            let checkServicesBienes = [];
            var bienes = document.querySelectorAll('.checkServicesBienes:checked');
            bienes.forEach(element => checkServicesBienes.push(parseInt(element.value)) );
            let checkServicesBienesCortoPlazo = [];
            var cortoplazo = document.querySelectorAll('.checkServicesBienesCortoPlazo:checked');
            cortoplazo.forEach(element => checkServicesBienesCortoPlazo.push(parseInt(element.value)) );
            let checkServices = [];
            var especial = document.querySelectorAll('.checkServices:checked');
            especial.forEach(element => checkServices.push(parseInt(element.value)) );

            const datos = {
                NRO_DOCUMENTO: cedula,
                CODIGO_EMPRESA: empresa,
                HOBBIES:  this.hobbies.value?this.hobbies.value:'',
                PROFESION: this.profesion.value?this.profesion.value:'',
                ANOS_PROFESION: this.experienciaNum.value?parseInt(this.experienciaNum.value):null,
                INGRESOS_ADICIONALES: this.ingresos.value?parseInt(this.ingresos.value):null,
                MASCOTA:document.querySelector('input[name=mascota]:checked')? parseInt(document.querySelector('input[name=mascota]:checked').value.trim()):null,
                CUAL_MASCOTA: this.havepet.value?this.havepet.value:'',
                RECREACION: document.querySelector('input[name=actirecreacion]:checked')? parseInt(document.querySelector('input[name=actirecreacion]:checked').value.trim()):null,
                CUAL_RECREACION: this.cualFrecuSport.value?this.cualFrecuSport.value:'',
                FRECUENCIA_RECREACION: this.selectFrecuSport.value?this.selectFrecuSport.value:'',
                DEPORTE: document.querySelector('input[name=practiceSport]:checked')? parseInt(document.querySelector('input[name=practiceSport]:checked').value.trim()):null,
                CUAL_DEPORTE: this.practiceSport.value?this.practiceSport.value:'',
                FRECUENCIA_DEPORTE: this.practiceSportFrecu.value?this.practiceSportFrecu.value:'',
                OTRO_TRABAJO: document.querySelector('input[name=otherjob]:checked')? parseInt(document.querySelector('input[name=otherjob]:checked').value.trim()):null,
                CUAL_OTRO_TRABAJO: this.jobAdditional.value?this.jobAdditional.value:'',
                FRECUENCIA_OTRO_TRABAJO: this.jobAdditionalFrecu.value?this.jobAdditionalFrecu.value:'',
                VEHICULO: document.querySelector('input[name=haveVehicule]:checked')? parseInt(document.querySelector('input[name=haveVehicule]:checked').value.trim()):null,
                CUAL_VEHICULO: this.tipoVehiculo.value?this.tipoVehiculo.value:'',
                LICENCIA_CONDUCCION: document.querySelector('input[name=haveLicen]:checked')? parseInt(document.querySelector('input[name=haveLicen]:checked').value.trim()):null,
                LICENCIA_CONDUCCION_TIPO: this.typeLicense.value?this.typeLicense.value:'',
                GRUPO_SOCIAL: document.querySelector('input[name=groupSocial]:checked')?parseInt( document.querySelector('input[name=groupSocial]:checked').value.trim()):null,
                CUAL_GRUPO_SOCIAL: this.haveGroupSocial.value?this.haveGroupSocial.value:'',
                AHORRO: document.querySelector('input[name=saveMoney]:checked')? parseInt(document.querySelector('input[name=saveMoney]:checked').value.trim()):null,
                PORCENTAJE_AHORRO_SALARIAL: this.percentMOney.value?parseFloat(this.percentMOney.value):null,
                DESTINO_AHORROS: this.saveMoney.value?this.saveMoney.value:'',
                INTERES_OTRO: this.cualInteres.value?this.cualInteres.value:'',
                CONVENIOS_ADICIONALES: this.beneficio.value?this.beneficio.value:'',
                DEPORTES_INTERES: this.sportcualInteres.value?this.sportcualInteres.value:'',
                arrayCondicionEspecial: checkServices,
                arrayDeudas: checkServicesBienes,
                arrayDeudasFuturas: checkServicesBienesCortoPlazo,
                arrayTemasInteres:checkServicesTemas

            }

            const url = `${baseUrl}/v1/datosAdicionales/actualizarRegistroDatosAdicionales`;

            console.log('datos que envio ',datos);
            
            postData(url,datos).then(result =>{
               if(result.ok){
                Swal.fire({
                    title: '',
                    text: "Se registro con éxito",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#A6A6A6",
                    confirmButtonText: 'Cerrar'
                })


                   this.loadDataPincipal()
               }

            })
        }
            
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
      const {buscarDatosFrecuencia,buscarDatosVehiculos,dataTypeLicense,dataCondiEspe,buscarDatosBienesServicios,buscarDatosBienesServiciosCortoPlazo,buscarDatosTemasInteres,estadonav} = this.state;  

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
                                <button className="nav-link " disabled={estadonav} id="activity-tab" data-bs-toggle="tab" data-bs-target="#activity" type="button" role="tab" aria-controls="activity" aria-selected="true">Actividades extra</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link " disabled={estadonav} id="otros-tab" data-bs-toggle="tab" data-bs-target="#otros" type="button" role="tab" aria-controls="otros" aria-selected="true">Otros</button>
                            </li>
                        </ul>
                        <hr/>
                        &nbsp;
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="recreacion" role="tabpanel" aria-labelledby="recreacion-tab">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>Hobbies</label>
                                        <input ref={inp => this.hobbies = inp} className="form-control " type="text" id="hobbies" name="hobbies" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Tiene mascotas&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="mascota" className="btn-check" id="havepets" autoComplete="off"  onChange={() => putInputRequerid(`#${this.havepet.id}`,'','add',this.havepet.id)} />
                                            <label className="btn btn-outline-primary" htmlFor="havepets">SI</label>&nbsp;
                                            <input  value="0" type="radio" name="mascota" className="btn-check" id="havepets2" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.havepet.id}`,'','remove',this.havepet.id)
                                            } } />
                                            <label className="btn btn-outline-primary" htmlFor="havepets2">NO</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="mascotacual">&#191;Cu&aacute;l&#63;</label>
                                        <input ref={inp => this.havepet = inp} readOnly className="form-control " type="text" id="mascotacual" name="mascotacual" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Realiza actividades de recreaci&oacute;n&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="actirecreacion" className="btn-check" id="realizeSport" autoComplete="off"  onChange={() => {
                                                putInputRequerid(`#${this.cualFrecuSport.id}`,'','add',this.cualFrecuSport.id);
                                                putInputRequerid(`#${this.selectFrecuSport.id}`,'','add',this.selectFrecuSport.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="realizeSport">SI</label>&nbsp;
                                            <input value="0" type="radio" name="actirecreacion" className="btn-check" id="realizeSport2" autoComplete="off"  onChange={() => {
                                                putInputRequerid(`#${this.cualFrecuSport.id}`,'','remove',this.cualFrecuSport.id);
                                                putInputRequerid(`#${this.selectFrecuSport.id}`,'','remove',this.selectFrecuSport.id);
                                            }}/>
                                            <label className="btn btn-outline-primary" htmlFor="realizeSport2">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="actipractica">&#191;Cu&aacute;l es la recreaci&oacute;n&#63;</label>
                                        <input ref={sel => this.cualFrecuSport = sel} readOnly className="form-control " type="text" id="actipractica" name="actipractica" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="frecuencia">Frecuencia de la recreaci&oacute;n</label>
                                        <select disabled ref={sel => this.selectFrecuSport = sel} className="form-select loadDir" name="frecuencia"  id="frecuencia" >
                                            <option value=""></option>
                                            {buscarDatosFrecuencia}
                                        </select>
                                    </div>


                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Qu&eacute; temas son de su inter&eacute;s&#63;</label>
                                        {buscarDatosTemasInteres}
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="interescual">&#191;Cu&aacute;l es el tema de su inter&eacute;s&#63;</label>
                                        <input  ref={inp => this.cualInteres =inp} readOnly className="form-control " type="text" id="interescual" name="interescual" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="interescualSport">&#191;Qu&eacute; deporte es de su inter&eacute;s&#63;</label>
                                        <input  readOnly ref={inp => this.sportcualInteres =inp} className="form-control " type="text" id="interescualSport" name="interescualSport" ></input>
                                    </div>
                                </div>
                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button onClick={() => this.validateInputTabsIn('activity-tab')} className="btn succesButton">Siguiente</button>
                                    </div>
                                </div>
                        
                            </div>
                            <div className="tab-pane fade " id="activity" role="tabpanel" aria-labelledby="activity-tab">
                                <div className="row">

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Practica alg&uacute;n deporte&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="practiceSport" className="btn-check" id="practiceAny"  onChange={() => {
                                                        putInputRequerid(`#${this.practiceSport.id}`,'','add',this.practiceSport.id);
                                                        putInputRequerid(`#${this.practiceSportFrecu.id}`,'','add',this.practiceSportFrecu.id);
                                                 }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="practiceAny">SI</label>&nbsp;
                                            <input value="0" type="radio" name="practiceSport" className="btn-check" id="practiceAny2" onChange={() => {
                                                        putInputRequerid(`#${this.practiceSport.id}`,'','remove',this.practiceSport.id);
                                                        putInputRequerid(`#${this.practiceSportFrecu.id}`,'','remove',this.practiceSportFrecu.id);
                                                    }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="practiceAny2">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="acti-practica">&#191;Que deportes practica&#63;</label>
                                        <input readOnly ref={inp => this.practiceSport =inp} className="form-control " type="text" id="acti-practica" name="acti-practica" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="acti-deportfrecuen">&#191;Con qu&eacute; frecuencia hace deporte&#63;</label>
                                        <select disabled ref={inp => this.practiceSportFrecu =inp} className="form-select loadDir" name="acti-deportfrecuen"  id="acti-deportfrecuen" >
                                            <option value=""></option>
                                            {buscarDatosFrecuencia}
                                        </select>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Cu&aacute;l es su oficio&#63;</label>
                                        <input ref={inp => this.profesion = inp} className="form-control " type="text" id="acti-oficio" name="acti-oficio" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Cu&aacute;ntos a&ntilde;os de experiencia  &#63;</label>
                                        <input ref={inp => this.experienciaNum = inp} className="form-control " type="text" id="acti-practicaTime" name="acti-practicaTime" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>Ingresos adicionales</label>
                                        <input ref={inp => this.ingresos = inp}  className="form-control " type="number" id="acti-practiceSport" name="acti-practiceSport" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Tiene otro trabajo&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1"  type="radio" name="otherjob" className="btn-check" id="btn-check-outlined" autoComplete="off" onChange={() => {
                                                        putInputRequerid(`#${this.jobAdditional.id}`,'','add',this.jobAdditional.id);
                                                        putInputRequerid(`#${this.jobAdditionalFrecu.id}`,'','add',this.jobAdditionalFrecu.id);
                                                 }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">SI</label>&nbsp;
                                            <input value="0" type="radio" name="otherjob" className="btn-check" id="btn-check-outlined2" autoComplete="off" onChange={() => {
                                                        putInputRequerid(`#${this.jobAdditional.id}`,'','remove',this.jobAdditional.id);
                                                        putInputRequerid(`#${this.jobAdditionalFrecu.id}`,'','remove',this.jobAdditionalFrecu.id);
                                                    }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined2">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="acti-jobadd">&#191;Que trabajo tiene adicional&#63;</label>
                                        <input readOnly ref={inpu => this.jobAdditional = inpu} className="form-control " type="text" id="acti-jobadd" name="acti-jobadd" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="acti-jobfrecuency">&#191;Con qu&eacute; frecuencia realiza el trabajo adicional&#63;</label>
                                        <select disabled  ref={inp => this.jobAdditionalFrecu =inp} className="form-select" name="acti-jobfrecuency"  id="acti-jobfrecuency" >
                                            <option value=""></option>
                                            {buscarDatosFrecuencia}
                                        </select>
                                    </div>
                                </div>
                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-start">
                                        <button onClick={() => this.vaidateBack('recreacion-tab')} className="btn succesButton">Atr&aacute;s</button>
                                    </div>
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button onClick={() => this.validateInputTabsIn('otros-tab')} className="btn succesButton">Siguiente</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="otros" role="tabpanel" aria-labelledby="otros-tab">
                               
                               <div className="row">
                                   <div className="col">
                                   <div className="row">
                                    <div className="col-sm-12 col-md-6 pb-4">
                                        <label>&#191;Tiene vehiculo propio&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="haveVehicule" className="btn-check" id="radioHaveVehicule" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.tipoVehiculo.id}`,'','add',this.tipoVehiculo.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radioHaveVehicule">SI</label>&nbsp;
                                            <input value="0" type="radio" name="haveVehicule" className="btn-check" id="radioHaveVehicule2" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.tipoVehiculo.id}`,'','remove',this.tipoVehiculo.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radioHaveVehicule2">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 pb-4">
                                        <label htmlFor="acti-typeVehicule">&#191;Qu&eacute; tipo de veh&iacute;culo&#63;</label>
                                        <select disabled ref={sel => this.tipoVehiculo = sel} className="form-select loadDir" name="acti-typeVehicule"  id="acti-typeVehicule" >
                                            <option value=""></option>
                                            {buscarDatosVehiculos}
                                        </select>                
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 pb-4">
                                        <label>&#191;Tiene licencia de conducci&oacute;n&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="haveLicen" className="btn-check" id="radiohaveLicen" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.typeLicense.id}`,'','add',this.typeLicense.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiohaveLicen">SI</label>&nbsp;
                                            <input  value="0" type="radio" name="haveLicen" className="btn-check" id="radiohaveLicen2" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.typeLicense.id}`,'','remove',this.typeLicense.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiohaveLicen2">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 pb-4">
                                        <label htmlFor="typeLicense">&#191;Qu&eacute; tipo de licencia de tiene&#63;</label>
                                        <select ref={sel => this.typeLicense = sel} disabled className="form-select" name="typeLicense"  id="typeLicense" >
                                            <option value=""></option>
                                            {dataTypeLicense}
                                        </select>
                                    </div>

                                </div>
                                <div className="row">


                                    <div className="col-sm-12 col-md-6 pb-4">
                                    <label>&#191;Pertence alg&uacute;n grupo social&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="groupSocial" className="btn-check" id="radiogroupSocial" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.haveGroupSocial.id}`,'','add',this.haveGroupSocial.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiogroupSocial">SI</label>&nbsp;
                                            <input value="0" type="radio" name="groupSocial" className="btn-check" id="radiogroupSocial2" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.haveGroupSocial.id}`,'','remove',this.haveGroupSocial.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiogroupSocial2">No</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 pb-4">
                                        <label htmlFor="acti-oficioWhich">&#191;Cu&aacute;l es el grupo al que pertenece &#63;</label>
                                        <input readOnly ref={input => this.haveGroupSocial = input} className="form-control " type="text" id="acti-oficioWhich" name="acti-oficioWhich" ></input>
                                    </div>

                                    </div>
                                
                                   </div>
                                   <div className="col-4">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>&#191;Pertence a alguna poblaci&oacute;n especial &#63;</label>
                                                    {dataCondiEspe}
                                            </div>
                                        </div>
                                   </div>
                               </div>
                               
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Usted ahorra&#63;</label>
                                        <div className="d-flex justify-content-around">
                                            <input value="1" type="radio" name="saveMoney" className="btn-check" id="radiosaveMoney" autoComplete="off" onChange={() => {
                                                putInputRequerid(`#${this.saveMoney.id}`,'','add',this.saveMoney.id);
                                                putInputRequerid(`#${this.percentMOney.id}`,'','add',this.percentMOney.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiosaveMoney">SI</label>&nbsp;
                                            <input value="0" type="radio" name="saveMoney" className="btn-check" id="radiosaveMoney2" autoComplete="off" onChange={() => {
                                               putInputRequerid(`#${this.saveMoney.id}`,'','remove',this.saveMoney.id);
                                               putInputRequerid(`#${this.percentMOney.id}`,'','remove',this.percentMOney.id);
                                            }}></input>
                                            <label className="btn btn-outline-primary" htmlFor="radiosaveMoney2">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="acti-savemoneyDestiny">&#191;En que destina sus ahorros&#63;</label>
                                        <input readOnly ref={input => this.saveMoney = input} className="form-control " type="text" id="acti-savemoneyDestiny" name="acti-savemoneyDestiny" ></input>
                                    </div>
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label htmlFor="acti-percentMOney">&#191;Qu&eacute; % ahorra de su salario&#63;</label>
                                        <input readOnly ref={input => this.percentMOney = input} className="form-control " type="text" id="acti-percentMOney" name="acti-percentMOney" ></input>
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Cu&aacute;les bienes/serivicios est&aacute; pagando actualmente&#63;</label>
                                            {buscarDatosBienesServicios}
                                    </div>

                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Cu&aacute;les bienes/serivicios desea adquirir a corto plazo&#63;</label>
                                            {buscarDatosBienesServiciosCortoPlazo}
                                    </div>
   
                                    
                                    <div className="col-sm-12 col-md-4 pb-4">
                                        <label>&#191;Qu&eacute; convenio le gustar&iacute;a obtener de la empresa&#63;</label>
                                        <input ref={inp => this.beneficio = inp} className="form-control " type="text" id="acti-savemoney" name="acti-savemoney" ></input>
                                    </div>

                                </div>
                                <div className="row pb-4 flex">
                                    <div className="col d-flex flex-wrap justify-content-start">
                                        <button onClick={() => this.vaidateBack('activity-tab')} className="btn succesButton">Atr&aacute;s</button>
                                    </div>
                                    <div className="col d-flex flex-wrap justify-content-end">
                                        <button onClick={() => this.saveDataAdditional()} className="btn succesButton">Guardar</button>
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