import React from 'react';
import { CartaIngresoMateriales } from '../../../components/CartaIngresoMateriales/CartaIngresoMateriales';
import { CartaPuntoVenta } from '../../../components/CartaPuntoVenta/CartaPuntoVenta';
import { CartaPuntoVentaFueraHorario } from '../../../components/CartaPuntoVentaFueraHorario/CartaPuntoVentaFueraHorario';
import { Cities } from '../../../components/Cities/Cities';
import { SalesPoints } from '../../../components/SalesPoints/SalesPoints';
import { UnrelatedSalesPoints } from '../../../components/UnrelatedSalesPoints/UnrelatedSalesPoints';
import { makeModal } from '../../../generalHelpers';
import { ResquestApproval } from '../../../repositories/PresentationCard/PresentationCard';
import { useCartaPresentacion } from './useCartaPresentacion';

export const CartaPresentacion = () => {

    // const [cpPuntoVenta, setCpPuntoVenta] = useState(false);

    const { formPresentationCard, setFormPresentationCard } = useCartaPresentacion();
    const { typeCard } = formPresentationCard;

    const tipoCartas = [
        {
            id: 'cartaPuntoVenta',
            title: 'Carta de presentación a punto de venta'
        },
        {
            id: 'cartaPuntoVentaFueraHorario',
            title: 'Carta de presentación a punto de venta con ingreso fuera de horario'
        },
        {
            id: 'cartaIngresoMateriales',
            title: 'Carta de ingreso de materiales a punto de venta'
        }
    ];

    const formatRequestBody = (data) => {
        const {
            city = '',
            materials = [],
            checkInTime = '',
            salesPoints = [],
            checkOutTime = '',
            unrelatedsalesPoints = []
        } = data;

        let response = {
            city,
            salesPoints: salesPoints.map(({ value }) => value),
            unrelatedsalesPoints: unrelatedsalesPoints.map(({ value }) => value)
        };

        if (data.typeCard === 'cartaIngresoMateriales') {
            Object.assign(response, {
                materials: materials.map(({ accion, cantidad, material }) => ({ accion, cantidad, material }))
            });
        }

        if (data.typeCard === 'cartaPuntoVentaFueraHorario') {
            Object.assign(response, {
                checkInTime,
                checkOutTime
            });
        }

        return response;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = formatRequestBody(formPresentationCard);

        ResquestApproval({ params })
            .then(response => {
                console.log('Response: ', response);

                const options = {
                    title: '',
                    text: '¡Carta de presentación generada correctamente!',
                    icon: 'success'
                };

                return makeModal(options);
            })
            .catch(err => { console.log('Error has: ', err) })
    };

    const handleChangeTypeCard = (e) => {
        setFormPresentationCard(old_data => ({ city: old_data?.city || '', materials: old_data?.materials || [], salesPoints: old_data?.salesPoints || [], unrelatedsalesPoints: old_data?.unrelatedsalesPoints || [], typeCard: e.target.value }));
    };

    const handleCityChange = (newData) => {
        setFormPresentationCard(old_data => ({ ...old_data, city: newData, salesPoints: [], unrelatedsalesPoints: [] }));
    };

    const handleSalesPointChange = (newData) => {
        setFormPresentationCard(old_data => ({ ...old_data, salesPoints: newData, unrelatedsalesPoints: [] }));
    };

    const handleUnrelatedSalesPointChange = (newData) => {
        setFormPresentationCard(old_data => ({ ...old_data, salesPoints: [], unrelatedsalesPoints: newData }));
    };


    return (
        <>
            <div className="card mb-3">
                <div className="card-header position-relative text-center text-md-start ps-md-5" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>Carta de presentación</h3>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light" style={{ padding: '4rem 3rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className='offset-1 col-10 mb-4'>
                            <div className="form-check" style={{ paddingLeft: '0', marginBottom: '1rem' }}>
                                <label className="form-check-label">Tipo de Carta:</label>
                            </div>{
                                tipoCartas.map(({ id, title }) => (
                                    <div className='form-check' key={id}>
                                        <input id={id} type='radio' name='carta_presentacion' className='form-check-input' value={id} checked={formPresentationCard?.typeCard === id} onChange={handleChangeTypeCard} />
                                        <label htmlFor={id} className='form-check-label'>{title}</label>
                                    </div>
                                ))}
                        </div>

                        <div className='offset-1 col-10 mt-5'>
                            <div className='input-group containerCardsFilter mb-5' style={{ marginBottom: '1rem' }}>
                                <Cities setForm={handleCityChange} />
                                <SalesPoints filter={(formPresentationCard?.city)} setForm={handleSalesPointChange} value={formPresentationCard?.salesPoints || []} />
                                <UnrelatedSalesPoints filter={(formPresentationCard?.city)} setForm={handleUnrelatedSalesPointChange} value={formPresentationCard?.unrelatedsalesPoints || []} />
                            </div>{
                                (typeCard === 'cartaPuntoVenta') ? <CartaPuntoVenta form={formPresentationCard} setForm={setFormPresentationCard} /> :
                                    (typeCard === 'cartaIngresoMateriales') ? <CartaIngresoMateriales form={formPresentationCard} setForm={setFormPresentationCard} /> :
                                        (typeCard === 'cartaPuntoVentaFueraHorario') ? <CartaPuntoVentaFueraHorario form={formPresentationCard} setForm={setFormPresentationCard} /> : <></>}
                        </div>

                        <div className='offset-1 col-10 mt-4 text-end'>
                            <button type='submit' className='btn succesButton'>Solicitar aprobación</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
