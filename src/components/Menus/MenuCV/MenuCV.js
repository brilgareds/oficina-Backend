import React,{Component} from 'react';
import { routes } from '../../../environments/environments';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../config/config';
import { getData } from '../../general/General';



class MenuCV extends Component{
    constructor(props) {
        super(props);
        this.state = {
          dataPrincipal: []
        };
      }

      componentDidMount() {
        const url = `${baseUrl}/v1/menuOV`;
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
      }

      render(){
        const { dataPrincipal } = this.state;

        return <>
                    <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

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
                            <div className="navbar-vertical-content scrollbar navbarPaddingCV mb-2">
                                <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ minHeight: '100%', padding: '0 0 13px 0', paddingTop: '0px' }}>
                                    {
                                    dataPrincipal.map((value,x) => 
                                       {

                                        let str = value.MENU_NOMBRE;
                                        let res = str.replace(" ", "_"); 
                                           return <li key={x} className="nav-item">
                                                <Link presiono="true"  className="nav-link" to={res.toLowerCase()}>
                                                    <div className="d-flex align-items-center"><span className="nav-link-text ps-1 text-primaryNavbar">{value.MENU_NOMBRE}</span></div>
                                                </Link>
                                            </li>
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


