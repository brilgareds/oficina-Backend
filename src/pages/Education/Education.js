import React,{Component} from 'react';
import { baseUrl } from '../../config/config';
import { postData,getData, validateInputTabs, putInputRequerid, loadDataValidate } from '../../components/general/General';
import moment from 'moment';
import Swal from 'sweetalert2';
import {  postFetch } from '../../generalHelpers';


class Education extends Component{

    constructor(){
        super()
        this.state = {
            dataStudy:'',
            dataStateStudy:'',
            dataCountry:'',
            dpto:'',
            valCity:'',
            valCountry:'',
            city:'',
            valDpto:'',
            dataModalidad:'',
            dataPrincipal:'',
            tbody:'',
            setHidden:'hidden'
        }
    }


    componentDidMount(){
        document.getElementById('root').className = 'cv';

        this.loadDataPrincipal();


        // consultar nivel de estudio
        const urlnivel = `${baseUrl}/v1/educacion/consultarNivelEstudio`;
        getData(urlnivel).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataStudy:option});             
            });

            // consultar tipo documento
        const urlestateStudy0 = `${baseUrl}/v1/educacion/consultarEstadoEstudio`;
        getData(urlestateStudy0).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataStateStudy:option});             
        });

        // consultar pais
        const country = `${baseUrl}/v1/informacionBasica/consultarPaises`;
        getData(country).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["cod_pais"]}>{value["nom_pais"]}</option>);
            this.setState({dataCountry:option});
        });

        // consultar modalidad
        const urlModalidad = `${baseUrl}/v1/educacion/consultarModalidadEstudio`;
        getData(urlModalidad).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataModalidad:option});
        });
    }

    loadDpto = () => {
        const codCountry = this.selectCountry.value;
        const datos = {codPais:parseInt(codCountry)};
        this.setState({valCountry:codCountry});
        // consultar departamento
        const urlDpto = `${baseUrl}/v1/informacionBasica/consultaDepartamentos`;
        postData(urlDpto,datos).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["cod_dpto"]}>{value["nom_mpio"]}</option>);
            this.setState({dpto:option}); 
            this.selectDpto.removeAttribute('disabled')  
            this.selectCity.value  = ''
            this.setState({valCity:'',valDpto:''})
            this.selectCity.setAttribute('disabled','disabled')

         });
    }

    validateCity = () =>{
        this.setState({valCity:this.selectCity.value})
    }

    validateDpto = () => {
        this.setState({valDpto:this.selectDpto.value})
        const datos = { codDepartamento:parseInt(this.selectDpto.value),codPais:parseInt(this.selectCountry.value) };
        const url = `${baseUrl}/v1/informacionBasica/consultarCiudades`;
        postData(url,datos).then(result => {

            console.log(result)
            if(!result.error){
                let option = result.map((value,x) => <option  key={x} value={value["cod_mpio"]}>{value["nom_mpio"]}</option>);
                this.setState({city:option});
                this.selectCity.removeAttribute('disabled')
            }else{
                Swal.fire({
                    title: '',
                    text: result.error,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: "#A6A6A6",
                    confirmButtonText: 'Cerrar'
                })
            }
            

        })

    }  

    saveEducation = () =>{

        if( !validateInputTabs('inputRequired')){

            const dataUser = JSON.parse( localStorage.getItem("d_u"));
            const cedula = parseInt(dataUser['cedula'])

            var formData = new FormData();
            formData.append('file',this.filePdf.files[0]?this.filePdf.files[0]:{})
            formData.append('MENU_CODIGO', 2)
            formData.append('INFORMACION_BASICA_CODIGO', cedula)
            formData.append('NIVEL_ESTUDIO', parseInt(this.campo1.value))
            formData.append('TITULO', this.campo2.value)
            formData.append('INSTITUCION', this.campo4.value)
            formData.append('PAI_CODIGO',parseInt(this.selectCountry.value))
            formData.append('DTO_CODIGO',parseInt(this.selectDpto.value)) 
            formData.append('CIUDAD', parseInt(this.selectCity.value) )
            formData.append('ESTADO_ESTUDIO', this.campo3.value)
            formData.append('FECHA_INICIO', this.campo5.value)
            formData.append('FECHA_FINALIZACION', this.campo6.value?this.campo6.value:'')
            formData.append('FECHA_GRADO_TENTATIVO', this.campo7.value?this.campo7.value:'')
            formData.append('MODALIDAD_ESTUDIO',this.campo8.value? parseInt(this.campo8.value):0)
            formData.append('PROMEDIO', this.campo9.value?this.campo9.value:'')


            const urlSave =  `${baseUrl}/v1/educacion/crearRegistro`;
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

    changeInputReadOnly = (data) =>{
        if(data.trim() === 'EN CURSO'){
            console.log("en curso");
            putInputRequerid(`#${this.campo6.id}`,'','remove',this.campo6.id)
            putInputRequerid(`#${this.campo7.id}`,'','add',this.campo7.id)
            putInputRequerid(`#${this.campo8.id}`,'','add',this.campo8.id)
            putInputRequerid(`#${this.campo9.id}`,'','add',this.campo9.id)

        }else if(data.trim() === 'FINALIZADO'){
            this.campo6.removeAttribute("readonly")
            putInputRequerid(`#${this.campo6.id}`,'','add',this.campo6.id)
            putInputRequerid(`#${this.campo7.id}`,'','remove',this.campo7.id)
            putInputRequerid(`#${this.campo8.id}`,'','remove',this.campo8.id)
            putInputRequerid(`#${this.campo9.id}`,'','remove',this.campo9.id)
        }else{
            putInputRequerid(`#${this.campo6.id}`,'','remove',this.campo6.id)
            putInputRequerid(`#${this.campo7.id}`,'','remove',this.campo7.id)
            putInputRequerid(`#${this.campo8.id}`,'','remove',this.campo8.id)
            putInputRequerid(`#${this.campo9.id}`,'','remove',this.campo9.id)
        }
    }

    updateLoadPrincipal = (data,accion) =>{
        this.cleanInputs()
        if(accion === 1){
            this.campo1.value = data.NIVEL_ESTUDIO
            this.campo2.value = data.TITULO
            this.campo3.value = data.ESTADO_ESTUDIO

            this.changeInputReadOnly(data.ESTADO_NOMBRE)

            this.campo4.value = data.INSTITUCION
            this.campo5.value = moment.utc(data.FECHA_INICIO).format('yyyy-MM-DD')
            this.campo6.value = data.FECHA_FINALIZACION?moment.utc(data.FECHA_FINALIZACION).format('yyyy-MM-DD'):''
            this.campo7.value = data.FECHA_GRADO_TENTATIVO?moment.utc(data.FECHA_GRADO_TENTATIVO).format('yyyy-MM-DD'):''
            this.campo8.value = data.MODALIDAD_ESTUDIO?data.MODALIDAD_ESTUDIO:''
            this.campo9.value = data.PROMEDIO?data.PROMEDIO:''
            
            document.getElementById('saveButton').style = 'display:none';
            this.setState({setHidden:''})

            let container = document.querySelector(".inputHiddenEdit");
            container.innerHTML = ''
            let input = document.createElement("input");
            input.setAttribute("type","hidden");
            input.setAttribute("id","idDocument");
            input.setAttribute("value",data.EDUCACION_CODIGO);
            container.appendChild(input); 


            if(data.PAI_CODIGO != null){
                this.selectCountry.value = data.PAI_CODIGO
                this.loadDpto()
                this.selectDpto.removeAttribute('disabled')
                setTimeout(() => {
                    this.setState({valDpto:data.DTO_CODIGO})
                    this.validateDpto();
                    setTimeout(() => {
                        this.selectCity.removeAttribute('disabled')
                        this.setState({valCity:data.CIUDAD})
                    }, 500);

                }, 500);
            }
           

        }else if(accion === 2){
            Swal.fire({
                title: '',
                text: "¿Desea eliminar el registro?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#1783EE",
                cancelButtonColor: "#A6A6A6",
                confirmButtonText: 'Eliminar!',
                cancelButtonText:'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                    const datos = {EDUCACION_CODIGO:data.EDUCACION_CODIGO}

                    const urlSave =  `${baseUrl}/v1/educacion/eliminarRegistro`;
                    postData(urlSave,datos).then(result => {
                        if(result.ok){
                            Swal.fire({
                                title: '',
                                text: "Se elimino con éxito",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: "#A6A6A6",
                                confirmButtonText: 'Cerrar'
                            })
                            this.loadDataPrincipal();
                            document.getElementById('saveButton').style = 'display:block';
                            this.setState({setHidden:'hidden'})
                            document.querySelector(".inputHiddenEdit").innerHTML = '';
                        }
                    })
                }
              })

        }else if(accion === 3){
            window.open(data)
        }
    }

    updateData = () => {
        if(!validateInputTabs()){

                    var formData = new FormData();
                    formData.append('file',this.filePdf.files[0]?this.filePdf.files[0]:{})
                    formData.append('EDUCACION_CODIGO', document.getElementById('idDocument').value)
                    formData.append('NIVEL_ESTUDIO', parseInt(this.campo1.value))
                    formData.append('TITULO', this.campo2.value)
                    formData.append('INSTITUCION', this.campo4.value)
                    formData.append('PAI_CODIGO',parseInt(this.selectCountry.value))
                    formData.append('DTO_CODIGO',parseInt(this.selectDpto.value)) 
                    formData.append('CIUDAD', parseInt(this.selectCity.value) )
                    formData.append('ESTADO_ESTUDIO', this.campo3.value)
                    formData.append('FECHA_INICIO', this.campo5.value)
                    formData.append('FECHA_FINALIZACION', this.campo6.value?this.campo6.value:'')
                    formData.append('FECHA_GRADO_TENTATIVO', this.campo7.value?this.campo7.value:'')
                    formData.append('MODALIDAD_ESTUDIO',this.campo8.value? parseInt(this.campo8.value):0)
                    formData.append('PROMEDIO', this.campo9.value?this.campo9.value:'')


            const urlSave =  `${baseUrl}/v1/educacion/actualizarRegistro`;
            postFetch({url:urlSave,params:formData}).then(result => {

                if(result.ok){
                    document.getElementById('saveButton').style = 'display:block';
                    this.setState({setHidden:'hidden'})
                    document.querySelector(".inputHiddenEdit").innerHTML = '';
        
                    Swal.fire({
                        title: '',
                        text: "Se actualizó con éxito",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#A6A6A6",
                        confirmButtonText: 'Cerrar'
                    })
                    
                }
                this.loadDataPrincipal();
            })
        }


    }

    loadDataPrincipal = () =>{

        this.setState({tbody:''})
        
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const data = {cedula : cedula}
        const urlSave =  `${baseUrl}/v1/educacion/consultarDatosEstudio`;
        this.cleanInputs()

        postData(urlSave,data).then(result => {
            console.log(result);
            if(!result.error){
                const tbodyData = result.map((value,x) =>{
                    let dateIni = value.FECHA_INICIO != null? moment.utc(value.FECHA_INICIO).format('L'):''
                    let dataFin = value.FECHA_FINALIZACION != null ? moment.utc(value.FECHA_FINALIZACION).format('L'):''
                    let icon = value.URL? 'fas fa-file-pdf text-dangerpdf fs-1':'fas fa-file-pdf text-muted fs-1'
                    let disabled = value.URL? false:true

                    return  <tr key={x} >
                                <td className="text-nowrap">{value.TITULO}</td>
                                <td className="text-nowrap">{value.INSTITUCION}</td>
                                <td className="text-nowrap">{value.NIVEL_NOMBRE}</td>
                                <td className="text-nowrap">{value.ESTADO_NOMBRE}</td>
                                <td className="text-nowrap">{dateIni} - {dataFin}</td>
                                <td className="text-center">
                                    <button disabled={disabled} className="btn"  onClick={e  =>this.updateLoadPrincipal(value.URL,3) }><i className={icon}></i></button>
                                </td>
                                <td className="text-center">
                                    <button className="btn"  onClick={ () => this.updateLoadPrincipal(value,1)  }><i className="fas fa-pen-square colorSquare"></i> </button> 
                                    <button className="btn"  onClick={ () => this.updateLoadPrincipal(value,2)  }><i className="fas fa-trash colorTrash"></i> </button>
                                </td>
                            </tr>
                })

                let tabla = <table className="table table-hover table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">T&iacute;tulo obtenido</th>
                                    <th scope="col">Instituci&oacute;n</th>
                                    <th scope="col">Nivel</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Fecha de inicio y finalizaci&oacute;n</th>
                                    <th className="text-center" >Certificado</th>
                                    <th className="text-center" scope="col">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {tbodyData}
                                </tbody>
    
                            </table>
                this.setState({tbody:tabla})
            }else{
                this.setState({tbody:result.error})
            }
            loadDataValidate()

        })
        
    }

    cleanInputs = () => {
        this.campo1.value = ''
        this.campo2.value = ''
        this.campo3.value = ''
        this.campo4.value = ''
        this.campo5.value = ''
        this.campo6.value = ''
        this.campo7.value = ''
        this.campo8.value = ''
        this.campo9.value = ''
        this.setState({valCity:'',valDpto:''})

        this.selectCity.selectedIndex = ''
        this.selectCity.setAttribute('disabled','disabled')
        this.selectDpto.selectedIndex = ''
        this.selectDpto.setAttribute('disabled','disabled')
        this.selectCountry.selectedIndex  = ''
        document.querySelector('#file-upload').value = ''

    }




render(){  
    const {dataStudy,dataStateStudy,valDpto,dpto,valCity,city,dataCountry,dataModalidad,tbody,setHidden} = this.state;


  return  <>
            <div className="card">
                <div className="card-header">Educaci&oacute;n formal</div>
            </div>
            &nbsp;
            <div className="card">
                <div className="card-body">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="educativos" role="tabpanel" aria-labelledby="educativos-tab">
                            <div className="row">
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-study">Nivel de estudio:<span className="text-danger">*</span></label>
                                    <select ref={input => this.campo1 = input} className="form-select inputRequired" id="edu-study" name="edu-study">
                                        <option value=""></option>
                                        {dataStudy}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-title">T&iacute;tulo otorgado:<span className="text-danger">*</span></label>
                                    <input ref={input => this.campo2 = input}  type="text" className="form-control inputRequired" id="edu-title" name="edu-title"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-state">Estado:<span className="text-danger">*</span></label>
                                    <select  ref={input => this.campo3 = input}  className="form-select inputRequired" id="edu-state" name="edu-state" onChange={(e)=> {
                                         this.changeInputReadOnly(e.target[e.target.selectedIndex].text)
                                    }}>
                                        <option value=""></option>
                                        {dataStateStudy}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-institute">Instituci&oacute;n:<span className="text-danger">*</span></label>
                                    <input type="text" ref={input => this.campo4 = input}  className="form-control inputRequired" id="edu-institute" name="edu-institute"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="country">Pa&iacute;s:<span className="text-danger">*</span></label>
                                    <select  ref={inputElement  => this.selectCountry = inputElement} name="country" id="country" className="form-select inputRequired" onChange={() => this.loadDpto()  } >
                                        <option value=""></option>
                                        {dataCountry}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="resi-dpto">Departamento:<span className="text-danger">*</span></label>
                                    <select value={valDpto} ref={inputElement  => this.selectDpto= inputElement} name="resi-dpto" id="resi-dpto" className="form-select inputRequired" onChange={() => this.validateDpto()}>
                                        <option value=""></option>
                                        {dpto}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="resi-city">Ciudad:<span className="text-danger">*</span></label>
                                    <select value={valCity} ref={input => this.selectCity = input} onChange={() => this.validateCity()} name="resi-city" id="resi-city" className="form-select inputRequired">
                                        <option value=""></option>
                                        {city}
                                    </select>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-dateini">Fecha de inicio:<span className="text-danger">*</span></label>
                                    <input ref={input => this.campo5 = input}  type="date" className="form-control datefli inputRequired" id="edu-dateini"  name="edu-dateini"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-datefin">Fecha de finalizaci&oacute;n:</label>
                                    <input type="date" readOnly ref={input => this.campo6 = input}  className="form-control datefli" id="edu-datefin" name="edu-datefin"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-grade">Fecha de grado:</label>
                                    <input type="date" readOnly ref={input => this.campo7 = input}  className="form-control datefli" id="edu-grade" name="edu-grade"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-modal">Modalidad de estudio:</label>
                                    <select disabled className="form-select" ref={input => this.campo8 = input}  id="edu-modal" name="edu-modal">
                                        <option value=""></option>
                                        {dataModalidad}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="edu-average">Promedio:</label>
                                    <input type="text" readOnly  className="form-control" ref={input => this.campo9 = input}  id="edu-average" name="edu-average"></input>
                                </div>
                                <div className="mb-3 col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="file-upload" className="form-label">Certificado de estudio (PDF):</label>
                                    <input className="form-control" ref={el => this.filePdf = el} id="file-upload" name="file-upload" type="file" accept="application/pdf"/>
                                </div>


                                {/* <div className="col-sm-12 col-md-4 pb-4 addinputFile">
                                    <label htmlFor="">Certificado de estudio (PDF):</label>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        Subir archivo
                                    </label>
                                    <input ref={el => this.filePdf = el} id="file-upload" name="file-upload" type="file" accept="application/pdf" />
                                </div>  */}
                            </div>
                            <div className="row pb-4">
                                <p></p>
                                <div className="col d-flex flex-wrap justify-content-end">
                                    <button onClick={() => this.saveEducation()} id="saveButton" className="btn succesButton saveButton">Guardar</button>
                                    <button hidden={setHidden} onClick={() => this.updateData()} id="upButton" className="btn succesButton upButton">Actualizar</button>
                                    <div className="inputHiddenEdit"></div>
                                </div>
                            </div>
                            <p></p>
                            <div className="">
                                <div className="">
                                    <div className="table-responsive scrollbar">
                                        {tbody}
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

export default Education;