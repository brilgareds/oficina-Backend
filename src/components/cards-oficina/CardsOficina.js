import React from 'react';
import './cardsOficina.css';
import { routes } from '../../environments/environments.ts';
import { Link } from 'react-router-dom';

export const CardsOficina = () => {

    let oficinas = [
        {
            imgUrl: '/assets/img/rrhh.jpg',
            nombre: 'RRHH',
            copy: '¡Estamos para ti! Encuentra en este espacio el acompañamiento para tu bienestar integral.',
            redirecTo: routes.rrhh.url,
        },
        {
            imgUrl: '/assets/img/desarrollo.jpg',
            nombre: 'Desarrollo',
            copy: 'Actualízate y capacítate para llevar tus conocimientos a otro nivel.',
            redirecTo: routes.desarrollo.url,
        },
        {
            imgUrl: '/assets/img/sst.jpg',
            nombre: 'SST',
            copy: 'Queremos que seas un talento seguro, es por esto que, encontrarás en este espacio las herramientas para lograrlo.',
            redirecTo: routes.sst.url,
        },
        {
            imgUrl: '/assets/img/bienestar.jpg',
            nombre: 'Bienestar',
            copy: 'Nos interesa el bienestar integral de nuestros trabajadores, ingresa aquí para conocer todos tus beneficios.',
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
