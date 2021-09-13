import React,{Component} from 'react';
import { routes } from '../../../environments/environments';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../config/config';
import { getData, postData } from '../../general/General';



class MenuCV extends Component{
    constructor(props) {
        super(props);
        this.state = {
          dataPrincipal: []
        };
      }

      componentDidMount() {
        const url = `${baseUrl}/v1/menuOV`;

        console.log("entra cada vez que renderiza")
        getData(url)
            .then(data => {
              if(!data){
                this.setState({
                    dataPrincipal: []
                  });
              }else{
                this.setState({
                    dataPrincipal: data
                });
              }
            });

            this.loadDataValidate()
      }
      loadDataValidate = () =>{
        const url = `${baseUrl}/v1/menuOV/formulariosCompletados`;
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])
        const datos = { NRO_DOCUMENTO:cedula,CODIGO_EMPRESA:empresa };

        postData(url,datos).then(element =>{
            console.log(element[0])
            const ele = element[0]
    
            if(ele.INFORMACION_BASICA_CODIGO){
                document.getElementById('colorCheck1').classList.remove('checkGrey')
                document.getElementById('colorCheck1').classList.add('checkGreen')
            }
            if(ele.EDUCACION_CODIGO){
                document.getElementById('colorCheck2').classList.remove('checkGrey')
                document.getElementById('colorCheck2').classList.add('checkGreen')
            }
            if(ele.FAMILIARES_CODIGO){
                document.getElementById('colorCheck3').classList.remove('checkGrey')
                document.getElementById('colorCheck3').classList.add('checkGreen')
            }
            if(ele.DATOS_ADICIONALES_CODIGO){
                document.getElementById('colorCheck4').classList.remove('checkGrey')
                document.getElementById('colorCheck4').classList.add('checkGreen')
            }
            if(ele.SALUD_CODIGO){
                document.getElementById('colorCheck5').classList.remove('checkGrey')
                document.getElementById('colorCheck5').classList.add('checkGreen')
            }
            if(ele.VIVIENDA_CODIGO){
                document.getElementById('colorCheck6').classList.remove('checkGrey')
                document.getElementById('colorCheck6').classList.add('checkGreen')
            }



        })

      }

      render(){
        const { dataPrincipal } = this.state;

        return <>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-vertical navbar-expand-xl" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

                        <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                            <div className="toggle-icon-wrapper">
                                <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                            </div>
                            <Link to={{ pathname: routes.home.url }}>

                                <div className="navbar-brand">
                                    <div className="d-flex align-items-center py-3">
                                        <img className="me-2" src="/assets/img/logo-vum-login.svg" alt="" width="80" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <p></p>
                        <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                            <div className="navbar-vertical-content scrollbar navbarPadding mb-2">
                                <ul className="list-group  navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ minHeight: '100%', padding: '0 0 13px 0', paddingTop: '0px' }}>
                                     {/* <ul class="list-group list-group-flush"> */}
                                    {
                                    dataPrincipal.map((value,x) => 
                                       {

                                        let str = value.MENU_NOMBRE;
                                        let res = str.replace(" ", "_"); 
                                             return   <Link presiono="true" key={x}  className="nav-link list-group-flush" to={res.toLowerCase()}>
                                                <li  className=" list-group-item d-flex justify-content-between align-items-center">
                                                    <div className="col-auto navbar-vertical-label listnavCV">{value.MENU_NOMBRE}</div>
                                                        {/* {value.MENU_NOMBRE} */}
                                                        <i id={`colorCheck${value.MENU_CODIGO}`} className="fas fa-check-circle addClassChecks checkGrey "></i>
                                                </li>
                                                </Link>
                                        })
                                    }

                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
      }



}

export {MenuCV};


