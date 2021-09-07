import React from 'react';

export const CartaPresentacion = () => {

    // const [cpPuntoVenta, setCpPuntoVenta] = useState(false);

    return (
        <>
            <div className="card mb-3">
                <div className="card-header position-relative" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>Carta de presentacion</h3>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light" style={{ padding: '4rem 3rem' }}>
                    <div className='form-check'>
                        <input id='cp_punto_venta' type='radio' name='carta_presentacion' className='form-check-input' />
                        <label for='cp_punto_venta' className='form-check-label'>Carta de presentación a punto de venta</label>
                    </div>

                    <div className='form-check'>
                        <input id='cp_punto_venta_fuera_horario' type='radio' name='carta_presentacion' className='form-check-input' />
                        <label for='cp_punto_venta_fuera_horario' className='form-check-label'>Carta de presentación a punto de venta con ingreso fuera de horario</label>
                    </div>
                    <div className='form-check'>
                        <input id='ci_materiales' type='radio' name='carta_presentacion' className='form-check-input' />
                        <label for='ci_materiales' className='form-check-label'>Carta de ingreso de materiales a punto de venta</label>
                    </div>
                </div>
            </div>
        </>
    )
}
