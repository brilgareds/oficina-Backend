import React, { useState } from 'react';
import  { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2';
import { PersonalCampo } from '../../components/CheckIn/PersonalCampo/PersonalCampo';
import { Sedes } from '../../components/CheckIn/Sedes/Sedes';

export const Ingreso = () => {

    const [formCheckIn, setFormCheckIn] = useState({});
    const [finished, setFinished] = useState(false)

    const handleCheckUpdate = (e) => {
        setFormCheckIn(() => ({ typeCheckIn: e.target.value }));
    };

    const tipoIngresos = [
        {
           id: 'ingresoHomeOffice',
           title: 'Home Office'
        },
        {
            id: 'ingresoPersonalDeCampo',
            title: 'Personal campo'
        },
        {
            id: 'ingresoSede',
            title: 'Sede'
        }
    ];

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form has: ', formCheckIn);

        Swal.fire({
            title: '',
            text: 'Ingreso realizado con exito!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#2c7be5',
            confirmButtonText: 'Cerrar'
        }).then(setFinished(true));
    };

    return (finished) ? <Redirect to='/' /> : (
        <>
            <div className="card mb-3">
                <div className="card-header position-relative text-center text-md-start ps-md-5" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>Formulario Ingreso</h3>
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
                                        <input className='form-check-input' type='radio' name='tipoIngreso' id={id} value={id} checked={formCheckIn.typeCheckIn === id} onChange={handleCheckUpdate} required />
                                        <label className='form-check-label' htmlFor={id}>
                                            { title }
                                        </label>
                                    </div>
                                </div>
                            ))}
                            <div className='offset-1 col-10'>{
                                (formCheckIn.typeCheckIn === 'ingresoPersonalDeCampo') ? <PersonalCampo form={formCheckIn} setForm={setFormCheckIn} /> :
                                (formCheckIn.typeCheckIn === 'ingresoSede')            ? <Sedes         form={formCheckIn} setForm={setFormCheckIn} /> : <></> }
                            </div>

                            <div className='offset-1 col-10 text-center text-md-end'>
                                <button type='submit' className='btn btn-primary col-12 col-sm-6 col-md-4 col-xl-3' disabled={!Object.keys(formCheckIn).length}>Ingresar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}