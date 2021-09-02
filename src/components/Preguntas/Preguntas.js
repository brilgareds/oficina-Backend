import React from 'react';
import { usePreguntas } from './usePreguntas';
import { Multiple } from '../Inputs/Multiple/Multiple';
import { Simple } from '../Inputs/Simple/Simple';
import './test.css';
import { Text } from '../Inputs/Text/Text';
import { Numeric } from '../Inputs/Numeric/Numeric';

export const Preguntas = ({ encuesta, formEncuestaRiesgoCovid, setFormEncuestaRiesgoCovid, nextTab, tabIndex, currentQuestions, setCurrentQuestions }) => {
    
    let i = 0;
    let currentArray_0 = {};
    const { agregarPregunta, preguntas, esRespuestaUnica, handleSubmit } = usePreguntas({ encuesta, nextTab, tabIndex, init: currentQuestions[tabIndex], setFormEncuestaRiesgoCovid, currentQuestions, setCurrentQuestions });


    return (
        <form onSubmit={ handleSubmit }> {

            (preguntas || Object.keys(preguntas).length) &&

            Object.keys(preguntas).map(prop => {

                if (preguntas[prop] && preguntas[prop].respuestas && preguntas[prop].respuestas.length) {
                    preguntas[prop].respuestas.map(esRespuestaUnica);
                }

                const obj = preguntas[prop];
                currentArray_0[prop] = obj;
                const currentArray = Object.assign({}, currentArray_0);

                const { pregunta, respuestas, tipoRespuesta } = obj;

                const iteracionPregunta = ++i;

                return (
                    <div 
                        key={ prop }
                        className={ (iteracionPregunta !== 1) ? 'question-container' : '' }
                        id={prop}
                    >
                        <div className={ (iteracionPregunta !== 1) ? 'question' : '' }>
                            <span className="div-pregunta">
                                <span className="numeracion-pregunta">{ iteracionPregunta }.</span>
                                <span className="descripcion-pregunta">{ pregunta }</span>
                            </span> {
                                /*
                                    tipoRespuesta:   'M' = Multiple, 'U' = Simple, 'A' = Abierta 'F' = fecha SED  ??? 0.0  ??? NUM  ???    detalle: 'TXT'
                                */

                            (respuestas) && 
                                <div className="div-form-check"> {
                                    (tipoRespuesta === 'S') ? <Simple   prop={prop} tabIndex={tabIndex} nextTab={nextTab} items={respuestas}    currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuestaRiesgoCovid={ formEncuestaRiesgoCovid } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } /> : 
                                    (tipoRespuesta === 'M') ? <Multiple prop={prop} tabIndex={tabIndex} nextTab={nextTab} items={respuestas}    currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuestaRiesgoCovid={ formEncuestaRiesgoCovid } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } /> : 
                                    (tipoRespuesta === 'N') ? <Numeric  prop={prop} tabIndex={tabIndex} nextTab={nextTab} item={respuestas[0]}  currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuestaRiesgoCovid={ formEncuestaRiesgoCovid } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } /> : 
                                    (tipoRespuesta === 'A') ? <Text     prop={prop} tabIndex={tabIndex} nextTab={nextTab} item={respuestas[0]}  currentArray={currentArray} agregarPregunta={ agregarPregunta } formEncuestaRiesgoCovid={ formEncuestaRiesgoCovid } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } /> : '' /* Multiple */ }
                                </div>}
                        </div>
                    </div>
                )
            })
    }   
            <div className="div-form-check">
                <div className="text-end" style={{ marginTop: '3rem' }}>
                    <button type='submit' className="btn btn-primary" style={{ width: 'min(16rem, 100%)', marginTop: '1rem' }} >
                        Siguiente
                    </button>
                </div>
            </div>
        </form>
    )
}