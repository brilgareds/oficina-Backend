import React from 'react';
import { usePreguntas } from './usePreguntas';
import { Multiple } from '../Inputs/Multiple/Multiple';
import { Simple } from '../Inputs/Simple/Simple';
import './test.css';
import { Text } from '../Inputs/Text/Text';
import { Numeric } from '../Inputs/Numeric/Numeric';
import { Date } from '../Inputs/Date/Date';
import { getDocumentIdUser } from '../../generalHelpers';

export const Preguntas = (props) => {

    const {
        nextTab,
        tabIndex,
        existeProximoTab,
        formEncuesta,
        setFormEncuesta
    } = props;

    let i = 0;
    let currentArray_0 = {};
    const { agregarPregunta, preguntas, handleSubmit } = usePreguntas(props);

    const fieldNeedDocumentId = ({isNumericField=false, preguntaSinTildes=''}) => (
        isNumericField && (
            preguntaSinTildes.substr(preguntaSinTildes.length-14) === 'identificacion'
            || 
            preguntaSinTildes.includes('identificacion reportante')
        )
    );

    return (
        <form onSubmit={ handleSubmit }> {

            (preguntas || Object.keys(preguntas).length) &&

            Object.keys(preguntas).map(prop => {

                const obj = preguntas[prop];
                currentArray_0[prop] = obj;
                const currentArray = Object.assign({}, currentArray_0);

                if (!obj) return <div key={ prop } ></div>;

                const { PREGUNTA:pregunta, responses:respuestas, SELECCION } = obj;

                const iteracionPregunta = ++i;
                const preguntaSinTildes = pregunta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

                const isNumericField  = (['N','0.0'].includes(SELECCION)) || preguntaSinTildes.includes('numero') || preguntaSinTildes.includes('dias acumulados');
                const isDateField     = (SELECCION === 'F');
                const isTextField     = (SELECCION === 'A' || ((respuestas[0]?.RESPUESTA || '') === 'txt')) && !isNumericField;
                const isRadioField    = (SELECCION === 'U');
                const isMultipleField = (SELECCION === 'M');
                
                const initDateField     = '';
                const initTextField     = '';
                const initNumericField  = fieldNeedDocumentId({isNumericField, preguntaSinTildes}) ? getDocumentIdUser() : '';
                const initRadioField    = '';
                const initMultipleField = '';

                const maxDecimals = (isNumericField && preguntaSinTildes.includes('temperatura')) ? 1 : 0;

                return (
                    <div 
                        key={ prop }
                        className={ (iteracionPregunta !== 1) ? 'question-container' : '' }
                        id={prop}
                    >
                        <div className={ (iteracionPregunta !== 1) ? 'question' : '' }>
                            <span className="div-pregunta">
                                <span className="numeracion-pregunta">{ iteracionPregunta }</span>
                                <span className="descripcion-pregunta">{ pregunta }</span>
                            </span> {
                                /*
                                    SELECCION:   'M' = Multiple, 'U' = Simple, 'A' = Abierta 'F' = fecha SED  ??? 0.0  ??? NUM  ???    detalle: 'TXT'
                                */

                            (respuestas) && 
                                <div className="div-form-check"> {
                                    (isDateField)     ? <Date     prop={prop} tabIndex={tabIndex} nextTab={nextTab} item={respuestas[0]}  currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuesta={ formEncuesta } setFormEncuesta={ setFormEncuesta } init={initDateField} /> :
                                    (isTextField)     ? <Text     prop={prop} tabIndex={tabIndex} nextTab={nextTab} item={respuestas[0]}  currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuesta={ formEncuesta } setFormEncuesta={ setFormEncuesta } init={initTextField} /> :
                                    (isNumericField)  ? <Numeric  prop={prop} tabIndex={tabIndex} nextTab={nextTab} item={respuestas[0]}  currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuesta={ formEncuesta } setFormEncuesta={ setFormEncuesta } init={initNumericField} maxDecimals={maxDecimals} /> :
                                    (isRadioField)    ? <Simple   prop={prop} tabIndex={tabIndex} nextTab={nextTab} items={respuestas}    currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuesta={ formEncuesta } setFormEncuesta={ setFormEncuesta } init={initRadioField} /> :
                                    (isMultipleField) ? <Multiple prop={prop} tabIndex={tabIndex} nextTab={nextTab} items={respuestas}    currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuesta={ formEncuesta } setFormEncuesta={ setFormEncuesta } init={initMultipleField} /> : '' }
                                </div>}
                        </div>
                    </div>
                )
            })
    }   
            <div className="div-form-check">
                <div className="text-end" style={{ marginTop: '3rem' }}>
                    <button type='submit' className="btn succesButton" style={{ width: 'min(16rem, 100%)', marginTop: '1rem' }} >
                        { (existeProximoTab) ? 'Siguiente' : 'Enviar Respuestas'}
                    </button>
                </div>
            </div>
        </form>
    )
}