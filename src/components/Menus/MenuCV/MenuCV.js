import React,{ useEffect, useState} from 'react';
import { routes } from '../../../environments/environments';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../config/config';
import { getData, loadDataValidate } from '../../general/General';
import { ToggleIcon } from '../../toggleIcon/ToggleIcon';

const MenuCV= () => {
      const [dataPrincipal, setDataPrincipal] = useState(null)
      const [dataClose, setdataClose] = useState(true)

      useEffect(() => {
        const url = `${baseUrl}/v1/menuOV`;
        getData(url).then(data => {
            if(data){
                setDataPrincipal(data)   
                setdataClose(false)      
                loadDataValidate()     
            }
            
          });
      }, [dataClose])
        return <>
                    <nav className="navbar navbar-light navbar-vertical navbar-expand-xl nabvarcv bg-white" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

                        <div className="d-flex align-items-center mb-2" style={{ paddingLeft: "5%" }}>
                            <div className="toggle-icon-wrapper">
                                <ToggleIcon />
                            </div>
                            <Link to={{ pathname: routes.home.url }}>

                                <div className="navbar-brand">
                                    <div className="d-flex align-items-center py-3">
                                        <img className="me-2" src="/assets/img/logo-vum-login.png" alt="" width="80" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                            <div className="navbar-vertical-content scrollbar navbarPaddingcv navbarPaddingcv mb-2">

                                {
                                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0  align-items-start " style={{margin:'3px'}}>
                                        {
                                        !dataPrincipal?[]: dataPrincipal.map((value,x) => {
                                            let str = value.MENU_NOMBRE;
                                            let res = str.replace(" ", "_"); 
                                            return  <li class="nav-item" key={x} >
                                                        <Link  to={res.toLowerCase()} class="nav-link align-middle px-0">
                                                            <i id={`colorCheck${value.MENU_CODIGO}`} class={`${value.MENU_ICONO}  checkGrey me-3 fs-1`}></i> <span class="ms-1 ">{str}</span>
                                                        </Link>
                                                    </li>
                                        
                                        
                                        })
                                        }
                                    </ul>
                                }
                            </div>
                            <Link to={{ pathname: routes.home.url }}>
                                <div className="d-flex row row-cols-1  bg-CV colorBackButton align-self-center pm-2">
                                    <div className="col text-center"><i className="fas fa-arrow-alt-circle-left fa-2x"></i></div>
                                    <div className="col text-center"> <span className="col-auto navbar-vertical-label fw-bold">Regresar</span></div>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </>
}

export {MenuCV};