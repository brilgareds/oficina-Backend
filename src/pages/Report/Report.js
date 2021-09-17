import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments';
import { currentDate, getDocumentIdUser, getEmailUser, getFullNameUser, getGenderUser, getPhoneUser, getStatusUser } from '../../generalHelpers';
import './report.css';

export const Report = ({showButtonCheckIn, dataReport}) => {
    const testId = dataReport.survey.ENC_CODIGO;
    const fechaReg = dataReport.fechaReg || currentDate();
    const nombreEmpresa = dataReport?.logo[0].EMP_NOMBRE;
    const tipoDocumento = 'C';

    return (
        <div className='report-container'>
            <div className='row'>
                <div className='offset-1 offset-md-0 col-10 col-md-6 col-lg-3 mb-4'>
                    <h5  className='col-12 offset-md-0 col-md-12 mb-3' style={{fontWeight: '100', color: '#1780e8' }}>Reporte de la encuesta</h5>
                    <div className='col-12 offset-md-0 col-md-12 p-0'>Test caracterización: #{ testId }</div>
                    <div className='col-12 offset-md-0 col-md-12 p-0'>Fecha: { fechaReg }</div>
                    <div className='col-12 offset-md-0 col-md-12 p-0'>{ nombreEmpresa }</div>
                    <div className='col-12 offset-md-0 col-md-12 p-0'>Estado: { getStatusUser() }</div>
                </div>

                <div className='col-12 col-md-6 col-lg-4 mb-4'>
                    <h5  className='offset-1 col-10 offset-md-0 col-md-12 mb-3 p-0' style={{fontWeight: '100', color: '#1780e8' }}>Datos del colaborador</h5>
                    <div className='offset-1 col-10 offset-md-0 col-md-12 p-0'>Nombre: { getFullNameUser() }</div>
                    <div className='offset-1 col-10 offset-md-0 col-md-12 p-0'>Tipo de documento: { tipoDocumento }</div>
                    <div className='offset-1 col-10 offset-md-0 col-md-12 p-0'>Documento: { getDocumentIdUser() }</div>
                    <div className='offset-1 col-10 offset-md-0 col-md-12 p-0'>Género: { getGenderUser() }</div>
                    <div className='offset-1 col-10 offset-md-0 col-md-12 p-0'>Email: { getEmailUser() }</div>
                    <div className='offset-1 col-10 offset-md-0 col-md-12 p-0'>Teléfono: { getPhoneUser() }</div>
                </div>

                <div className='col-12 col-lg-5'>
                    <div className='mb-3 mensaje-covid' style={{background: `rgb${dataReport.score[0]}`, color: `rgb${dataReport.score[1]}` }}>{dataReport.score[2]}</div>
                    <div className='offset-1 col-10 mb-3 p-0 text-center'>
                        <Link to={ '/assets/documents/Recomendaciones_generales.pdf' } style={{ fontSize: '0.9rem' }} target='_blank'>Conoce aquí las recomendaciones asociadas al Covid-19</Link>
                    </div>
                </div>
                {
                    showButtonCheckIn && (
                        <Link to={ routes.ingreso.url } className='btn btn-primary offset-2 offset-md-5 offset-xl-8 col-8 col-md-6 col-xl-3 mt-3 pl-0 pr-0'>
                            Realizar ingreso <i className='bi bi-box-arrow-in-right'></i>
                        </Link>
                    )
                }
                
            </div>
        </div>
    )
}