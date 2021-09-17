import React,{Component} from 'react';
import { routes } from '../../../environments/environments';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../config/config';
import { getData, loadDataValidate } from '../../general/General';

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
              if(data){
                this.setState({
                    dataPrincipal: data
                });
              }
            });
            loadDataValidate()
        
      }
     

      render(){
        const { dataPrincipal } = this.state;

        return <>
                    <nav className="navbar navbar-light bg-white navbar-vertical navbar-expand-xl nabvarcv" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

                        <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                            <div className="toggle-icon-wrapper">
                                <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left">
                                    <span className="navbar-toggle-icon">
                                        <span className="toggle-line"></span>
                                    </span>
                                </button>
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
                            <div className="navbar-vertical-content scrollbar navbarPaddingcv navbarPaddingcv mb-2">
                                <ul className="list-group  navbar-nav flex-column mb-2" id="navbarVerticalNav" style={{ minHeight: '100%', padding: '0 0 13px 0', paddingTop: '0px' }}>
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
                                                        <i id={`colorCheck${value.MENU_CODIGO}`} className="fas fa-check-circle  checkGrey"></i>
                                                </li>
                                                </Link>
                                        })
                                    }

                                </ul>
                            </div>
                            <Link to={{ pathname: routes.home.url }}>
                            {/* <div className="d-flex justify-content-center  align-items-center bg-CV colorBackButton align-self-center p-3 ">
                                <i className="fas fa-arrow-alt-circle-left fa-2x d-flex justify-content-around p-1"></i>
                                 <div className="col-auto navbar-vertical-label  p-2 ">Regresar</div>
                            </div> */}
{/* 
                            <div className="d-flex justify-content-center align-items-center bg-CV colorBackButton align-self-center p-3 ">
                                <i className="fas fa-arrow-alt-circle-left fa-2x "></i>
                                <div className="col-auto navbar-vertical-label  ">Regresar</div>
                            </div> */}

                            <div className="d-flex row row-cols-1  bg-CV colorBackButton align-self-center pm-2">
                                <div className="col text-center"><i className="fas fa-arrow-alt-circle-left fa-2x"></i></div>
                                <div className="col text-center"> <div className="col-auto navbar-vertical-label ">Regresar</div></div>
                           
                            </div>

                            </Link>


            



                        </div>


                        

                    </nav>
                </>
      }



}

export {MenuCV};


