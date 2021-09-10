import {Component,Fragment} from 'react';
import { baseUrl } from '../../config/config';
import { postData,getData, simulateClick, validateInputSelect, validateRadioButtons } from '../../components/general/General';
import moment from 'moment';
import Swal from 'sweetalert2';
class Family extends Component{
    constructor(props){
        super(props)
        this.state = {
            seeView:false,
            tipDocu:'',
            dataStudy:'',
            dpto:'',
            dirFinal:'',
            city:'',
            country:'',
            nomenclaturaStreet:'',
            nomenclaturaBis:'',
            alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"],
            nomenclaturaCardinalidad:'',
            nomenclaturaComplemento:'',
            dataRelationship:'',
            typeIncapa:'',
            dataFamiliy: '',
            dataActividad:'',
            valCountry:'',
            valDpto: '',
            valCity:''
        }
    }

    componentDidMount(){
        // 
        document.getElementById('root').className = 'cv';

       this.loadDataPrincipal()

        // consultar tipo documento
        const tipoDocu = `${baseUrl}/v1/informacionBasica/consultarTipDocumento`;
        getData(tipoDocu).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({tipDocu:option});             
        });
        // consultar nivel de estudio
        const urlNivel = `${baseUrl}/v1/educacion/consultarNivelEstudio`;
        getData(urlNivel).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataStudy:option});             
        });

        // consultar pais
        const country = `${baseUrl}/v1/informacionBasica/consultarPaises`;
        getData(country).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["cod_pais"]}>{value["nom_pais"]}</option>);
            this.setState({country:option});
         });

         // consultar nomenclatura
        const urlnomen = `${baseUrl}/v1/informacionBasica/consultarNomenclatura`;
        getData(urlnomen).then(result =>{
             let option = result.arrayCalle.map((value,x) => <option  key={x} value={value["COD_NOME"]}>{value["NOM_NOME"]}</option>);
             this.setState({nomenclaturaStreet:option});

             let option2 = result.arrayBis.map((value,x) => <option  key={x} value={value["COD_NOME"]}>{value["NOM_NOME"]}</option>);
             this.setState({nomenclaturaBis:option2})

             let option3 = result.arrayCardinalidad.map((value,x) => <option  key={x} value={value["COD_NOME"]}>{value["NOM_NOME"]}</option>);
             this.setState({nomenclaturaCardinalidad:option3})

             let option4 = result.arrayComplemento.map((value,x) => <option  key={x} value={value["COD_NOME"]}>{value["NOM_NOME"]}</option>);
             this.setState({nomenclaturaComplemento:option4})
             
         });


        //  consultar tipo relacion
        const urlTipoRel = `${baseUrl}/v1/familiar/consultarTipoRelacion`;
        getData(urlTipoRel).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataRelationship:option});
            
        });

        // consultar discapacidad
        const urlTipIncapa = `${baseUrl}/v1/familiar/consultarDiscapacidad`;
        getData(urlTipIncapa).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({typeIncapa:option});
            
        });

        //consultar actividad
        const urlActivity = `${baseUrl}/v1/familiar/consultarActividad`;
        getData(urlActivity).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataActividad:option});
            
        });

        
        
    }

    validarState = (result) =>{
        

        if(!result){
            this.props.history.push('/cv/DATOS_ADICIONALES');
        }else{
            this.setState({seeView:result})

            setTimeout(() =>{  
                simulateClick('registers-tab',0,'click')
            },500)
            
        }
    }

    loadDpto = () => {
        const codCountry = this.selectCountry.value;
        const datos = {codPais:parseInt(codCountry)};
       this.setState({
           valCountry:codCountry,
        });
        // consultar departamento
        const urlDpto = `${baseUrl}/v1/informacionBasica/consultaDepartamentos`;
        postData(urlDpto,datos).then(result =>{
            console.log("result ",result);
            let option = result.map((value,x) => <option  key={x} value={value["cod_dpto"]}>{value["nom_mpio"]}</option>);
            this.setState({dpto:option});             
         });
    }

    clearAddress = () => {
        this.inputAddressFinal.value = '';
        this.setState({dirFinal:''});

        this.campo1.value= '';
        this.campo2.value= '';
        this.campo3.value= '';
        this.campo4.value= '';
        this.campo5.value= '';
        this.campo6.value= '';
        this.campo7.value= '';
        this.campo8.value= '';
        this.campo9.value= '';
        this.campo10.value= '';
        this.campo11.value= '';
        this.campo12.value= '';
    }

    validateDpto = () => {
        this.setState({valDpto:this.selectDpto.value})
        const datos = { codDepartamento:parseInt(this.selectDpto.value) };
        const url = `${baseUrl}/v1/informacionBasica/consultarCiudades`;
        postData(url,datos).then(result => {
            let option = result.map((value,x) => <option  key={x} value={value["cod_mpio"]}>{value["nom_mpio"]}</option>);
            this.setState({city:option});
        })
    }  

    loadAddress = () =>{
        let dirAppend = ''
         if(this.campo1.value){ dirAppend += this.campo1.value+' ';  }
         if(this.campo2.value){ dirAppend += this.campo2.value+' ';  }
         if(this.campo3.value){ dirAppend += this.campo3.value+' ';  }
         if(this.campo4.value){ dirAppend += this.campo4.value+' ';  }
         if(this.campo5.value){ dirAppend += this.campo5.value+' ';  }
         if(this.campo6.value){ dirAppend += this.campo6.value+' ';  }
         if(this.campo7.value){ dirAppend += this.campo7.value+' ';  }
         if(this.campo8.value){ dirAppend += this.campo8.value+' ';  }
         if(this.campo9.value){ dirAppend += this.campo9.value+' ';  }
         if(this.campo10.value){ dirAppend += this.campo10.value+' ';  }
         if(this.campo11.value){ dirAppend += this.campo11.value+' ';  }
         if(this.campo12.value){ dirAppend += this.campo12.value+' ';  }
        
         this.setState({dirFinal: dirAppend.trim()});
         this.inputAddressFinal.value = dirAppend.trim();
    }

    calculaEdad = (fecha,fecha_nac) => {
        var a = moment(fecha);
        var b = moment(fecha_nac);
        var years = a.diff(b, 'year');
        b.add(years, 'years');
        document.getElementById("iden-age").value = years;
    }    

    updateLoadPrincipal = (data,num) => { 
        if(num === 1){
            simulateClick('identity-tab',0,'click')
            console.log(data);
            this.campos1.value = data.NOM_FAMI
            this.campos2.value = data.APE_FAMI
            if(data.SEX_FAMI === 'F'){
                document.getElementById('option1').checked = true
            }else if(data.SEX_FAMI === 'M'){
                document.getElementById('option2').checked = true
            }

            this.campos3.value = data.TIP_IDEN
            this.campos4.value = data.COD_FAMI
            this.campos4.setAttribute("readonly",'readonly')
            this.campos5.value = moment(data.FEC_NACI).format('yyyy-MM-DD')

            this.calculaEdad(moment(),moment(data.FEC_NACI));

            this.campos7.value = data.GRA_ESCO?data.GRA_ESCO:''
            this.campos8.value = data.TIP_RELA

            if(data.FAM_DEPE === 'S'){
                document.getElementById('econo1').checked = true
            }else if(data.FAM_DEPE === 'N'){
                document.getElementById('econo2').checked = true
            }

            if(data.FAMILIAR_IN_HOME === 'S'){
                document.getElementById('livewith1').checked = true
            }else if(data.FAMILIAR_IN_HOME === 'N'){
                document.getElementById('livewith2').checked = true
            }

            if(data.PARTICIPAR_ACTIV === 'S'){
                document.getElementById('play1').checked = true
            }else if(data.PARTICIPAR_ACTIV === 'N'){
                document.getElementById('play2').checked = true
            }
            this.campos9.value = data.TRA_ESTU?data.TRA_ESTU:''
            this.campos10.value = data.HOB_FAMI?data.HOB_FAMI:''
            this.eps.value = data.BEN_EEPS === 'S' ? this.eps.checked = true :this.eps.checked = false
            this.caja.value = data.BEN_CACO === 'S'? this.caja.checked = true :this.caja.checked = false

            if(data.EST_DISC === 'S'){
                document.getElementById('discapacidad1').checked = true
                this.campos14.removeAttribute('disabled');
                this.campos14.value = data.TIP_DISC?data.TIP_DISC:''
            }else if(data.EST_DISC === 'N'){
                document.getElementById('discapacidad2').checked = true
            }

            if(data.CONTACTO_EMER === 'S'){
                document.getElementById('contactEmergy1').checked = true
                this.campos13.removeAttribute('disabled')
                this.campos13.value = data.TEL_FAMI
            }else{
                document.getElementById('contactEmergy2').checked = true
            }

            this.setState({
                valCountry:data.PAI_FAMI,
                valDpto: data.DTO_FAMI,
                valCity:data.MPI_FAMI
            })
            simulateClick(this.selectCountry.id,0,'change')
            simulateClick(this.selectDpto.id,1000,'change')
            simulateClick(this.selectCity.id,2000,'change')

            this.inputAddressFinal.value = data.DIR_FAMI

        }else if(num === 2){
            Swal.fire({
                title: '',
                text: "¿Desea eliminar el familiar?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#2c7be5',
                cancelButtonColor: '#2c7be5',
                confirmButtonText: 'Eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    const datos = {COD_FAMI:parseInt(data.COD_FAMI)}

                    console.log(datos)
                    console.log(result)

                    const urlSave =  `${baseUrl}/v1/familiar/eliminarFamiliaresIndividual`;
                    postData(urlSave,datos).then(result => {
                        if(result.ok){
                            Swal.fire({
                                title: '',
                                text: "Se elimino con éxito",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#2c7be5',
                                confirmButtonText: 'Cerrar'
                            })
                            this.loadDataPrincipal();
                            // document.getElementById('saveButton').style = 'display:block';
                            // this.setState({setHidden:'hidden'})
                            // document.querySelector(".inputHiddenEdit").innerHTML = '';
                        }
                    })
                }
              })
        }
    
    }
    
    loadDataPrincipal = () =>{
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])
        const datos = {
            COD_EMPL: cedula,
            COD_EMPR: empresa
          };

          // consultar familiares
        const urlconsultaFamily = `${baseUrl}/v1/familiar/consultarFamiliares`;
        postData(urlconsultaFamily,datos).then(result =>{
            console.log("result ",result);

            if(result.error){
                this.setState({dataFamiliy:result.error}); 
            }else{
                let option = result.map((value,x) => {
                        return <Fragment key={x}>
                            <tr  >
                                <td className="text-nowrap">{value.NOM_FAMI} {value.APE_FAMI}</td>
                                <td className="text-nowrap">{value.TEL_FAMI}</td>
                                <td className="text-center">
                                    <button className="btn"  onClick={ () => this.updateLoadPrincipal(value,1)  }><i  className="far fa-edit text-primary fs-1" /> </button> 
                                    <button className="btn"  onClick={ () => this.updateLoadPrincipal(value,2)  }><i  className="far fa-trash-alt text-danger fs-1" /> </button>
                                </td>
                            </tr>
                        </Fragment>
                         
                    });
    
                
                  let tabla = <table className="table table-hover table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th className="text-center" >Nombres completo</th>
                                    <th className="text-center" ># de contacto</th>
                                    <th className="text-center" >Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {option}
                                </tbody>
    
                            </table>
                this.setState({dataFamiliy:tabla});    
            }
         
         });
    }

    saveDataFamily = ()  =>{
        const validateData = validateInputSelect('famlilyRequired')
        const validaContactEmergy = validateRadioButtons('contactEmergy')
        const validaDepende = validateRadioButtons('discapacidad')
        const validaSexo = validateRadioButtons('options')
        // const validaLife = validateRadioButtons('life')
        const validaEconoDepnde = validateRadioButtons('econo')
        const validaViveWith = validateRadioButtons('livewith')
        const validaParticipa = validateRadioButtons('play')

        if(validateData > 0  || validaContactEmergy  === 0 || validaDepende === 0 || validaSexo === 0 ||  validaEconoDepnde  === 0 || validaViveWith === 0 || validaParticipa === 0){
            Swal.fire({
                title: '',
                text: "Validar campos obligatorios",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#2c7be5',
                confirmButtonText: 'Cerrar'
            })
        }else{
            const campos1 = this.campos1.value?this.campos1.value:'';
            const campos2 = this.campos2.value?this.campos2.value:'';
            const campos3 = this.campos3.value?this.campos3.value:'';
            const campos4 = this.campos4.value?this.campos4.value:'';
            const campos5 = this.campos5.value?this.campos5.value:'';
          //  const campos6 = this.campos6.value?this.campos6.value:'';
            const campos7 = this.campos7.value?this.campos7.value:'';
            const campos8 = this.campos8.value?this.campos8.value:'';
            const dedicaFamiliar = this.campos9.value?this.campos9.value:'';
            const campos10 = this.campos10.value?this.campos10.value:'';
           
            const contacEmergency = document.querySelector('input[name=contactEmergy]:checked').value
        
            const campos13 = this.campos13.value?this.campos13.value:'';
            const dir = this.inputAddressFinal.value
            const sex = document.querySelector('input[name=options]:checked').value
            // const vive = document.querySelector('input[name=life]:checked').value
            const depende = document.querySelector('input[name=econo]:checked').value
            const viveconel = document.querySelector('input[name=livewith]:checked').value
            const presentadiscapacidad = document.querySelector('input[name=discapacidad]:checked').value
            const play = document.querySelector('input[name=play]:checked').value
            const tipoDiscapaci = parseInt(this.campos14.value?this.campos14.value:0)
    
            const selectCountry = this.selectCountry.value?this.selectCountry.value:''
            const selectDpto = this.selectDpto.value?this.selectDpto.value:''
            const selectCity = this.selectCity.value?this.selectCity.value:''
    
            const dataUser = JSON.parse( localStorage.getItem("d_u"));
            const cedula = parseInt(dataUser['cedula'])
            const empresa = parseInt(dataUser['empresa'])
    
            const beneficiarioEPS = document.getElementById("checkEPS").checked?'S':'N';
            const beneficiarioCaja = document.getElementById("checkcAJA").checked?'S':'N';
    
    
            const datos = {
                "COD_EMPL": cedula,
                "COD_EMPR": empresa,
                "TIP_IDEN": campos3,
                "COD_FAMI": parseInt(campos4),
                "NOM_FAMI": campos1,
                "APE_FAMI": campos2,
                "TIP_RELA": campos8,
                "SEX_FAMI": sex,
                "FEC_NACI": campos5,
                "EST_VIDA": 'S',
                "FAM_DEPE": depende,
                "EST_DISC": presentadiscapacidad,
                "TIP_DISC": (tipoDiscapaci),
                "CONTACTO_EMER": contacEmergency,
                "FAMILIAR_IN_HOME": viveconel,
                "MPI_FAMI": parseInt(selectCity),
                "DIR_FAMI": dir,
                "TEL_FAMI": campos13,
                "TRA_ESTU": dedicaFamiliar,
                "GRA_ESCO": campos7,
                "BEN_CACO": beneficiarioCaja,
                "BEN_EEPS": beneficiarioEPS,
                "PARTICIPAR_ACTIV": play,
                "HOB_FAMI": campos10,
                "PAI_FAMI": parseInt(selectCountry),
                "DTO_FAMI": parseInt(selectDpto)
              }
            const url = `${baseUrl}/v1/familiar/crearFamiliar`;
    
            console.log(datos);
            
            postData(url,datos).then(result =>{
                if(result.ok){
                    Swal.fire({
                        title: '',
                        text: "Se registro con éxito",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#2c7be5',
                        confirmButtonText: 'Cerrar'
                    })
                    this.loadDataPrincipal()
                }
            })
    
        }
    }


    render(){
        
        const {
            seeView,tipDocu,dataStudy,country,dpto,nomenclaturaStreet,nomenclaturaBis,nomenclaturaCardinalidad,nomenclaturaComplemento,
            city,dataRelationship,typeIncapa,dataFamiliy,dataActividad,valCountry,valDpto,valCity} = this.state;
        let data = '';

        const alphabet = this.state.alphabet.map((value,x) =><option key={x} value={value}>{value}</option> );

        if(!seeView){
            data = <div className="m-0 vh-100 row justify-content-center align-items-center" >
                   
                <div className="col-auto text-center">
                    <div className=" d-flex justify-content-around">
                        
                        <div className="row">
                            <h4>&#191;Deseas agregar familiares&#63;</h4>
                            <div className="col-sm">
                                <input type="radio" name="uniform" className="btn-check " id="btn-check-outlined" autoComplete="off"></input>
                                <label className="btn backGreen" htmlFor="btn-check-outlined" onClick={() =>{this.validarState(true)}}>SI</label> &nbsp;
                                <input type="radio" name="uniform" className="btn-check backGreen" id="btn-check-outlined2" autoComplete="off"></input>
                                <label className="btn backGreen" htmlFor="btn-check-outlined2" onClick={() => this.validarState(false)}>No</label>
                            </div>
                           
                        </div>                                       
                    </div>

                </div>  
            </div>;
        }else{
                data =<Fragment key={1}> 
                        <div className="card">
                            <div className="card-header">Mis familiares</div>
                        </div>
                        &nbsp;
                        <div className="card">
                            <div className="card-body">
                                <ul className="nav nav-pills" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="registers-tab" data-bs-toggle="tab" data-bs-target="#registers" type="button" role="tab" aria-controls="registers" aria-selected="true">Familiares registrados</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " active id="identity-tab" data-bs-toggle="tab" data-bs-target="#identity" type="button" role="tab" aria-controls="identity" aria-selected="true">Identidad del familiar</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="parent-tab" data-bs-toggle="tab" data-bs-target="#parent" type="button" role="tab" aria-controls="parent" aria-selected="true">Parentesco</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="report-tab" data-bs-toggle="tab" data-bs-target="#report" type="button" role="tab" aria-controls="report" aria-selected="true">Reporte de salud</button>
                                    </li>
                                </ul>
                                &nbsp;
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade" id="registers" role="tabpanel" aria-labelledby="registers-tab">
                                            {dataFamiliy}
                                    </div>
                                    <div className="tab-pane fade" id="identity" role="tabpanel" aria-labelledby="identity-tab">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Nombres:<span className="text-danger">*</span></label>
                                                    <input ref={input =>this.campos1 = input} type="text" className="form-control famlilyRequired" id="iden-nombre" name="iden-nombre"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Apellidos:<span className="text-danger">*</span></label>
                                                <input ref={input =>this.campos2 = input} type="text" className="form-control famlilyRequired" id="iden-apellido" name="iden-apellido"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">

                                                <label htmlFor="options">Sexo:<span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                    <input  type="radio"  value='F' className="btn-check input-hidden " name="options" id="option1" ></input>
                                                    <label className="btn btn-outline-primary" htmlFor="option1">Femenino</label>&nbsp;
                                                    <input  type="radio"  value='M' className="btn-check input-hidden" name="options" id="option2"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="option2">Masculino</label>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="iden-tipodocu">Tipo documento:<span className="text-danger">*</span></label>
                                                <select ref={input =>this.campos3 = input} name="iden-tipodocu" id="iden-tipodocu" className="form-select">
                                                    <option value=""></option>
                                                    {tipDocu}
                                                </select>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Identificaci&oacute;n:<span className="text-danger">*</span></label>
                                                <input ref={input =>this.campos4 = input} type="number" className="form-control famlilyRequired" id="iden-identi" name="iden-identi"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="gene-numdocu">Fecha de nacimiento:<span className="text-danger">*</span></label>
                                                <input ref={input =>this.campos5 = input} max={moment().format('yyyy-MM-DD')} type="date" className="form-control" id="iden-birth" name="iden-birth" onChange={(e) =>{
                                                    this.calculaEdad(moment(),moment(e.target.value))
                                                }}></input>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Edad:</label>
                                                <input ref={input =>this.campos6 = input} readOnly type="text" className="form-control" id="iden-age" name="iden-age"></input>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="">Nivel de estudio:</label>
                                                <select ref={input =>this.campos7 = input} className="form-select" id="iden-study" name="iden-study">
                                                    <option value=""></option>
                                                    {dataStudy}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row pb-4 flex">
                                            <div className="col d-flex flex-wrap justify-content-end">
                                                <button onClick={() => simulateClick('parent-tab',0,'click')} className="btn btn-primary">Siguiente</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="parent" role="tabpanel" aria-labelledby="parent-tab">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="">Tipo de relaci&oacute;n:<span className="text-danger">*</span></label>
                                                <select ref={input =>this.campos8 = input} className="form-select famlilyRequired" id="iden-rela" name="iden-rela">
                                                    <option value=""></option>
                                                    {dataRelationship}
                                                </select>
                                            </div>
                                            {/* <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="life">&#191;Vive actualmente&#63;<span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                            <input  type="radio"  value='S' className="btn-check input-hidden famlilyRequiredCheck" name="life" id="life1" onChange={() => {     
                                                                document.getElementById("econo2").checked = false
                                                                document.getElementById("livewith2").checked = false
                                                                document.getElementById("play2").checked = false
                                                                document.getElementById("iden-dedica").removeAttribute('disabled')
                                                                document.getElementById("iden-dedica").value = ''
                                                                document.getElementById("iden-acti").removeAttribute('readOnly')
                                                                document.getElementById("iden-acti").value = ''
                                                                document.getElementById("checkEPS").removeAttribute('disabled')
                                                                document.getElementById("checkEPS").checked= false;
                                                                document.getElementById("checkcAJA").removeAttribute('disabled')
                                                                document.getElementById("checkcAJA").checked= false;


                                                                // document.getElementById("iden-bene").removeAttribute('readOnly')
                                                                // document.getElementById("iden-bene").value = ''                                                         
                                                              }} />
                                                            <label className="btn btn-outline-primary" htmlFor="life1">SI</label>&nbsp;
                                                            <input  type="radio"  value='N' className="btn-check input-hidden" name="life" id="life2" onChange={() => {     
                                                                document.getElementById("econo2").checked = true
                                                                document.getElementById("livewith2").checked = true
                                                                document.getElementById("play2").checked = true
                                                                document.getElementById("iden-dedica").setAttribute('disabled','disabled')
                                                                document.getElementById("iden-dedica").value = ''
                                                                document.getElementById("iden-acti").setAttribute('readOnly','readOnly')
                                                                document.getElementById("iden-acti").value = ''
                                                                // document.getElementById("iden-bene").setAttribute('readOnly','readOnly')
                                                                // document.getElementById("iden-bene").value = ''
                                                                document.getElementById("checkEPS").checked= false;
                                                                document.getElementById("checkcAJA").checked= false;
                                                                document.getElementById("checkEPS").setAttribute('disabled','disabled')
                                                                document.getElementById("checkcAJA").setAttribute('disabled','disabled')

                                                                
                                                              }} />
                                                            <label className="btn btn-outline-primary" htmlFor="life2">NO</label>
                                                </div>
                                            </div> */}
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="econo">&#191;Depende economicamente de usted&#63;:<span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                    <input  type="radio"  value='S' className="btn-check input-hidden famlilyRequiredCheckEconomy" name="econo" id="econo1" ></input>
                                                    <label className="btn btn-outline-primary" htmlFor="econo1">SI</label>&nbsp;
                                                    <input  type="radio"  value='N' className="btn-check input-hidden famlilyRequiredCheckEconomy" name="econo" id="econo2"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="econo2">NO</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="livewith">&#191;Vive con usted&#63;:<span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                    <input  type="radio"  value='S' className="btn-check input-hidden famlilyRequiredCheckViveconUsted" name="livewith" id="livewith1" />
                                                    <label className="btn btn-outline-primary" htmlFor="livewith1">SI</label>&nbsp;
                                                    <input  type="radio"  value='N' className="btn-check input-hidden famlilyRequiredCheckViveconUsted" name="livewith" id="livewith2" />
                                                    <label className="btn btn-outline-primary" htmlFor="livewith2">NO</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>&#191;A qu&eacute; se dedica su familiar&#63;:</label>
                                                <select  ref={input =>this.campos9 = input} className="form-select" id="iden-dedica" name="iden-dedica">
                                                    <option value=""></option>
                                                    {dataActividad}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="play">&#191;Desea su familiar participe en las actividades:&#63;:<span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                    <input  type="radio"  value='S' className="btn-check input-hidden famlilyRequiredCheckParticipe" name="play" id="play1" ></input>
                                                    <label className="btn btn-outline-primary" htmlFor="play1">SI</label>&nbsp;
                                                    <input  type="radio"  value='N' className="btn-check input-hidden famlilyRequiredCheckParticipe" name="play" id="play2"></input>
                                                    <label className="btn btn-outline-primary" htmlFor="play2">NO</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Actividades de inter&eacute;s de su familiar:</label>
                                                <input  ref={input =>this.campos10 = input} type="text" className="form-control" id="iden-acti" name="iden-acti"></input>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Beneficiario de:</label>
                                                {/* <input  ref={input =>this.campos11 = input} type="text" className="form-control" id="iden-bene" name="iden-bene"></input> */}

                                                <div className="form-check">
                                                    <input ref={check => this.eps = check}  className="form-check-input checkServices"  type="checkbox" id={`checkEPS`}  value={`checkEPS`} />
                                                    <label className="form-check-label" htmlFor={`checkEPS`}>{`EPS`}</label>
                                                </div>
                                                <div className="form-check">
                                                    <input ref={check => this.caja = check} className="form-check-input checkServices"  type="checkbox" id={`checkcAJA`}  value={`checkcAJA`} />
                                                    <label className="form-check-label" htmlFor={`checkcAJA`}>{`CAJA`}</label>
                                                </div>

                                            </div>


                                        </div>
                                        <div className="row pb-4 flex">
                                            <div className="col d-flex flex-wrap justify-content-start">
                                                <button onClick={() => simulateClick('identity-tab',0,'click')} className="btn btn-primary">Atr&aacute;s</button>
                                            </div>
                                            <div className="col d-flex flex-wrap justify-content-end">
                                                <button onClick={() => simulateClick('report-tab',0,'click')} className="btn btn-primary">Siguiente</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="report" role="tabpanel" aria-labelledby="report-tab">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="discapacidad">&#191;Presenta alguna discapcidad&#63;:<span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                    <input   type="radio"  value='S' className="btn-check input-hidden famlilyRequiredCheckPresenDiscapa" name="discapacidad" id="discapacidad1" onChange={() =>{
                                                        document.getElementById('typeIncapa').removeAttribute('disabled')
                                                    }} />
                                                    <label className="btn btn-outline-primary" htmlFor="discapacidad1">SI</label>&nbsp;
                                                    <input  type="radio"  value='N' className="btn-check input-hidden famlilyRequiredCheckPresenDiscapa" name="discapacidad" id="discapacidad2" onChange={() =>{
                                                        document.getElementById('typeIncapa').setAttribute('disabled','disabled')
                                                        document.getElementById('typeIncapa').value = ''
                                                    }} />
                                                    <label className="btn btn-outline-primary" htmlFor="discapacidad2">NO</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="typeIncapa">Tipo de discapcidad:<span className="text-danger">*</span></label>
                                                <select ref={input =>this.campos14 = input}   disabled name="typeIncapa" id="typeIncapa" className="form-select famlilyRequired" >
                                                    <option value=""></option>
                                                    {typeIncapa}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Es tu contacto de emergencia: <span className="text-danger">*</span></label>
                                                <div className=" d-flex justify-content-around">
                                                    <input  type="radio"  value='S' className="btn-check input-hidden famlilyRequiredCheckContactEmergy" name="contactEmergy" id="contactEmergy1" onChange={() =>{
                                                        this.campos13.removeAttribute('readOnly')
                                                    }}></input>
                                                    <label className="btn btn-outline-primary" htmlFor="contactEmergy1">SI</label>&nbsp;
                                                    <input  type="radio"  value='N' className="btn-check input-hidden famlilyRequiredCheckContactEmergy" name="contactEmergy" id="contactEmergy2" onChange={() =>{
                                                        this.campos13.setAttribute('readOnly','readOnly')
                                                        this.campos13.value=''

                                                    }}></input>
                                                    <label className="btn btn-outline-primary" htmlFor="contactEmergy2">NO</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Tel&eacute;fono:</label>
                                                <input readOnly ref={input =>this.campos13 = input} className="form-control loadDir" type="text" id="report-telefono" name="report-telefono" ></input>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="country">Pa&iacute;s:</label>
                                                <select value={valCountry}   ref={inputElement  => this.selectCountry = inputElement} name="country" id="country" className="form-select" onChange={() => this.loadDpto()  } >
                                                    <option value=""></option>
                                                    {country}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="resi-dpto">Departamento:</label>
                                                <select value={valDpto} ref={inputElement  => this.selectDpto= inputElement} name="resi-dpto" id="resi-dpto" className="form-select" onChange={() => this.validateDpto()}>
                                                    <option value=""></option>
                                                    {dpto}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="resi-city">Ciudad:</label>
                                                <select value={valCity} onChange={(e) =>{ this.setState({valCity:e.target.value})  }} ref={input => this.selectCity = input}  name="resi-city" id="resi-city" className="form-select">
                                                    <option value=""></option>
                                                    {city}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <label className="form-label" htmlFor="labelDir-locale">Direcci&oacute;n:</label>
                                            </div>
                                            <small>Asistente para escribir correctamente seg&uacute;n lo exigido por los organismos de control. Solo debes llenar los campos necesarios de tu direcci&oacute;n. Los dem&aacute;s, los debes dejar en blanco</small>

                                            <div className="col-sm-2 col-xs-2 col-md-2 col-lg-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo1" id="dircampo1" className="form-select loadDir" ref={input => this.campo1 = input}  onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {nomenclaturaStreet}
                                                </select>
                                            </div>
                                            <div className="col-sm-2 col-xs-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <input className="form-control loadDir" type="number" min="1" id="dircampo2" name="dircampo2" ref={input => this.campo2 = input} onChange={() => this.loadAddress()}></input>
                                            </div>
                                            <div className="col-sm-2  col-xs-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo3" id="dircampo3" className="form-select loadDir" ref={input => this.campo3 = input} onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {alphabet}
                                                </select>
                                            </div>
                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo4" id="dircampo4" className="form-select loadDir" ref={input => this.campo4 = input} onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {nomenclaturaBis}
                                                </select>
                                            </div>
                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo5" id="dircampo5" className="form-select loadDir" ref={input => this.campo5 = input} onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {alphabet}
                                                </select>
                                            </div>
                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo6" id="dircampo6" className="form-select loadDir" ref={input => this.campo6 = input} onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {nomenclaturaCardinalidad}
                                                </select>
                                            </div>         
                                        </div>

                                        <div className="row">
                               
                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <div className=" d-flex  flex-nowrap">
                                                    <span className="  bg-transparent removeBorder" >#</span>
                                                    <input type="number" min="1" className="form-control loadDir" id="dircampo7" name="dircampo7" ref={input => this.campo7 = input} onChange={() => this.loadAddress()}></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo8" id="dircampo8" className="form-select loadDir" ref={input => this.campo8 = input} onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {alphabet}
                                                </select>
                                            </div>
                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <div className=" d-flex justify-content-around flex-nowrap">
                                                    <span className=" d-flex justify-content-around-text bg-transparent removeBorder" >-</span>
                                                    <input type="number" min="1" className="form-control loadDir" id="dircampo9" name="dircampo9" ref={input => this.campo9 = input} onChange={() => this.loadAddress()}></input>
                                                </div>
                                            </div>

                                            <div className="col-sm-2 col-md-2">
                                                <label>&nbsp;</label>
                                                <select name="dircampo10" id="dircampo10" className="form-select loadDir" ref={input => this.campo10 = input} onChange={() => this.loadAddress()}> 
                                                    <option value=""></option>
                                                    {nomenclaturaCardinalidad }
                                                </select>
                                            </div>

                                        </div>
                                        
                                        &nbsp;
                                        <div className="row">
                                            <div className="col-12">
                                                <small>Complementos de direcci&oacute;n: (Ej. torre B - apto 303)</small>
                                            </div>
                                            <div className="col-sm-2 col-md-2 pb-4">
                                                <label>&nbsp;</label>
                                                <select className="form-select loadDir" name="dircampo11"  id="dircampo11" ref={input => this.campo11 = input} onChange={() => this.loadAddress()}>
                                                    <option value=""></option>
                                                    {nomenclaturaComplemento}
                                                </select>
                                            </div>
                                            <div className="col-sm-4 col-md-4 pb-4">
                                                <label>&nbsp;</label>
                                                <input className="form-control loadDir" type="text" id="dircampo12" name="dircampo12" ref={input => this.campo12 = input} onChange={() => this.loadAddress()}></input>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <label className=" d-flex justify-content-around-text bg-transparent removeBorder" >&#191;Su direcci&oacute;n es:&#63;</label>
                                            <div className=" d-flex justify-content-around pb-4">
                                                <input readOnly type="text"  className="form-control" id="gene-addressFinal" ref={el => this.inputAddressFinal = el}></input>&nbsp;
                                                <span className=" d-flex justify-content-around-text bg-transparent removeBorder link-warning"  id="clearAddress" onClick={() => this.clearAddress()} >Borrar direcci&oacute;n</span>

                                            </div>
                                        </div>
                        
                                        <div className="row pb-4 flex">
                                            <div className="col d-flex flex-wrap justify-content-start">
                                                <button onClick={() => simulateClick('parent-tab',0,'click')} className="btn btn-primary">Atr&aacute;s</button>
                                            </div>
                                            <div className="col d-flex flex-wrap justify-content-end">
                                                <button onClick={() => this.saveDataFamily()} className="btn btn-primary">Guardar</button>
                                            </div>
                                        </div>
                                                            



                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
        }

        return <>
            {data}
        </>
    }
}

export default Family;