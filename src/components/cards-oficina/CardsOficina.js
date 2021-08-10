import React from 'react';
import './cardsOficina.css';

export const CardsOficina = () => {

    let oficinas = [
        {
            imgUrl: './assets/img/rrhh.jpg',
            nombre: 'RRHH',
            copy: 'Aquí encontraras acompañamiento en lo que necesites para tu bienestar integral como ser humano.',
        },
        {
            imgUrl: './assets/img/desarrollo.jpg',
            nombre: 'Desarrollo',
            copy: 'Organiza y gestiona lo que necesitas para tu desarrollo como nuestro trabajador.',
        },
        {
            imgUrl: './assets/img/sst.jpg',
            nombre: 'SST',
            copy: 'Como nuestro trabajador entendemos que tienes objetivos que alcanzar, aquí te damos las herramientas para que los consigas.',
        },
        {
            imgUrl: './assets/img/bienestar.jpg',
            nombre: 'Bienestar',
            copy: 'La seguridad y salud en trabajo son de vital importancia para nosotros! ingresa y llena los reportes COVID.',
        },
    ];

    return (

        oficinas.map(({ imgUrl, nombre, copy }, idx) => {
            return (
                <div id={idx} className='col-sm-12 col-lg-3 mb-4 zoom' >
                    <div className='card sombraCards'>
                        <div>
                            <img className='img-fluid imgHeaderCard' src={imgUrl} alt={nombre} />
                        </div>
                        <div className='card-body oficinaBotomCopy'>
                            <span className='card-title tittleCardOficina'>{nombre}</span> <br />
                            <span className='card-text bodyCardOficina'>{copy}</span>
                        </div>
                    </div>
                </div >
            );
        })

    )
}
