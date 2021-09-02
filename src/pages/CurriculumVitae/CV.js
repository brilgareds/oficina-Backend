import React,{Component} from 'react';
import './CV.css';
import moment from 'moment';
import {postData} from './CV_Post';
import { getData } from './CV_Get';
import { baseUrl } from '../../config/config';


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
        }
    }

    loadDpto = () => {
        const codCountry = this.selectCountry.value;
        const datos = {codPais:parseInt(codCountry)};
        this.setState({valCountry:codCountry});
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
        const campo1 = this.campo1.value?this.campo1.value:'';
        const campo2 = this.campo2.value?this.campo2.value:'';
        const campo3 = this.campo3.value?this.campo3.value:'';
        const campo4 = this.campo4.value?this.campo4.value:'';
        const campo5 = this.campo5.value?this.campo5.value:'';
        const campo6 = this.campo6.value?this.campo6.value:'';
        const campo7 = this.campo7.value?this.campo7.value:'';
        const campo8 = this.campo8.value?this.campo8.value:'';
        const campo9 = this.campo9.value?this.campo9.value:'';
        const campo10 = this.campo10.value?this.campo10.value:'';
        const campo11 = this.campo11.value?this.campo11.value:'';
        const campo12 = this.campo12.value?this.campo12.value:'';
        
         this.setState({dirFinal: campo1+' '+campo2+' '+campo3+' '+campo4+' '+campo5+' '+campo6+' '+campo7+' '+campo8+' '+campo9+' '+campo10+' '+campo11+' '+campo12});
         this.inputAddressFinal.value = campo1+' '+campo2+' '+campo3+' '+campo4+' '+campo5+' '+campo6+' '+campo7+' '+campo8+' '+campo9+' '+campo10+' '+campo11+' '+campo12;
    }

    changeValue = () =>{
        this.setState({
            mail_perso:this.corp1.value,
            mail_corpo:this.corp2.value,
            num_celular:this.corp3.value,
            num_celcorp:this.corp4.value,
            nivel2:this.corp5.value,
            nivel4:this.corp6.value,
            nivel5:this.corp7.value,
            cargo:this.corp8.value,
            antiguedad:this.corp9.value,
            plan:this.corp10.value,
            cargos:this.corp11.value,
            ocupaciones:this.corp12.value
        })
    }

    loadIndumen = () =>{
        let urls = [
            'https://api.github.com/users/iliakan',
            'https://api.github.com/users/remy',
            'https://api.github.com/users/jeresig'
          ];
          
          // map every url to the promise of the fetch
          let requests = urls.map(url => fetch(url));
          
          // Promise.all waits until all jobs are resolved
          Promise.all(requests)
            .then(responses => responses.forEach(
              response => alert(`${response.url}: ${response.status}`)
            ));
    }

    componentDidMount(){

        this.loadIndumen();

        // consultar datos basicos
        const datos = { cedula:1130633993,empresa:3 };
        const url = `${baseUrl}/v1/informacionBasica/consultaDatos`;
        postData(url,datos).then(result =>{
            const dataNew = result[0];
            this.setState({
                dataBasic: dataNew,
                valCivil:dataNew.ESTADO_CIVIL,
                valCountry:dataNew.PAI_NACI,
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
                plan:dataNew.PLAN_CARRERA,
                cargos:dataNew.NRO_CARGOS,
                ocupaciones:dataNew.CARGOS_OCUPADOS
            });
            
            calculaEdad(moment(),moment(result[0]['FECHA_NACIMIENTO']));
        });

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

        const calculaEdad = (fecha,fecha_nac) => {
            var a = moment(fecha);
            var b = moment(fecha_nac);
            var years = a.diff(b, 'year');
            b.add(years, 'years');
            this.setState({
                age:years
            });
        }       
        
    }
 
    render() {
      const {age,dataBasic,tipDocu,staCivil,country,dpto,nomenclaturaStreet,nomenclaturaBis,nomenclaturaCardinalidad,nomenclaturaComplemento,valCivil,valCountry,valDpto,city,valCity,dirFinal,mail_perso,mail_corpo,num_celular,num_celcorp,nivel2,nivel4,nivel5,cargo,antiguedad,plan,cargos,ocupaciones,dataAntiguedad} = this.state

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
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="gene-nom">Nombres:</label>
                                    <input type="text"  readOnly value={dataBasic.NOMBRES?dataBasic.NOMBRES:''} className="form-control" id="gene-nom" name="gene-nom"></input>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="gene-ape">Apellidos:</label>
                                    <input type="text" readOnly value={dataBasic.APELLIDOS?dataBasic.APELLIDOS:''} className="form-control" id="gene-ape" name="gene-ape"></input>
                                </div>
                                <div className="col-sm-12 col-md-4">

                                    <label htmlFor="options">Sexo:</label>

                                    <div className="input-group">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6">
                                                <input readOnly type="radio" checked={dataBasic.SEXO === 'F'?true:false} value='F' className="btn-check input-hidden " name="options" id="option1" ></input>
                                                <label className="btn border_radio" htmlFor="option1">Femenino</label>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <input readOnly type="radio" checked={dataBasic.SEXO === 'M'?true:false} value='M' className="btn-check input-hidden" name="options" id="option2"></input>
                                                <label className="btn border_radio" htmlFor="option2">Masculino</label>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="gene-tipodocu">Tipo Documento:</label>
                                    <select disabled value={dataBasic.TIP_CODIGO_DOCUMENTO} name="gene-tipodocu" id="gene-tipodocu" className="form-select">
                                        {tipDocu}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="gene-numdocu">N&uacute;mero de documento:</label>
                                    <input type="text" readOnly value={dataBasic.NRO_DOCUMENTO?dataBasic.NRO_DOCUMENTO:''} className="form-control" id="gene-numdocu" name="gene-numdocu"></input>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="gene-civil">Estado civil:</label>
                                    <select value={valCivil} ref={sel => this.selectCivil = sel} onChange={() => this.validateSex()} name="gene-civil" id="gene-civil" className="form-select">
                                        {staCivil}
                                    </select>
                                </div>

                                <div className="col-sm-12 col-md-4">
                                    <label className="form-label" htmlFor="gene-birth">Fecha de naciemiento</label>
                                    <input className="form-control datetimepicker" id="gene-birth" readOnly value={dataBasic.FECHA_NACIMIENTO?dataBasic.FECHA_NACIMIENTO:''} name="gene-birth" type="text" placeholder="yyyy/mm/dd" />
                                </div>

                                <div className="col-sm-12 col-md-4">
                                    <label className="form-label" htmlFor="gene-age">Edad:</label>
                                    <input readOnly className="form-control" id="gene-age" name="gene-age" type="text" value={age}></input>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="residencial" role="tabpanel" aria-labelledby="residencial-tab">
                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="country">Pa&iacute;s:</label>
                                    <select  value={valCountry} ref={inputElement  => this.selectCountry = inputElement} name="country" id="country" className="form-select" onChange={() => this.loadDpto()  } >
                                        <option value=""></option>
                                        {country}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="resi-dpto">Departamento:</label>
                                    {/* <select defaultValue={valDpto} value={valDpto} ref={inputElement  => this.selectDpto= inputElement} name="resi-dpto" id="resi-dpto" className="form-select" onChange={() => this.validateDpto()}>
                                        <option value=""></option>
                                        {dpto}
                                    </select> */}
                                    <select value={valDpto} ref={inputElement  => this.selectDpto= inputElement} name="resi-dpto" id="resi-dpto" className="form-select" onChange={() => this.validateDpto()}>
                                        <option value=""></option>
                                        {dpto}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label htmlFor="resi-city">Ciudad:</label>
                                    <select value={valCity} ref={input => this.selectCity = input} onChange={() => this.validateCity()} name="resi-city" id="resi-city" className="form-select">
                                        <option value=""></option>
                                        {city}
                                    </select>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label className="form-label" htmlFor="resi-neighborhood">Barrio:</label>
                                    <input className="form-control" defaultValue={dataBasic.BARRIO_RESIDENCIA} id="resi-neighborhood" name="resi-neighborhood" type="text" ></input>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <label className="form-label" htmlFor="resi-locale">Localidad:</label>
                                    <input className="form-control" defaultValue={dataBasic.LOCALIDAD_RESIDENCIA != null?dataBasic.LOCALIDAD_RESIDENCIA:''} id="resi-locale" name="resi-locale" type="text"></input>
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
                                    <div className="input-group flex-nowrap">
                                        <span className="input-group-text bg-transparent removeBorder" >#</span>
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
                                    <div className="input-group flex-nowrap">
                                        <span className="input-group-text bg-transparent removeBorder" >-</span>
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-transparent removeBorder" >&#191;Su direcci&oacute;n es:&#63;</span>
                                    <input readOnly type="text" defaultValue={dirFinal?dirFinal:''} className="form-control" id="gene-addressFinal" ref={el => this.inputAddressFinal = el}></input>
                                    <span className="input-group-text bg-transparent removeBorder link-warning"  id="clearAddress" onClick={() => this.clearAddress()} >Borrar direcci&oacute;n</span>

                                </div>
                            </div>
                          
                        </div>
                        <div className="tab-pane fade" id="corpo" role="tabpanel" aria-labelledby="corpo-tab">
                            <div className="row">
                                <div className="col-sm-4 col-md-4">
                                    <label>E-mail personal:</label>
                                    <input value={mail_perso?mail_perso:''} onChange={() => this.changeValue() } className="form-control" id="corp-1" name="corp-1" ref={corp1 => this.corp1 = corp1}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>E-mail corporativo</label>
                                    <input value={mail_corpo?mail_corpo:''} onChange={() => this.changeValue() }  className="form-control" id="corp-2" name="corp-2" ref={corp2 => this.corp2 = corp2}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>N&uacute;mero de tu celular</label>
                                    <input value={num_celular ?num_celular :''} className="form-control" onChange={() => this.changeValue() } id="corp-3" name="corp-3" ref={input => this.corp3 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>N&uacute;mero del celular corporativo</label>
                                    <input value={num_celcorp ?num_celcorp :''} className="form-control" onChange={() => this.changeValue() } id="corp-4" name="corp-4" ref={input => this.corp4 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>Nombre nivel 2</label>
                                    <input value={nivel2 ?nivel2 :''} readOnly className="form-control" id="corp-5" name="corp-5" ref={input => this.corp5 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>Nombre nivel 4</label>
                                    <input value={nivel4 ?nivel4 :''} readOnly className="form-control" id="corp-6" name="corp-6" ref={input => this.corp6 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>Nombre nivel 5</label>
                                    <input value={nivel5 ?nivel5 :''} readOnly className="form-control"  id="corp-7" name="corp-7" ref={input => this.corp7 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>Cargo actual</label>
                                    <input value={cargo ?cargo :''} className="form-control" readOnly id="corp-8" name="corp-8" ref={input => this.corp8 = input}></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>Antiguedad en la empresa</label>
                                    <select value={antiguedad?antiguedad:''} className="form-select" id="corp-9" name="corp-9" ref={input => this.corp9 = input} onChange={() => this.changeValue() } >
                                        <option value=""></option>
                                        {dataAntiguedad}
                                    </select>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>&#191;Usted ha sido Plan Carrera&#63;</label>
                                    <input value={plan?plan:''} className="form-control" id="corp-10" name="corp-10" ref={input => this.corp10 = input} onChange={() => this.changeValue() }></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>&#191;Cu&aacute;ntos cargos ha ocupado dentro de la organizaci&oacute; siendo Plan carrera&#63;</label>
                                    <input value={cargos?cargos:''} className="form-control" id="corp-11" name="corp-11" ref={input => this.corp11 = input} onChange={() => this.changeValue() }></input>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <label>Mencione los cargos que ha ocupado</label>
                                    <input value={ocupaciones?ocupaciones:''} className="form-control" id="corp-12" name="corp-12" ref={input => this.corp12 = input} onChange={() => this.changeValue() }></input>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="indu" role="tabpanel" aria-labelledby="indu-tab">
                            <div className="row">
                                <div className="col-sm-3 col-md-3">
                                    <label>&#191;Usas uniforme&#63;</label>
                                    <div className="input-group">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6">
                                                <input type="radio" name="uniform" className="btn-check" id="btn-check-outlined" autoComplete="off"></input>
                                                <label className="btn btn-outline-default" htmlFor="btn-check-outlined">SI</label>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <input type="radio" name="uniform" className="btn-check" id="btn-check-outlined2" autoComplete="off"></input>
                                                <label className="btn btn-outline-default" htmlFor="btn-check-outlined2">No</label>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                                <div className="col-sm-3 col-md-3">
                                    <label>Talla camisa</label>
                                    <select name="indu-camisa" id="indu-camisa" className="form-select">
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-sm-3 col-md-3">
                                    <label>Talla pantal&oacute;n</label>
                                    <select name="indu-pantalon" id="indu-pantalon" className="form-select">
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-sm-3 col-md-3">
                                    <label>Talla calzado</label>
                                    <select name="indu-calzado" id="indu-calzado" className="form-select">
                                        <option></option>
                                    </select>
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
