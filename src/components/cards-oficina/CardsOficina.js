import React from 'react';
import './cardsOficina.css';
import { environment } from '../../environments/environments.ts';
import { Link } from 'react-router-dom';

export const CardsOficina = () => {

    const { path } = environment;

    let oficinas = [
        {
            imgUrl: './assets/img/rrhh.jpg',
            nombre: 'RRHH',
            copy: 'Aquí encontraras acompañamiento en lo que necesites para tu bienestar integral como ser humano.',
            redirecTo: path.rrhh.url,
        },
        {
            imgUrl: './assets/img/desarrollo.jpg',
            nombre: 'Desarrollo',
            copy: 'Organiza y gestiona lo que necesitas para tu desarrollo como nuestro trabajador.',
            redirecTo: path.rrhh.url,
        },
        {
            imgUrl: './assets/img/sst.jpg',
            nombre: 'SST',
            copy: 'Como nuestro trabajador entendemos que tienes objetivos que alcanzar, aquí te damos las herramientas para que los consigas.',
            redirecTo: path.sst.url,
        },
        {
            imgUrl: './assets/img/bienestar.jpg',
            nombre: 'Bienestar',
            copy: 'La seguridad y salud en trabajo son de vital importancia para nosotros! ingresa y llena los reportes COVID.',
            redirecTo: path.rrhh.url,
        },
    ];

    return (

        oficinas.map(({ imgUrl, nombre, copy, redirecTo }, idx) => {
            return (
                <div id={idx} className='col-sm-12 col-lg-3 mb-4 zoom' >
                    <Link to={{ pathname: redirecTo }}>
                        <div className='card sombraCards'>
                            <div>
                                <img className='img-fluid imgHeaderCard' src={imgUrl} alt={nombre} />
                            </div>
                            <div className='card-body oficinaBotomCopy'>
                                <span className='card-title tittleCardOficina'>{nombre}</span> <br />
                                <span className='card-text bodyCardOficina'>{copy}</span>
                            </div>
                        </div>
                    </Link>
                </div >
            );
        })

    )
}
