import React from 'react';
import './cardsOficina.css';
import { routes } from '../../environments/environments.ts';
import { Link } from 'react-router-dom';

export const CardsOficina = () => {

    let oficinas = [
        {
            imgUrl: '/assets/img/rrhh.jpg',
            nombre: 'RRHH',
            copy: 'Aquí encontrarás acompañamiento en lo que necesites para tu bienestar integral como ser humano.',
            redirecTo: routes.rrhh.url,
        },
        {
            imgUrl: '/assets/img/desarrollo.jpg',
            nombre: 'Desarrollo',
            copy: 'Organiza y gestiona lo que necesitas para tu desarrollo como nuestro trabajador.',
            redirecTo: routes.desarrollo.url,
        },
        {
            imgUrl: '/assets/img/sst.jpg',
            nombre: 'SST',
            copy: 'Como nuestro trabajador "entendemos que tienes objetivos que alcanzar", aquí te damos las herramientas para que los consigas.',
            redirecTo: routes.sst.url,
        },
        {
            imgUrl: '/assets/img/bienestar.jpg',
            nombre: 'Bienestar',
            copy: 'La seguridad y salud en trabajo son de vital importancia para nosotros. Ingresa y llena los reportes COVID.',
            redirecTo: routes.bienestar.url,
        },
    ];

    return (
        <div className="container-cards">{
            oficinas.map(({ imgUrl, nombre, copy, redirecTo }, idx) => {
                return (
                    <div key={idx} style={{ with: '100%' }} className='zoom' >
                        <Link to={{ pathname: redirecTo }}>
                            <div className='card sombraCards' style={{ height: '100%' }}>
                                <div style={{  }}>
                                    <img className='img-fluid imgHeaderCard' style={{  }} src={imgUrl} alt={nombre} />
                                </div>
                                <div className='card-body oficinaBotomCopy' style={{ height: '100%', maxHeight: '100%' }}>
                                    <span className='card-title tittleCardOficina'>{nombre}</span> <br />
                                    <span className='card-text bodyCardOficina'>{copy}</span>
                                </div>
                            </div>
                        </Link>
                    </div >
                );
            })}
        </div>
    )
}
