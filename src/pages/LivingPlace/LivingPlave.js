import {Component} from 'react';
import {React} from 'react-dom';
import Swal from 'sweetalert2';
import { getData, loadDataValidate, postData, validateInputTabs } from '../../components/general/General';
import { baseUrl } from '../../config/config';

class LivingPlace extends Component{


    constructor(props){
        super(props);
        this.state = {
                dataTypeLivinPlace:'',
                dataPerimeter:'',
                dataStratum:'',
                checkBene:'',
                checkCredi:'',
                dataLivingPlace:'',
                TIPO_VIVIENDA: '',
                PERIMETRO: '',
                ESTRATO: '',
                BENEFICIARIO_CREDITO_VIVIENDA: '',
                CREDITO_VIVIENDA_VIGENTE: '',
                SERVICIOS: '',
                HABITANTES_VIVIENDA: '',
                dataServices:''
        }
    }


    componentDidMount(){
        document.getElementById('root').className = 'cv';
        
        this.loadDataPrincipal();

        // consultar  tipo vivienda
        const urlEtnia = `${baseUrl}/v1/vivienda/consultarDatosTipVivienda`;
        getData(urlEtnia).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataTypeLivinPlace:option});             
        });
        // consultar  tipo perimtro
        const urlPerimeter = `${baseUrl}/v1/vivienda/consultarDatosPerimetro`;
        getData(urlPerimeter).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataPerimeter:option});             
        });
        // consultar  tipo estrato
        const urlStratum = `${baseUrl}/v1/vivienda/consultarDatosEstrato`;
        getData(urlStratum).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_NOMBRE"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataStratum:option});             
        });
    }





    saveLivingPlace = () =>{

        if(!validateInputTabs()){

            const dataUser = JSON.parse( localStorage.getItem("d_u"));
            const cedula = parseInt(dataUser['cedula']);
            const empresa = parseInt(dataUser['empresa']);

            var els = document.getElementsByClassName("checkServices");
            let stringServi = ''; 
            for(var i = 0; i < els.length; i++)
            {
                if (els[i].checked)
                {
                    stringServi += els[i].value +' '
                }
            }
            
            const datos = {
                NRO_DOCUMENTO: cedula,
                TIPO_VIVIENDA: this.state.TIPO_VIVIENDA,
                PERIMETRO: this.campo2.value,
                ESTRATO: parseInt(this.state.ESTRATO),
                BENEFICIARIO_CREDITO_VIVIENDA: this.state.BENEFICIARIO_CREDITO_VIVIENDA === 'S'?'S':'N',
                CREDITO_VIVIENDA_VIGENTE: this.state.CREDITO_VIVIENDA_VIGENTE === 'S'?'S':'N',
                SERVICIOS: stringServi.trim(),
                HABITANTES_VIVIENDA: parseInt(this.state.HABITANTES_VIVIENDA),
                CODIGO_EMPRESA: empresa
            };

            const urlSave =  `${baseUrl}/v1/vivienda/crearRegistroVivienda`;

            postData(urlSave,datos).then(result =>{

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
                }else{
                    console.log('trusky',result[0]);
                }
            })

        }
    }

    loadDataPrincipal = () =>{
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])
        const datos = { NRO_DOCUMENTO:cedula,EMP_CODIGO:empresa };
        const url = `${baseUrl}/v1/vivienda/consultarDatosVivienda`;
        loadDataValidate()
        postData(url,datos).then(result =>{
            const dataNew = result[0];
            this.setState({
                TIPO_VIVIENDA: dataNew.TIPO_VIVIENDA?dataNew.TIPO_VIVIENDA:'',
                PERIMETRO: dataNew.PERIMETRO?dataNew.PERIMETRO:'',
                ESTRATO: dataNew.ESTRATO? dataNew.ESTRATO:'',
                BENEFICIARIO_CREDITO_VIVIENDA: dataNew.BENEFICIARIO_CREDITO_VIVIENDA?dataNew.BENEFICIARIO_CREDITO_VIVIENDA:'',
                CREDITO_VIVIENDA_VIGENTE: dataNew.CREDITO_VIVIENDA_VIGENTE?dataNew.CREDITO_VIVIENDA_VIGENTE:'',
                SERVICIOS: dataNew.SERVICIOS?dataNew.SERVICIOS:'',
                HABITANTES_VIVIENDA: dataNew.HABITANTES_VIVIENDA?dataNew.HABITANTES_VIVIENDA:''
            })
                this.checkbosValidatecheck()
        })
    }


    changeState = (input) =>{
        var els = document.getElementsByClassName("checkServices");
        let stringServi = ''; 
        for(var i = 0; i < els.length; i++)
        {
            if (els[i].checked)
            {
                stringServi += els[i].value +' '
            }
        }
        this.setState({SERVICIOS:stringServi.trim()})
        this.checkbosValidatecheck()
    }


    checkbosValidatecheck = () => {
        // consultar  tipo aervicios
        const urlServices = `${baseUrl}/v1/vivienda/consultarDatosServicios`;
        getData(urlServices).then(result =>{
            let option = result.map((value,x) => {   
            let valSer = false
        
            console.log(this.state.SERVICIOS);


            if(this.state.SERVICIOS){
                valSer = this.state.SERVICIOS.indexOf(value["TIP_NOMBRE"]) > -1 ? true:false
            }
            return  <div  key={x} className="form-check">
                    <input onChange={(e) => this.changeState(e.target)  }   checked={valSer}  className="form-check-input checkServices"  type="checkbox" id={`check${value["TIP_NOMBRE"]}`}  value={value["TIP_NOMBRE"]} />
                    <label className="form-check-label" htmlFor={`check${value["TIP_NOMBRE"]}`}>{value["TIP_NOMBRE"]}</label>
                </div>
                
                }
            );
            this.setState({dataServices:option});             
        });
    }

    render(){
        const {dataTypeLivinPlace,dataPerimeter,dataStratum,TIPO_VIVIENDA,PERIMETRO,ESTRATO,BENEFICIARIO_CREDITO_VIVIENDA,CREDITO_VIVIENDA_VIGENTE,HABITANTES_VIVIENDA,dataServices} = this.state;

        return <>
            <div className="card">
                <div  className="card-header">Vivienda</div>
            </div>
            &nbsp;
            <div className="card">
                <div className="card-body active">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label htmlFor="typeLyving">Tipo de vivienda:<span className="text-danger">*</span></label>
                            <select value={TIPO_VIVIENDA} onChange={e => this.setState({TIPO_VIVIENDA:e.target.value})} ref={el => this.campo1 = el} className="form-select inputRequired" name="typeLyving"  id="typeLyving" >
                                <option value=""></option>
                                {dataTypeLivinPlace}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label htmlFor="typePerimeter">Per&iacute;metro:<span className="text-danger">*</span></label>
                            <select value={PERIMETRO} onChange={e => this.setState({PERIMETRO:e.target.value})} ref={el => this.campo2 = el} className="form-select inputRequired" name="typePerimeter"  id="typePerimeter" >
                                <option value=""></option>
                                {dataPerimeter}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label htmlFor="typeStratum">Estrato:<span className="text-danger">*</span></label>
                            <select value={ESTRATO} onChange={e => this.setState({ESTRATO:e.target.value})} ref={el => this.campo3 = el} className="form-select inputRequired" name="typeStratum"  id="typeStratum" >
                                <option value=""></option>
                                {dataStratum}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4 ">
                            <label htmlFor="credit">&#191;Es beneficiario de cr&eacute;dito de vivienda&#63;<span className="text-danger">*</span></label>
                        <div className=" d-flex justify-content-around">
                                        <input type="radio" name="credit" value="S" checked={BENEFICIARIO_CREDITO_VIVIENDA === 'S'?true:false}  ref={el => this.campo4 = el} onChange={e => this.setState({BENEFICIARIO_CREDITO_VIVIENDA:e.target.value})} className="form-check btn-check inputRequired" id="radiocredit" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocredit">SI</label>&nbsp;
                                        <input type="radio" name="credit"  value="N" checked={BENEFICIARIO_CREDITO_VIVIENDA === 'N'?true:false}  ref={el => this.campo4 = el} onChange={e => this.setState({BENEFICIARIO_CREDITO_VIVIENDA:e.target.value})}  className="form-check btn-check " id="radiocredit2" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocredit2">No</label>
                            </div>                                      
                        </div>

                        <div className="col-sm-12 col-md-4 pb-4">
                            <label htmlFor="creditActual">&#191;Alg&uacute;n cr&eacute;dito de vivienda vigente&#63;<span className="text-danger">*</span></label>
                            <div className=" d-flex justify-content-around ">
                                        <input type="radio" name="creditActual" checked={CREDITO_VIVIENDA_VIGENTE === 'S'?true:false}  value="S" ref={el => this.campo5 = el} onChange={e => this.setState({CREDITO_VIVIENDA_VIGENTE:e.target.value})} className="btn-check inputRequired" id="radiocreditActual" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocreditActual">SI</label>&nbsp;
                                        <input type="radio" name="creditActual" checked={CREDITO_VIVIENDA_VIGENTE === 'N'?true:false}  value="N" ref={el => this.campo5 = el} onChange={e => this.setState({CREDITO_VIVIENDA_VIGENTE:e.target.value})} className="btn-check " id="radiocreditActual2" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocreditActual2">NO</label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label htmlFor="peopleinHome">&#191;Cu&aacute;ntas personas habitan la vivienda&#63;<span className="text-danger">*</span></label>
                            <input value={HABITANTES_VIVIENDA} onChange={e => this.setState({HABITANTES_VIVIENDA:e.target.value}) } type="number" className="form-control inputRequired" ref={el => this.campo6 = el} id="peopleinHome" name="peopleinHome"></input>
                        </div>

                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>&#191;Con qu&eacute; servicios cuenta&#63;</label>
                            {dataServices}
                        </div>

                    </div>

                    <div className="row ">
                        <div className="col d-flex flex-wrap justify-content-end">
                            <button onClick={() => this.saveLivingPlace()} className="btn succesButton">Guardar</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    }

    }

export default LivingPlace;