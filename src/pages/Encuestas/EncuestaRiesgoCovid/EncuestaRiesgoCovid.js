import React, { useState, useEffect } from 'react';
import { Preguntas } from '../../../components/Preguntas/Preguntas';
import { getPreguntasRiesgoCovid } from '../../../repositories/Encuestas/Encuentas';
import './encuestaRiesgoCovid.css';


export const EncuestaRiesgoCovid = () => {

    const [preguntasRiesgoCovid, setPreguntasRiesgoCovid] = useState({});
    const [, setFormEncuestaRiesgoCovid] = useState({});

    useEffect(() => {
        document.getElementById('root').className = 'encuestaRiesgoCovid';
    }, []);

    useEffect(() => {

        const getPreguntas = () => {
            return getPreguntasRiesgoCovid()
                .then(a => {
                    setPreguntasRiesgoCovid(a);
                })
        };

        
        getPreguntas();
    }, []);


    const submitEncuesta = (e) => {
        e.preventDefault();

    };
    

    return (
        <>
            <div className="card mb-3">
                <div className="card-body position-relative" style={{ paddingLeft: '3rem' }}>
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Sintomatología</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light">
                    <form id="formularioEncuesta" onSubmit={ submitEncuesta }>
                        <div className="row">
                            <div className="col-12 mt-3 mb-3" id="container-questions">
                                <Preguntas preguntasRiesgoCovid={ preguntasRiesgoCovid } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } />
                                <div className="text-end" style={{ marginTop: '3rem' }}>
                                    <button className="btn btn-primary">
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
