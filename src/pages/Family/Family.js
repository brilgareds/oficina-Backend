import {Component} from 'react';
import { baseUrl } from '../../config/config';
import { postData,getData, simulateClick } from '../../components/general/General';
import moment from 'moment';
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
            dataFamiliy: ''
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
            let option = result.map((value,x) => <option  key={x} value={value["TIP_CODIGO"]}>{value["TIP_NOMBRE"]}</option>);
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

        
        
    }

    validarState = (result) =>{
        this.setState({seeView:result})
        if(!result){
            this.props.history.push('/cv/DATOS_ADICIONALES');
        }
    }

    loadDpto = () => {
        const codCountry = this.selectCountry.value;
        const datos = {codPais:parseInt(codCountry)};
       // this.setState({valCountry:codCountry});
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
        // this.setState({valDpto:this.selectDpto.value})
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

    calculaEdad = (fecha,fecha_nac) => {
        var a = moment(fecha);
        var b = moment(fecha_nac);
        var years = a.diff(b, 'year');
        b.add(years, 'years');
        document.getElementById("iden-age").value = years;
    }    
    
    loadDataPrincipal = () =>{
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])
        const datos = {
            COD_EMPL: cedula,
            COD_EMPR: empresa
          };
       // this.setState({valCountry:codCountry});
        // consultar departamento
        const urlDpto = `${baseUrl}/v1/familiar/consultarFamiliares`;
        postData(urlDpto,datos).then(result =>{
            console.log("result ",result);
            let option = result.map((value,x) => {
                return <>
                    <tr key={x} >
                        <td className="text-nowrap">{value.NOM_FAMI}</td>
                        <td className="text-nowrap">{value.APE_FAMI}</td>
                        <td className="text-nowrap">{value.TEL_FAMI}</td>
                        <td className="text-center">
                            <button className="btn"  onClick={ () => this.updateLoadPrincipal(value,1)  }><i  className="far fa-edit text-primary fs-1" /> </button> 
                            <button className="btn"  onClick={ () => this.updateLoadPrincipal(value,2)  }><i  className="far fa-trash-alt text-danger fs-1" /> </button>
                        </td>
                    </tr>
                </>
            });
            
            
            let tabla = <table className="table table-hover table-striped table-bordered">
                            <thead>
                            <tr>
                                <th className="text-center" >Nombres</th>
                                <th className="text-center" >Apellidos</th>
                                <th className="text-center" ># de contacto</th>
                                <th className="text-center" >Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                                {option}
                            </tbody>

                        </table>


            this.setState({dataFamiliy:tabla});             
         });
    }

    saveDataFamily = ()  =>{
        const campos1 = this.campos1.value?this.campos1.value:'';
        const campos2 = this.campos2.value?this.campos2.value:'';
        const campos3 = this.campos3.value?this.campos3.value:'';
        const campos4 = this.campos4.value?this.campos4.value:'';
        const campos5 = this.campos5.value?this.campos5.value:'';
        const campos6 = this.campos6.value?this.campos6.value:'';
        const campos7 = this.campos7.value?this.campos7.value:'';
        const campos8 = this.campos8.value?this.campos8.value:'';
        const campos9 = this.campos9.value?this.campos9.value:'';
        const campos10 = this.campos10.value?this.campos10.value:'';
        const campos11 = this.campos11.value?this.campos11.value:'';
        const campos12 = this.campos12.value?this.campos12.value:'';
        const campos13 = this.campos13.value?this.campos13.value:'';
 

        console.log( campos1+' '+campos2+' '+campos3+' '+campos4+' '+campos5+' '+campos6+' '+campos7+' '+campos8+' '+campos9+' '+campos10+' '+campos11+' '+campos12 +''+ campos13)
    }


    render(){
        
        const {seeView,tipDocu,dataStudy,country,dpto,nomenclaturaStreet,nomenclaturaBis,nomenclaturaCardinalidad,nomenclaturaComplemento,city,dataRelationship,typeIncapa,dataFamiliy} = this.state;
        let data = '';

        const alphabet = this.state.alphabet.map((value,x) =><option key={x} value={value}>{value}</option> );

        if(!seeView){
            data = <div className="m-0 vh-100 row justify-content-center align-items-center" >
                   
                <div className="col-auto text-center">
                    <div className="input-group d-flex justify-content-around">
                        
                        <div className="row">
                            <h4>&#191;Deseas agregar familiares&#63;</h4>
                            <div className="col-sm">
                                <input type="radio" name="uniform" className="btn-check " id="btn-check-outlined" autoComplete="off"></input>
                                <label className="btn backGreen" htmlFor="btn-check-outlined" onClick={() => this.validarState(true)}>SI</label> &nbsp;
                                <input type="radio" name="uniform" className="btn-check backGreen" id="btn-check-outlined2" autoComplete="off"></input>
                                <label className="btn backGreen" htmlFor="btn-check-outlined2" onClick={() => this.validarState(false)}>No</label>
                            </div>
                           
                        </div>                                       
                    </div>

                </div>  
            </div>;
        }else{
                data =<> <div className="card">
                            <div className="card-header">Mis familiares</div>
                        </div>
                        &nbsp;
                        <div className="card">
                            <div className="card-body">
                                <ul className="nav nav-pills" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active " id="registers-tab" data-bs-toggle="tab" data-bs-target="#registers" type="button" role="tab" aria-controls="registers" aria-selected="true">Familiares registrados</button>
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
                                    <div className="tab-pane fade show active" id="registers" role="tabpanel" aria-labelledby="registers-tab">
                                            {dataFamiliy}
                                    </div>
                                    <div className="tab-pane fade" id="identity" role="tabpanel" aria-labelledby="identity-tab">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Nombres:</label>
                                                    <input ref={input =>this.campos1 = input} type="text" className="form-control" id="iden-nombre" name="iden-nombre"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Apellidos:</label>
                                                <input ref={input =>this.campos2 = input} type="text" className="form-control" id="iden-apellido" name="iden-apellido"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">

                                                <label htmlFor="options">Sexo:</label>
                                                <div className="input-group d-flex justify-content-around">
                                                    <div className="row">
                                                        <div className="col">
                                                            <input  type="radio"  value='F' className="btn-check input-hidden " name="options" id="option1" ></input>
                                                            <label className="btn btn-outline-primary" htmlFor="option1">Femenino</label>
                                                        </div>
                                                        <div className="col">
                                                            <input  type="radio"  value='M' className="btn-check input-hidden" name="options" id="option2"></input>
                                                            <label className="btn btn-outline-primary" htmlFor="option2">Masculino</label>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="iden-tipodocu">Tipo Documento:</label>
                                                <select ref={input =>this.campos3 = input} name="iden-tipodocu" id="iden-tipodocu" className="form-select">
                                                    <option value=""></option>
                                                    {tipDocu}
                                                </select>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label >Identificaci&oacute;n:</label>
                                                <input ref={input =>this.campos4 = input} type="number" className="form-control" id="iden-identi" name="iden-identi"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="gene-numdocu">Fecha de nacimiento:</label>
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
                                                <label htmlFor="">Tipo de relaci&oacute;n:</label>
                                                <select ref={input =>this.campos8 = input} className="form-select" id="iden-rela" name="iden-rela">
                                                    <option value=""></option>
                                                    {dataRelationship}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="life">&#191;Vive actualmente&#63;</label>
                                                <div className="input-group d-flex justify-content-around">
                                                    <div className="row">
                                                        <div className="col">
                                                            <input  type="radio"  value='S' className="btn-check input-hidden " name="life" id="life1" onChange={() => {     
                                                                document.getElementById("econo2").checked = false
                                                                document.getElementById("livewith2").checked = false
                                                                document.getElementById("play2").checked = false
                                                                document.getElementById("iden-dedica").removeAttribute('readOnly')
                                                                document.getElementById("iden-dedica").value = ''
                                                                document.getElementById("iden-acti").removeAttribute('readOnly')
                                                                document.getElementById("iden-acti").value = ''
                                                                document.getElementById("iden-bene").removeAttribute('readOnly')
                                                                document.getElementById("iden-bene").value = ''                                                         
                                                              }} />
                                                            <label className="btn btn-outline-primary" htmlFor="life1">SI</label>
                                                        </div>
                                                        <div className="col">
                                                            <input  type="radio"  value='N' className="btn-check input-hidden" name="life" id="life2" onChange={() => {     
                                                                document.getElementById("econo2").checked = true
                                                                document.getElementById("livewith2").checked = true
                                                                document.getElementById("play2").checked = true
                                                                document.getElementById("iden-dedica").setAttribute('readOnly','readOnly')
                                                                document.getElementById("iden-dedica").value = ''
                                                                document.getElementById("iden-acti").setAttribute('readOnly','readOnly')
                                                                document.getElementById("iden-acti").value = ''
                                                                document.getElementById("iden-bene").setAttribute('readOnly','readOnly')
                                                                document.getElementById("iden-bene").value = ''


                                                                
                                                              }} />
                                                            <label className="btn btn-outline-primary" htmlFor="life2">NO</label>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="econo">&#191;Depende economicamente de usted&#63;</label>
                                                <div className="input-group d-flex justify-content-around">
                                                    <div className="row">
                                                        <div className="col">
                                                            <input  type="radio"  value='S' className="btn-check input-hidden " name="econo" id="econo1" ></input>
                                                            <label className="btn btn-outline-primary" htmlFor="econo1">SI</label>
                                                        </div>
                                                        <div className="col">
                                                            <input  type="radio"  value='N' className="btn-check input-hidden" name="econo" id="econo2"></input>
                                                            <label className="btn btn-outline-primary" htmlFor="econo2">NO</label>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="livewith">&#191;Vive con usted&#63;</label>
                                                <div className="input-group d-flex justify-content-around">
                                                    <div className="row">
                                                        <div className="col">
                                                            <input  type="radio"  value='S' className="btn-check input-hidden " name="livewith" id="livewith1" />
                                                            <label className="btn btn-outline-primary" htmlFor="livewith1">SI</label>
                                                        </div>
                                                        <div className="col">
                                                            <input  type="radio"  value='N' className="btn-check input-hidden" name="livewith" id="livewith2" />
                                                            <label className="btn btn-outline-primary" htmlFor="livewith2">NO</label>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>&#191;A qu&eacute; se dedica su familiar&#63;</label>
                                                <input ref={input =>this.campos9 = input} type="text" className="form-control" id="iden-dedica" name="iden-dedica"></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="play">&#191;Desea su familiar participe en las actividades:&#63;</label>
                                                <div className="input-group d-flex justify-content-around">
                                                    <div className="row">
                                                        <div className="col">
                                                            <input  type="radio"  value='S' className="btn-check input-hidden " name="play" id="play1" ></input>
                                                            <label className="btn btn-outline-primary" htmlFor="play1">SI</label>
                                                        </div>
                                                        <div className="col">
                                                            <input  type="radio"  value='N' className="btn-check input-hidden" name="play" id="play2"></input>
                                                            <label className="btn btn-outline-primary" htmlFor="play2">NO</label>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Actividades de inter&eacute;s de su familiar</label>
                                                <input  ref={input =>this.campos10 = input} type="text" className="form-control" id="iden-acti" name="iden-acti"></input>
                                            </div>

                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Beneficiario de:</label>
                                                <input  ref={input =>this.campos11 = input} type="text" className="form-control" id="iden-bene" name="iden-bene"></input>
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
                                                <label htmlFor="discapacidad">&#191;Presenta alguna discapcidad&#63;</label>
                                                <div className="input-group d-flex justify-content-around">
                                                    <div className="row">
                                                        <div className="col">
                                                            <input  type="radio"  value='S' className="btn-check input-hidden " name="discapacidad" id="discapacidad1" onChange={() =>{
                                                                document.getElementById('typeIncapa').removeAttribute('disabled')
                                                            }} />
                                                            <label className="btn btn-outline-primary" htmlFor="discapacidad1">SI</label>
                                                        </div>
                                                        <div className="col">
                                                            <input  type="radio"  value='N' className="btn-check input-hidden" name="discapacidad" id="discapacidad2" onChange={() =>{
                                                                document.getElementById('typeIncapa').setAttribute('disabled','disabled')
                                                                document.getElementById('typeIncapa').value = ''
                                                            }} />
                                                            <label className="btn btn-outline-primary" htmlFor="discapacidad2">NO</label>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="typeIncapa">Tipo de discapcidad:</label>
                                                <select disabled name="typeIncapa" id="typeIncapa" className="form-select" >
                                                    <option value=""></option>
                                                    {typeIncapa}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Contacto de emergencia:</label>
                                                <input ref={input =>this.campos12 = input} className="form-control loadDir" type="text" id="report-contact" name="report-contact" ></input>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label>Tel&eacute;fono:</label>
                                                <input ref={input =>this.campos13 = input} className="form-control loadDir" type="text" id="report-telefono" name="report-telefono" ></input>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="country">Pa&iacute;s:</label>
                                                <select  ref={inputElement  => this.selectCountry = inputElement} name="country" id="country" className="form-select" onChange={() => this.loadDpto()  } >
                                                    <option value=""></option>
                                                    {country}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="resi-dpto">Departamento:</label>
                                                <select ref={inputElement  => this.selectDpto= inputElement} name="resi-dpto" id="resi-dpto" className="form-select" onChange={() => this.validateDpto()}>
                                                    <option value=""></option>
                                                    {dpto}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 col-md-4 pb-4">
                                                <label htmlFor="resi-city">Ciudad:</label>
                                                <select ref={input => this.selectCity = input}  name="resi-city" id="resi-city" className="form-select">
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
                                                <div className="input-group d-flex justify-content-around flex-nowrap">
                                                    <span className="input-group d-flex justify-content-around-text bg-transparent removeBorder" >#</span>
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
                                                <div className="input-group d-flex justify-content-around flex-nowrap">
                                                    <span className="input-group d-flex justify-content-around-text bg-transparent removeBorder" >-</span>
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
                                            <div className="input-group d-flex justify-content-around mb-3">
                                                <span className="input-group d-flex justify-content-around-text bg-transparent removeBorder" >&#191;Su direcci&oacute;n es:&#63;</span>
                                                <input readOnly type="text"  className="form-control" id="gene-addressFinal" ref={el => this.inputAddressFinal = el}></input>
                                                <span className="input-group d-flex justify-content-around-text bg-transparent removeBorder link-warning"  id="clearAddress" onClick={() => this.clearAddress()} >Borrar direcci&oacute;n</span>

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
                        </div></>
        }

        return <>
            {data}
        </>
    }
}

export default Family;