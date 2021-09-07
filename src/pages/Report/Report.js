import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments';
import { currentDate, getDocumentIdUser, getEmailUser, getFullNameUser, getGenderUser, getPhoneUser, getStatusUser } from '../../generalHelpers';
import './report.css';

export const Report = (obj={}) => {
    const testId = obj.testId || 385582;
    const fechaReg = obj.fechaReg || currentDate();
    const nombreEmpresa = obj.nombreEmpresa || 'Vision & Marketing S.A.S';
    const tipoDocumento = 'C';

    return (
        <div className='report-container'>
            <div className='row'>
                <h3  className='text-center mb-5' style={{fontWeight: '100'}}>Reporte de la encuesta</h3>
                <div className='offset-1 offset-md-1 col-10 col-md-5  mb-2 p-0'>Test caracterización: #{ testId }</div>
                <div className='offset-1 offset-md-0 col-10 col-md-5  mb-2 p-0'>Estado: { getStatusUser() }</div>
                <div className='offset-1 offset-md-1 col-10 col-md-10 mb-2 p-0'>Fecha: { fechaReg }</div>
                <div className='offset-1 offset-md-1 col-10 col-md-10 mb-2 p-0'>{ nombreEmpresa }</div>
                <div className='offset-1 offset-md-1 col-10 col-md-10 mb-2 p-0'><hr/>Datos del colaborador<hr/></div>        
                <div className='offset-1 offset-md-1 col-10 col-md-10 mb-2 p-0'>Nombre: { getFullNameUser() }</div>
                <div className='offset-1 offset-md-1 col-10 col-md-10 mb-2 p-0'>Tipo de documento: { tipoDocumento }</div>     
                <div className='offset-1 offset-md-1 col-10 col-md-5  mb-2 p-0'>Documento: { getDocumentIdUser() }</div>
                <div className='offset-1 offset-md-0 col-10 col-md-5  mb-2 p-0'>Email: { getEmailUser() }</div>      
                <div className='offset-1 offset-md-1 col-10 col-md-5  mb-2 p-0'>Género: { getGenderUser() }</div>
                <div className='offset-1 offset-md-0 col-10 col-md-5  mb-2 p-0'>Teléfono: { getPhoneUser() }</div>
                <div className='offset-xl-2 offset-1 col-10 col-xl-8  mb-4 mensaje-covid'>Sintomatología: Por favor mantenga las medidas de prevención relacionadas al uso del tapabocas, distanciamiento y lavado de manos.</div>
                
                <div className='offset-1 col-10 mb-3 p-0'>
                    <Link to={ '/assets/documents/Recomendaciones_generales.pdf' } target='_blank'>Conoce aquí las recomendaciones asociadas al Covid-19</Link>
                </div>

                <Link to={ routes.ingreso.url } className='btn btn-primary offset-1 offset-md-5 offset-xl-8 col-10 col-md-6 col-xl-3 pl-0 pr-0'>
                    Realizar ingreso <i className='bi bi-box-arrow-in-right'></i>
                </Link>
            </div>
        </div>
    )
}