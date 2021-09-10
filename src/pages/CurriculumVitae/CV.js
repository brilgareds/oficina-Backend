import React,{Component} from 'react';
import moment from 'moment';
import { baseUrl } from '../../config/config';
import { postData,getData,simulateClick, validateInputSelect } from '../../components/general/General';
import Swal from 'sweetalert2';




class CV extends Component {
    constructor(props){
        super(props);
        this.state = {
            age: '',
            dataBasic:'',
            tipDocu:'',
            staCivil: '',
            valCivil:'',
            country:'',
            valCountry:'',
            dpto:'',
            valDpto:'',
            city:'',
            valCity:'',
            nomenclaturaStreet:'',
            nomenclaturaBis:'',
            alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"],
            nomenclaturaCardinalidad:'',
            nomenclaturaComplemento:'',
            intervalId:true,
            dirFinal:'',
            mail_perso:'',
            mail_corpo:'',
            num_celular:'',
            num_celcorp:'',
            nivel2:'',
            nivel4:'',
            nivel5:'',
            cargo:'',
            antiguedad:'',
            plan:'',
            cargos:'',
            ocupaciones:'',
            dataAntiguedad:'',
            dataShirt:'',
            dataJeanM:'',
            dataJeanW:'',
            dataShoe:'',
            USA_UNIFORME: '',
            TALLA_CAMISA: '',
            TALLA_PANTALON: '',
            TALLA_CALZADO: '',
            seeInput:'hidden'
        }
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

    validateSex = () => {
        this.setState({valCivil: this.selectCivil.value});
    }

    validateCity = () =>{
        this.setState({valCity:this.selectCity.value})
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

    changeValue = () =>{
        this.setState({
            mail_perso:this.corp1.value?this.corp1.value:'',
            mail_corpo:this.corp2.value?this.corp2.value:'',
            num_celular:this.corp3.value?this.corp3.value:'',
            num_celcorp:this.corp4.value?this.corp4.value:'',
            antiguedad:this.corp9.value?this.corp9.value:'',
            cargos:this.corp11.value?this.corp11.value:'',
            ocupaciones:this.corp12.value?this.corp12.value:''
        })
    }


    saveDataPrincipal = () =>{

        const validateData = validateInputSelect('dataRequerid')
        console.log(validateData);

        if(validateData > 0){
            Swal.fire({
                title: '',
                text: "Validar campos obligatorios",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#2c7be5',
                confirmButtonText: 'Cerrar'
            })
        }else{

        

        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula']);
        const empresa = parseInt(dataUser['empresa']);

        const datos = {
            "TIP_CODIGO_DOCUMENTO": this.tipodocu.value?this.tipodocu.value:'',
            "EMP_CODIGO": empresa,
            "NRO_DOCUMENTO": cedula,
            "NOMBRES": this.nombre.value?this.nombre.value:'',
            "APELLIDOS": this.apellido.value?this.apellido.value:'',
            "SEXO": document.querySelector('input[name=options]:checked').value,
            "FECHA_NACIMIENTO": this.birth.value?this.birth.value:'',
            "ESTADO_CIVIL": this.selectCivil.value?this.selectCivil.value:'',
            "DEPARTAMENTO_RESIDENCIA": parseInt(this.selectDpto.value),
            "CIUDAD_RESIDENCIA": parseInt(this.selectCity.value),
            "BARRIO_RESIDENCIA": this.barrio.value?this.barrio.value:'',
            "LOCALIDAD_RESIDENCIA": this.locali.value?this.locali.value:'',
            "DIRECCION_COMPLETA": this.inputAddressFinal.value?this.inputAddressFinal.value:'',
            "EMAIL_PERSONAL": this.corp1.value?this.corp1.value:'',
            "EMAIL_CORPORATIVO": this.corp2.value?this.corp2.value:'',
            "CELULAR_CONTACTO": (this.corp3.value?this.corp3.value:''),
            "CELULAR_CORPORATIVO": (this.corp4.value?this.corp4.value:''),
            "ANTIGUEDAD_EMPRESA": parseInt(this.corp9.value?this.corp9.value:0),
            "PLAN_CARRERA": parseInt(document.querySelector('input[name=plancarrera]').value),
            "NRO_CARGOS": parseInt(this.corp11.value?this.corp11.value:0),
            "CARGOS_OCUPADOS": this.corp12.value?this.corp12.value:'',
            "USA_UNIFORME": parseInt(document.querySelector('input[name=uniform]:checked').value),
            "TALLA_CAMISA": parseInt(this.corp15.value?this.corp15.value:0),
            "TALLA_PANTALON": parseInt(this.corp16.value?this.corp16.value:0),
            "TALLA_CALZADO": parseInt(this.corp17.value?this.corp17.value:0)
          }

            const url = `${baseUrl}/v1/informacionBasica/actualizacionDatos`;
            
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

    loadDataPrincipal= () =>{
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])


        // consultar datos basicos
        const datos = { cedula:cedula,empresa:empresa };
        const url = `${baseUrl}/v1/informacionBasica/consultaDatos`;
        postData(url,datos).then(result =>{
            const dataNew = result[0];
            console.log(dataNew);
            if(dataNew){
    

                if(dataNew.PLAN_CARRERA != null){
                    parseInt(dataNew.PLAN_CARRERA) === 1 ?document.getElementById('btn-check-outlined').checked = true:document.getElementById('btn-check-outlined2').checked = true
                    // this.alergias.removeAttribute('readOnly')
                }
                if(dataNew.USA_UNIFORME != null){
                    console.log(" entro usa uniforme" +dataNew.USA_UNIFORME)
                    parseInt(dataNew.USA_UNIFORME) === 1 ?document.getElementById('checkUsesUniform').checked = true:document.getElementById('checkUsesUniform2').checked = true
                    // this.alergias.removeAttribute('readOnly')
                }


                this.setState({
                    dataBasic: dataNew,
                    valCivil:dataNew.ESTADO_CIVIL,
                    valCountry:dataNew.PAI_RESI,
                    valDpto: dataNew.DEPARTAMENTO_RESIDENCIA,
                    valCity: dataNew.CIUDAD_RESIDENCIA,
                    dirFinal:dataNew.DIRECCION_COMPLETA,
                    mail_perso:dataNew.EMAIL_PERSONAL,
                    mail_corpo:dataNew.EMAIL_CORPORATIVO,
                    num_celular:dataNew.CELULAR_CONTACTO,
                    num_celcorp:dataNew.CELULAR_CORPORATIVO,
                    nivel2:dataNew.nomNivel2,
                    nivel4:dataNew.nomNivel4,
                    nivel5:dataNew.nomNivel5,
                    cargo:dataNew.nom_carg,
                    antiguedad:dataNew.ANTIGUEDAD_EMPRESA,
                    // plan:dataNew.PLAN_CARRERA,
                    cargos:dataNew.NRO_CARGOS,
                    ocupaciones:dataNew.CARGOS_OCUPADOS,
                    // USA_UNIFORME: dataNew.USA_UNIFORME,
                    TALLA_CAMISA: dataNew.TALLA_CAMISA,
                    TALLA_PANTALON: dataNew.TALLA_PANTALON,
                    TALLA_CALZADO: dataNew.TALLA_CALZADO
                });
                
                this.calculaEdad(moment(),moment(result[0]['FECHA_NACIMIENTO']));
            }
  
        });
    }

    calculaEdad = (fecha,fecha_nac) => {
            var a = moment(fecha);
            var b = moment(fecha_nac);
            var years = a.diff(b, 'year');
            b.add(years, 'years');
            this.setState({
            age:years
        });
    }   

    componentDidMount(){
 

      

        // consultar tipo documento
        const tipoDocu = `${baseUrl}/v1/informacionBasica/consultarTipDocumento`;
        getData(tipoDocu).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({tipDocu:option});             
         });

          // consultar estado civil
        const stateCivil = `${baseUrl}/v1/informacionBasica/consultarEstadoCivil`;
        getData(stateCivil).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
             this.setState({staCivil:option});
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

        //  consultar antiguedad
        const urlANtiguedad = `${baseUrl}/v1/informacionBasica/consultarAntiguedad`;
        getData(urlANtiguedad).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataAntiguedad:option});
            
        });



        // consultar indumentaria
        const urlIndumen = `${baseUrl}/v1/informacionBasica/consultarTalla`;
        getData(urlIndumen).then(result =>{
            let option = result.tallaCamisa.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataShirt:option});

            let option2 = result.tallaPantalonMujer.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataJeanW:option2});

            let option3 = result.tallaPantalonHombre.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataJeanM:option3});

            let option4 = result.tallaCalzado.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataShoe:option4});         
        });

        document.getElementById('root').className = 'cv';
        this.loadDataPrincipal();
        simulateClick('country',1000,'change');
        simulateClick('resi-dpto',1500,'change');

            
        
    }
 
    render() {
        const {age,dataBasic,tipDocu,staCivil,country,dpto,nomenclaturaStreet,nomenclaturaBis,nomenclaturaCardinalidad,nomenclaturaComplemento,valCivil,valCountry,valDpto,city,valCity,dirFinal,mail_perso,mail_corpo,num_celular,num_celcorp,nivel2,nivel4,nivel5,cargo,antiguedad,cargos,ocupaciones,dataAntiguedad,dataShirt,dataJeanM,dataJeanW,dataShoe ,TALLA_CAMISA ,TALLA_PANTALON,TALLA_CALZADO } = this.state
        const alphabet = this.state.alphabet.map((value,x) =><option key={x} value={value}>{value}</option> );
   
      return (
        <>
            <div className="card">
                <div className="card-header">Datos b&aacute;sicos</div>
            </div>
            &nbsp;
            <div className="card">
                <div className="card-body">
                    <ul className="nav nav-pills" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">Datos generales</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="residencial-tab" data-bs-toggle="tab" data-bs-target="#residencial" type="button" role="tab" aria-controls="residencial" aria-selected="false">Datos residenciales</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="corpo-tab" data-bs-toggle="tab" data-bs-target="#corpo" type="button" role="tab" aria-controls="corpo" aria-selected="false">Datos corporativos</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="indu-tab" data-bs-toggle="tab" data-bs-target="#indu" type="button" role="tab" aria-controls="indu" aria-selected="false">Indumentaria</button>
                        </li>
                    </ul>
                    &nbsp;
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                            <div className="row">
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="gene-nom">Nombres:</label>
                                    <input type="text" ref={inp => this.nombre = inp}  readOnly value={dataBasic.NOMBRES?dataBasic.NOMBRES:''} className="form-control" id="gene-nom" name="gene-nom"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="gene-ape">Apellidos:</label>
                                    <input type="text" ref={inp => this.apellido = inp} readOnly value={dataBasic.APELLIDOS?dataBasic.APELLIDOS:''} className="form-control" id="gene-ape" name="gene-ape"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">

                                    <label htmlFor="options">Sexo:</label>

                                    <div className=" d-flex justify-content-around">
                                                <input readOnly type="radio" checked={dataBasic.SEXO === 'F'?true:false} value='F' className="btn-check input-hidden " name="options" id="option1" ></input>
                                                <label className="btn btn-outline-primary" htmlFor="option1">Femenino</label>&nbsp;
                                                <input readOnly type="radio" checked={dataBasic.SEXO === 'M'?true:false} value='M' className="btn-check input-hidden" name="options" id="option2"></input>
                                                <label className="btn btn-outline-primary" htmlFor="option2">Masculino</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="gene-tipodocu">Tipo Documento:</label>
                                    <select ref={inp => this.tipodocu = inp}  disabled value={dataBasic.TIP_CODIGO_DOCUMENTO} name="gene-tipodocu" id="gene-tipodocu" className="form-select">
                                        {tipDocu}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="gene-numdocu">N&uacute;mero de documento:</label>
                                    <input type="text" readOnly value={dataBasic.NRO_DOCUMENTO?dataBasic.NRO_DOCUMENTO:''} className="form-control" id="gene-numdocu" name="gene-numdocu"></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="gene-civil">Estado civil:<span className="text-danger">*</span></label>
                                    <select value={valCivil} ref={sel => this.selectCivil = sel} onChange={() => this.validateSex()} name="gene-civil" id="gene-civil" className="form-select dataRequerid">
                                       <option value=""></option>
                                        {staCivil}
                                    </select>
                                </div>

                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label className="form-label" htmlFor="gene-birth">Fecha de nacimiento:</label>
                                    <input ref={date => this.birth = date} className="form-control datetimepicker" id="gene-birth" readOnly value={dataBasic.FECHA_NACIMIENTO?dataBasic.FECHA_NACIMIENTO:''} name="gene-birth" type="text" />
                                </div>

                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label className="form-label" htmlFor="gene-age">Edad:</label>
                                    <input readOnly className="form-control" id="gene-age" name="gene-age" type="text" value={age}></input>
                                </div>
                            </div>
                            <div className="row pb-4 flex">
                                <div className="col d-flex flex-wrap justify-content-end">
                                    <button onClick={() => simulateClick('residencial-tab',0,'click')} className="btn btn-primary">Siguiente</button>
                                </div>
                            </div>
                       
                        </div>


                        <div className="tab-pane fade" id="residencial" role="tabpanel" aria-labelledby="residencial-tab">
                            <div className="row">
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="country">Pa&iacute;s:<span className="text-danger">*</span></label>
                                    <select  value={valCountry} ref={inputElement  => this.selectCountry = inputElement} name="country" id="country" className="form-select dataRequerid" onChange={() => this.loadDpto()  } >
                                        <option value=""></option>
                                        {country}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="resi-dpto">Departamento:<span className="text-danger">*</span></label>
                                    <select value={valDpto} ref={inputElement  => this.selectDpto= inputElement} name="resi-dpto" id="resi-dpto" className="form-select dataRequerid" onChange={() => this.validateDpto()}>
                                        <option value=""></option>
                                        {dpto}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label htmlFor="resi-city">Ciudad:<span className="text-danger">*</span></label>
                                    <select value={valCity} ref={input => this.selectCity = input} onChange={() => this.validateCity()} name="resi-city" id="resi-city" className="form-select dataRequerid">
                                        <option value=""></option>
                                        {city}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label className="form-label" htmlFor="resi-neighborhood">Barrio:<span className="text-danger">*</span></label>
                                    <input ref={input => this.barrio = input} className="form-control dataRequerid" defaultValue={dataBasic.BARRIO_RESIDENCIA} id="resi-neighborhood" name="resi-neighborhood" type="text" ></input>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label className="form-label" htmlFor="resi-locale">Localidad:</label>
                                    <input ref={input => this.locali = input} className="form-control" defaultValue={dataBasic.LOCALIDAD_RESIDENCIA != null?dataBasic.LOCALIDAD_RESIDENCIA:''} id="resi-locale" name="resi-locale" type="text"></input>
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
                                    <div className=" d-flex justify-content-around flex-nowrap">
                                        <span className=" d-flex justify-content-around-text bg-transparent removeBorder" >#</span>
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
                                <div className="col-sm-2 col-md-2">
                                    <label>&nbsp;</label>
                                    <select className="form-select loadDir" name="dircampo11"  id="dircampo11" ref={input => this.campo11 = input} onChange={() => this.loadAddress()}>
                                        <option value=""></option>
                                        {nomenclaturaComplemento}
                                    </select>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>&nbsp;</label>
                                    <input className="form-control loadDir" type="text" id="dircampo12" name="dircampo12" ref={input => this.campo12 = input} onChange={() => this.loadAddress()}></input>
                                </div>
                            </div>
                            <div className="row">
                                <label>&nbsp;</label>
                                <label className=" d-flex justify-content-around-text bg-transparent removeBorder" >&#191;Su direcci&oacute;n es:&#63;<span className="text-danger">*</span></label>
                                    <div className=" d-flex justify-content-around mb-3">
                                        
                                    <input readOnly type="text" defaultValue={dirFinal?dirFinal:''} className="form-control dataRequerid" id="gene-addressFinal" ref={el => this.inputAddressFinal = el}></input>&nbsp;
                                    <span className=" d-flex justify-content-around-text bg-transparent removeBorder link-warning"  id="clearAddress" onClick={() => this.clearAddress()} >Borrar direcci&oacute;n</span>

                                </div>
                            </div>
                            <div className="row pb-4 flex">
                                <div className="col d-flex flex-wrap justify-content-start">
                                    <button onClick={() => simulateClick('general-tab',0,'click')} className="btn btn-primary">Atr&aacute;s</button>
                                </div>
                                <div className="col d-flex flex-wrap justify-content-end">
                                    <button onClick={() => simulateClick('corpo-tab',0,'click')} className="btn btn-primary">Siguiente</button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="corpo" role="tabpanel" aria-labelledby="corpo-tab">
                            <div className="row">
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>E-mail personal:<span className="text-danger">*</span></label>
                                    <input value={mail_perso?mail_perso:''} onChange={() => this.changeValue() } className="form-control dataRequerid" id="corp-1" name="corp-1" ref={corp1 => this.corp1 = corp1}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>E-mail corporativo:</label>
                                    <input value={mail_corpo?mail_corpo:''} onChange={() => this.changeValue() }  className="form-control" id="corp-2" name="corp-2" ref={corp2 => this.corp2 = corp2}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>N&uacute;mero de tu celular:<span className="text-danger">*</span></label>
                                    <input value={num_celular ?num_celular :''} className="form-control dataRequerid" onChange={() => this.changeValue() } id="corp-3" name="corp-3" ref={input => this.corp3 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>N&uacute;mero del celular corporativo:</label>
                                    <input value={num_celcorp ?num_celcorp :''} className="form-control" onChange={() => this.changeValue() } id="corp-4" name="corp-4" ref={input => this.corp4 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Nombre nivel 2:</label>
                                    <input value={nivel2 ?nivel2 :''} readOnly className="form-control" id="corp-5" name="corp-5" ref={input => this.corp5 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Nombre nivel 4:</label>
                                    <input value={nivel4 ?nivel4 :''} readOnly className="form-control" id="corp-6" name="corp-6" ref={input => this.corp6 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Nombre nivel 5:</label>
                                    <input value={nivel5 ?nivel5 :''} readOnly className="form-control"  id="corp-7" name="corp-7" ref={input => this.corp7 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Cargo actual:</label>
                                    <input value={cargo ?cargo :''} className="form-control" readOnly id="corp-8" name="corp-8" ref={input => this.corp8 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Antiguedad en la empresa:<span className="text-danger">*</span></label>
                                    <select value={antiguedad?antiguedad:''} className="form-select dataRequerid" id="corp-9" name="corp-9" ref={input => this.corp9 = input} onChange={(e) =>{
                                        this.changeValue()

                                    } } >
                                        <option value=""></option>
                                        {dataAntiguedad}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4 pb-4">
                                    <label>&#191;Usted ha sido Plan Carrera&#63;<span className="text-danger">*</span></label>
                                    <div className=" d-flex justify-content-around">
                                                <input  onChange={e => {
                                                    // this.setState({ plan:e.target.value}) 
                                                    console.log(e.target.value)
                                                    
                                                    }} value="1" type="radio" name="plancarrera" className="btn-check" id="btn-check-outlined" autoComplete="off"></input>
                                                <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">SI</label>&nbsp;
                                                <input  onChange={e =>{
                                                    //  this.setState({ plan:e.target.value})
                                                        console.log(e.target.value)
                                                    } } value="0"  type="radio" name="plancarrera" className="btn-check" id="btn-check-outlined2" autoComplete="off"></input>
                                                <label className="btn btn-outline-primary" htmlFor="btn-check-outlined2">NO</label>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>&#191;Cu&aacute;ntos cargos ha ocupado dentro de la organizaci&oacute;n siendo Plan Carrera&#63;<span className="text-danger">*</span></label>
                                    <input type="number" value={cargos?cargos:''} className="form-control dataRequerid" id="corp-11" name="corp-11" ref={input => this.corp11 = input} onChange={() => this.changeValue() }></input>
                                </div> 
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Mencione los cargos que ha ocupado<span className="text-danger">*</span></label>
                                    <input value={ocupaciones?ocupaciones:''} className="form-control dataRequerid" id="corp-12" name="corp-12" ref={input => this.corp12 = input} onChange={() => this.changeValue() }></input>
                                </div>
                            </div>
                            <div className="row pb-4 flex">
                                <div className="col d-flex flex-wrap justify-content-start">
                                    <button onClick={() => simulateClick('residencial-tab',0,'click')} className="btn btn-primary">Atr&aacute;s</button>
                                </div>
                                <div className="col d-flex flex-wrap justify-content-end">
                                    <button onClick={() => simulateClick('indu-tab',0,'click')} className="btn btn-primary">Siguiente</button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="indu" role="tabpanel" aria-labelledby="indu-tab">
                            <div className="row ">
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>&#191;Usas uniforme&#63;:<span className="text-danger">*</span></label>
                                    <div className=" d-flex justify-content-around">
                                                <input value="1" type="radio" name="uniform" onChange={e => console.log({USA_UNIFORME:e.target.value})} className="btn-check" id="checkUsesUniform" autoComplete="off"></input>
                                                <label className="btn btn-outline-primary" htmlFor="checkUsesUniform">SI</label> &nbsp;
                                                <input value="0" type="radio" name="uniform" onChange={e => console.log({USA_UNIFORME:e.target.value})} className="btn-check" id="checkUsesUniform2" autoComplete="off"></input>
                                                <label className="btn btn-outline-primary" htmlFor="checkUsesUniform2">NO</label>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Talla camisa:<span className="text-danger">*</span></label>
                                    <select   ref={input => this.corp15 = input} value={TALLA_CAMISA?TALLA_CAMISA:''} onChange={e => this.setState({TALLA_CAMISA:e.target.value})} name="indu-camisa" id="indu-camisa" className="form-select dataRequerid">
                                        <option></option>
                                        {dataShirt}
                                    </select>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Talla pantal&oacute;n:<span className="text-danger">*</span></label>
                                    <select  ref={input => this.corp16 = input} value={TALLA_PANTALON?TALLA_PANTALON:''} onChange={e => this.setState({TALLA_PANTALON:e.target.value})} name="indu-pantalon" id="indu-pantalon" className="form-select dataRequerid">
                                        <option></option>
                                        {dataJeanM}{dataJeanW}
                                    </select>
                                </div>
                                <div className="col-sm-4 col-md-4 pb-4">
                                    <label>Talla calzado:<span className="text-danger">*</span></label>
                                    <select  ref={input => this.corp17 = input} value={TALLA_CALZADO?TALLA_CALZADO:''} onChange={e => this.setState({TALLA_CALZADO:e.target.value})} name="indu-calzado" id="indu-calzado" className="form-select dataRequerid">
                                        <option></option>
                                        {dataShoe}
                                    </select>
                                </div>

                            </div>
                            <div className="row pb-4 flex">
                                <div className="col d-flex flex-wrap justify-content-start">
                                    <button onClick={() => simulateClick('corpo-tab',0,'click')} className="btn btn-primary">Atr&aacute;s</button>
                                </div>
                                <div className="col d-flex flex-wrap justify-content-end">
                                    <button onClick={() => this.saveDataPrincipal()} className="btn btn-primary">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>        
        </>
      );
    }
  }

export default CV;
