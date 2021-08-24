import React from 'react';
import { usePreguntas } from '../../hooks/Preguntas/Preguntas';
import { Multiple } from '../Inputs/Multiple/Multiple';
import { Simple } from '../Inputs/Simple/Simple';
import './test.css';

export const Preguntas = ({ preguntasRiesgoCovid, setFormEncuestaRiesgoCovid }) => {

    
    let i = 0;
    let currentArray_0 = {};
    const { agregarPregunta, preguntas } = usePreguntas({ preguntasRiesgoCovid, setFormEncuestaRiesgoCovid });

    const esRespuestaUnica = respuesta => {
        respuesta.single = (respuesta?.detalle?.toLowerCase() === 'ninguna de las anteriores') ?? false;
    }


    return <div> {
        (preguntas || Object.keys(preguntas).length) ?

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
                                </span>{

                                /*
                                    tipoRespuesta

                                    'M' = Multiple,
                                    'U' = Simple,
                                    'A' = Abierta
                                    'F' = fecha
                                    SED  ???
                                    0.0  ???
                                    NUM  ???

                                    detalle: 'TXT'

                                */

                                

                                (respuestas) ? 
                                    <div className="div-form-check">
                                        {    
                                        
                                            (tipoRespuesta === 'S') ? <Simple   prop={prop} items={respuestas} currentArray={currentArray} agregarPregunta={ agregarPregunta } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid }/> : 
                                            (tipoRespuesta === 'M') ? <Multiple prop={prop} items={respuestas} currentArray={currentArray} agregarPregunta={ agregarPregunta } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } /> : '' // Multiple
                                            
                                        }
                                    </div> : '' }
                            </div>
                        </div>
                    )
                
            }) : ''
    } </div>
}