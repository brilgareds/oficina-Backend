import React from 'react';
import { CartaIngreoMateriales } from '../../../components/CartaIngreoMateriales/CartaIngreoMateriales';
import { CartaPuntoVenta } from '../../../components/CartaPuntoVenta/CartaPuntoVenta';
import { CartaPuntoVentaFueraHorario } from '../../../components/CartaPuntoVentaFueraHorario/CartaPuntoVentaFueraHorario';
import { Cities } from '../../../components/Cities/Cities';
import { SalesPoints } from '../../../components/SalesPoints/SalesPoints';
import { UnrelatedSalesPoints } from '../../../components/UnrelatedSalesPoints/UnrelatedSalesPoints';
import { useCartaPresentacion } from './useCartaPresentacion';

export const CartaPresentacion = () => {

    // const [cpPuntoVenta, setCpPuntoVenta] = useState(false);

    const {formPresentationCard, setFormPresentationCard } = useCartaPresentacion();
    const { typeCard } = formPresentationCard;
    console.log('formPresentationCard: ', formPresentationCard)

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
            id: 'cartaIngreoMateriales',
            title: 'Carta de ingreso de materiales a punto de venta'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form has: ', formPresentationCard);
    };

    const handleChangeTypeCard = (e) => {
        setFormPresentationCard(old_data => ({ ...old_data, typeCard: e.target.value }));
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
                <div className="card-header position-relative" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>Carta de presentacion</h3>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light" style={{ padding: '4rem 3rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className='offset-1 col-10 mb-4'>
                            <div className="form-check" style={{paddingLeft: '0', marginBottom: '1rem'}}>
                                <label className="form-check-label">Tipo de Carta:</label>
                            </div>{
                            tipoCartas.map(({id, title}) => (
                                <div className='form-check' key={id}>
                                    <input id={id} type='radio' name='carta_presentacion' className='form-check-input' value={id} checked={formPresentationCard?.typeCard === id} onChange={handleChangeTypeCard} />
                                    <label htmlFor={id} className='form-check-label'>{title}</label>
                                </div>
                            ))}
                        </div>

                        <div className='offset-1 col-10 mt-5'>
                            <div className='input-group containerCardsFilter' style={{ marginBottom: '1rem' }}>
                                <Cities setForm={handleCityChange} />
                                <SalesPoints filter={(formPresentationCard?.city || '').toLowerCase()} setForm={handleSalesPointChange} value={formPresentationCard?.salesPoints || []} />
                                <UnrelatedSalesPoints filter={(formPresentationCard?.city || '').toLowerCase()} setForm={handleUnrelatedSalesPointChange} value={formPresentationCard?.unrelatedsalesPoints || []} />
                            </div>{
                            (typeCard === 'cartaPuntoVenta')             ? <CartaPuntoVenta form={formPresentationCard} setForm={setFormPresentationCard} /> :
                            (typeCard === 'cartaIngreoMateriales')       ? <CartaIngreoMateriales form={formPresentationCard} setForm={setFormPresentationCard} /> : 
                            (typeCard === 'cartaPuntoVentaFueraHorario') ? <CartaPuntoVentaFueraHorario form={formPresentationCard} setForm={setFormPresentationCard} /> : <></> }
                        </div>

                        <div className='offset-1 col-10 mt-4 text-end'>
                            <span className='btn btn-primary'>Solicitar aprobación</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
