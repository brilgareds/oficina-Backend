import React, { useState } from 'react';
import { PersonalCampo } from '../../components/CheckIn/PersonalCampo/PersonalCampo';
import { Sedes } from '../../components/CheckIn/Sedes/Sedes';

export const Ingreso = () => {

    const [checkSede, setCheckSede] = useState(false);  
    const [checkHomeOffice, setCheckHomeOffice] = useState(false);
    const [checkPersonalCampo, setCheckPersonalCampo] = useState(false);

    const setCheck = functionSet => {
        setCheckSede(false);
        setCheckHomeOffice(false);
        setCheckPersonalCampo(false);

        functionSet(true);
    };

    return (
        <>
            <div className="card mb-3">
                <div className="card-header position-relative" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>Formulario Ingreso</h3>
                    </div>
                </div>
            </div>

            <div className="card pt-3 pb-5">
                <div className="card-body bg-light">
                    <div className='offset-1 col-10 mb-4 mt-2'>
                        <div className="form-check" style={{paddingLeft: '0', marginBottom: '1rem'}}>
                            <label className="form-check-label">Tipo ingreso:</label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='tipoIngreso' id='ingresoHomOffice' checked={checkHomeOffice} onChange={()=>setCheck(setCheckHomeOffice)}/>
                            <label className="form-check-label" htmlFor='ingresoHomOffice'>
                                Home Office
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='tipoIngreso' id='ingresoPersonalCampo' checked={checkPersonalCampo} onChange={()=>setCheck(setCheckPersonalCampo)} />
                            <label className="form-check-label" htmlFor='ingresoPersonalCampo'>
                                Personal campo
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='tipoIngreso' id='ingresoSede' checked={checkSede} onChange={()=>setCheck(setCheckSede)} />
                            <label className="form-check-label" htmlFor='ingresoSede'>
                                Sede
                            </label>
                        </div>
                    </div>

                    <div className='offset-1 col-10'>
                        {
                            (checkPersonalCampo) ? <PersonalCampo/> :
                            (checkSede)          ? <Sedes/>         : ''
                        }
                    </div>

                    <div className='offset-1 col-10 text-center text-md-end'>
                        {
                            (checkPersonalCampo || checkSede || checkHomeOffice) &&
                                <span className='btn btn-primary col-12 col-sm-6 col-md-4 col-xl-3'>Ingresar</span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}