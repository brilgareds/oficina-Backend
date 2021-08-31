import React, { useState, useEffect } from 'react';
import { getPreguntasRiesgoCovid } from '../../../repositories/Encuestas/Encuentas';
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './encuestaRiesgoCovid.css';
import { Preguntas } from '../../../components/Preguntas/Preguntas';


export const EncuestaRiesgoCovid = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const [encuestas, setEncuestas] = useState([]);
    const [formEncuestaRiesgoCovid, setFormEncuestaRiesgoCovid] = useState({});
    const [currentQuestions, setCurrentQuestions] = useState({});

    useEffect(() => {

        document.getElementById('root').className = 'encuestaRiesgoCovid';

        getPreguntasRiesgoCovid().then(setEncuestas);
    }, []);


    const nextTab = () => {
        setTabIndex(currentIndex => {
            const newIndex = currentIndex+1;
            const existeTab = encuestas[newIndex];

            if (existeTab) currentIndex = newIndex;
            else {
                console.log('No existe!')
            }

            return currentIndex;
        });
    };


    if (!encuestas || !encuestas.length) return <></>
    

    return (
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
            <div className="card mb-3">
                <div className="card-header position-relative" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>Encuesta Riesgo Covid</h3>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light">
                    <div id="formularioEncuesta">
                        <div className="row">
                            <div className="col-12 mt-3 mb-3" id="container-questions">
                                <TabList style={{ borderBottom: '0px' }}>
                                    { console.log('TEST') }
                                    { encuestas.map(encuesta => <Tab key={encuesta.cod}>{encuesta.titulo}</Tab>) }
                                </TabList>
                                <div style={{ paddingTop: '4rem' }}>{
                                    encuestas.map(encuesta => {
                                        console.log('encuesta: ', encuesta);
                            
                                        return (
                                            <TabPanel key={encuesta.cod}>
                                                <Preguntas currentQuestions={currentQuestions} setCurrentQuestions={setCurrentQuestions} encuesta={ encuesta } tabIndex={tabIndex} nextTab={ nextTab } formEncuestaRiesgoCovid={ formEncuestaRiesgoCovid } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } />
                                            </TabPanel>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Tabs>
    )
}
