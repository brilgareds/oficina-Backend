import React, { useState } from 'react';
import  { Redirect } from 'react-router-dom'
import { PersonalCampo } from '../../components/CheckIn/PersonalCampo/PersonalCampo';
import { Sedes } from '../../components/CheckIn/Sedes/Sedes';
import { routes } from '../../environments/environments';
import { useIngreso } from './useIngreso';

export const Ingreso = () => {

    const {
        mainInfo,
        finished,
        formCheckIn,
        hasMainInfo,
        tipoIngresos,
        userHasSurvey,
        userHasCheckIn,
        setFormCheckIn,
        userHasCheckOut,
        handleFormSubmit,
        handleCheckUpdate
    } = useIngreso();

    console.log('Form is: ', formCheckIn)

    return (
        (finished) ?
            <Redirect to='/' /> : 

        (hasMainInfo) ? (
            (!userHasSurvey) ? <Redirect to={routes.encuestaRiesgoCovid.url} />
            :
            <>
                <div className="card mb-3">
                    <div className="card-header position-relative text-center text-md-start ps-md-5" style={{ paddingLeft: '3rem' }}>
                        <div className="col-12">
                            {
                                (!userHasCheckIn) ?
                                    <h3>Registrar Entrada</h3> :
                                (!userHasCheckOut) ?
                                    <h3>Registrar Salida</h3> :
                                <h3>Registro finalizado</h3>
                            }
                        </div>
                    </div>
                </div>

                <div className="card pt-3 pb-5">
                    <div className="card-body bg-light">
                        <form onSubmit={handleFormSubmit}>
                            <div className='offset-1 col-10 mb-4 mt-2'>
                                <div className="form-check" style={{paddingLeft: '0', marginBottom: '1rem'}}>
                                    <label className="form-check-label">Tipo ingreso:</label>
                                </div>{
                                tipoIngresos.map(({id, title}) => (
                                    <div key={id}>
                                        <div className='form-check'>
                                            <input className='form-check-input' type='radio' name='tipoIngreso' id={id} value={id} checked={formCheckIn.typeCheckIn === id} onChange={handleCheckUpdate} disabled={userHasCheckIn} required />
                                            <label className='form-check-label' htmlFor={id}>
                                                { title }
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                <div className='offset-1 col-10'>{
                                    (formCheckIn.typeCheckIn === 1165) ? <PersonalCampo form={formCheckIn} setForm={setFormCheckIn} userHasCheckIn={userHasCheckIn} /> :
                                    (formCheckIn.typeCheckIn === 1166) ? <Sedes         form={formCheckIn} setForm={setFormCheckIn} userHasCheckIn={userHasCheckIn} userHasCheckOut={userHasCheckOut} /> : <></> }
                                </div>

                                <div className='offset-1 col-10 text-center text-md-end'>
                                    {
                                        (!userHasCheckIn) ?
                                            <button type='submit' className='btn btn-primary col-12 col-sm-6 col-md-4 col-xl-3' disabled={!Object.keys(formCheckIn).length}>Realizar Ingreso</button> :
                                        (!userHasCheckOut) ?
                                            <button type='submit' className='btn btn-primary col-12 col-sm-6 col-md-4 col-xl-3' disabled={!Object.keys(formCheckIn).length}>Realizar Salida</button> :
                                        <button type='button' className='btn btn-primary col-12 col-sm-6 col-md-4 col-xl-3' disabled={true}>Realizar Salida</button>
                                    }
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        ) : <></>
    );
}