import {Component} from 'react';
import {React} from 'react-dom';
import Swal from 'sweetalert2';
import { getData, postData } from '../../components/general/General';
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
        // consultar  tipo vivienda
        const urlPerimeter = `${baseUrl}/v1/vivienda/consultarDatosPerimetro`;
        getData(urlPerimeter).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_ATRIBUTO1"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataPerimeter:option});             
        });
        // consultar  tipo vivienda
        const urlStratum = `${baseUrl}/v1/vivienda/consultarDatosEstrato`;
        getData(urlStratum).then(result =>{
            let option = result.map((value,x) => <option  key={x} value={value["TIP_NOMBRE"]}>{value["TIP_NOMBRE"]}</option>);
            this.setState({dataStratum:option});             
        });
    }





    saveLivingPlace = () =>{

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
            TIPO_VIVIENDA: this.campo1.value,
            PERIMETRO: this.campo2.value,
            ESTRATO: parseInt(this.campo3.value),
            BENEFICIARIO_CREDITO_VIVIENDA: this.state.BENEFICIARIO_CREDITO_VIVIENDA === 'SI'?'S':'N',
            CREDITO_VIVIENDA_VIGENTE: this.state.CREDITO_VIVIENDA_VIGENTE === 'SI'?'S':'N',
            SERVICIOS: stringServi.trim(),
            HABITANTES_VIVIENDA: parseInt(this.campo6.value),
            CODIGO_EMPRESA: empresa
          };

          const urlSave =  `${baseUrl}/v1/vivienda/crearRegistroVivienda`;

          postData(urlSave,datos).then(result =>{
            console.log(result);

            if(result.status === 'ok'){
                console.log('se inserto ok');
                Swal.fire({
                    title: '',
                    text: "Se registro con éxito",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#2c7be5',
                    confirmButtonText: 'Cerrar'
                  })
                this.loadDataPrincipal();
            }else{
                console.log('trusky',result[0]);
            }
        })


    }

    loadDataPrincipal = () =>{
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])
        const datos = { NRO_DOCUMENTO:cedula,EMP_CODIGO:empresa };
        const url = `${baseUrl}/v1/vivienda/consultarDatosVivienda`;
        postData(url,datos).then(result =>{
            const dataNew = result[0];
            console.log(dataNew);
            this.setState({
                TIPO_VIVIENDA: dataNew.TIPO_VIVIENDA,
                PERIMETRO: dataNew.PERIMETRO,
                ESTRATO: dataNew.ESTRATO,
                BENEFICIARIO_CREDITO_VIVIENDA: dataNew.BENEFICIARIO_CREDITO_VIVIENDA,
                CREDITO_VIVIENDA_VIGENTE: dataNew.CREDITO_VIVIENDA_VIGENTE,
                SERVICIOS: dataNew.SERVICIOS,
                HABITANTES_VIVIENDA: dataNew.HABITANTES_VIVIENDA
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
            return  <div  key={x} className="form-check">
                    <input onChange={(e) => this.changeState(e.target)  }   checked={this.state.SERVICIOS.indexOf(value["TIP_NOMBRE"]) != -1 ? true:false  }  className="form-check-input checkServices"  type="checkbox" id={`check${value["TIP_NOMBRE"]}`}  value={value["TIP_NOMBRE"]} />
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
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>Tipo de vivienda:</label>
                            <select value={TIPO_VIVIENDA} onChange={e => this.setState({TIPO_VIVIENDA:e.target.value})} ref={el => this.campo1 = el} className="form-select inputRequiredForm" name="typeLyving"  id="typeLyving" >
                                <option value=""></option>
                                {dataTypeLivinPlace}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>Per&iacute;metro:</label>
                            <select value={PERIMETRO} onChange={e => this.setState({PERIMETRO:e.target.value})} ref={el => this.campo2 = el} className="form-select inputRequiredForm" name="typePerimeter"  id="typePerimeter" >
                                <option value=""></option>
                                {dataPerimeter}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>Estrato:</label>
                            <select value={ESTRATO} onChange={e => this.setState({ESTRATO:e.target.value})} ref={el => this.campo3 = el} className="form-select inputRequiredForm" name="typeStratum"  id="typeStratum" >
                                <option value=""></option>
                                {dataStratum}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4 ">
                            <label>&#191;Es beneficiario de cr&eacute;dito de vivienda&#63;</label>
                        <div className="input-group d-flex justify-content-around">
                                <div className="row ">
                                    <div className="col">
                                        <input type="radio" name="credit" value="S" checked={BENEFICIARIO_CREDITO_VIVIENDA === 'S'?true:false}  ref={el => this.campo4 = el} onChange={e => this.setState({BENEFICIARIO_CREDITO_VIVIENDA:e.target.value})} className="form-check btn-check inputRequiredFormRadio" id="radiocredit" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocredit">SI</label>
                                    </div>
                                    <div className="col">
                                        <input type="radio" name="credit"  value="N" checked={BENEFICIARIO_CREDITO_VIVIENDA === 'N'?true:false}  ref={el => this.campo4 = el} onChange={e => this.setState({BENEFICIARIO_CREDITO_VIVIENDA:e.target.value})}  className="form-check btn-check inputRequiredFormRadio" id="radiocredit2" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocredit2">No</label>
                                    </div>
                                </div> 
                            </div>                                      
                        </div>

                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>&#191;Tienes alg&uacute; cr&eacute;dito de vivienda vigente&#63;</label>
                            <div className="input-group d-flex justify-content-around ">
                                <div className="row">
                                    <div className="col">
                                        <input type="radio" name="creditActual" checked={CREDITO_VIVIENDA_VIGENTE === 'S'?true:false}  value="S" ref={el => this.campo5 = el} onChange={e => this.setState({CREDITO_VIVIENDA_VIGENTE:e.target.value})} className="btn-check inputRequiredFormRadio" id="radiocreditActual" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocreditActual">SI</label>
                                    </div>
                                    <div className="col ">
                                        <input type="radio" name="creditActual" checked={CREDITO_VIVIENDA_VIGENTE === 'N'?true:false}  value="N" ref={el => this.campo5 = el} onChange={e => this.setState({CREDITO_VIVIENDA_VIGENTE:e.target.value})} className="btn-check inputRequiredFormRadio" id="radiocreditActual2" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="radiocreditActual2">NO</label>
                                    </div>
                                </div>                                       
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>&#191;Cu&aacute;ntas personas habitan la vivienda&#63;</label>
                            <input value={HABITANTES_VIVIENDA} onChange={e => this.setState({HABITANTES_VIVIENDA:e.target.value}) } type="text" className="form-control inputRequiredForm" ref={el => this.campo6 = el} id="peopleinHome" name="peopleinHome"></input>
                        </div>

                        <div className="col-sm-12 col-md-4 pb-4">
                            <label>&#191;Con qu&eacute; servicios cuenta&#63;</label>
                            {dataServices}
                        </div>

                    </div>

                    <div className="row ">
                        <div className="col d-flex flex-wrap justify-content-end">
                            <button onClick={() => this.saveLivingPlace()} className="btn btn-primary">Guardar</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    }

    }

export default LivingPlace;