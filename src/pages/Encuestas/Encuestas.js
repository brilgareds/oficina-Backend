import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './encuestas.css';
import { useEncuestas } from './useEncuestas';
import { Report } from '../Report/Report';
import { Preguntas } from '../../components/Preguntas/Preguntas';

export const Encuestas = ({ tipoEncuesta= '' }) => {

    const {
        encuestas, tabIndex, setTabIndex, currentQuestions, setCurrentQuestions,
        existeProximoTab, nextTab, formEncuesta, setFormEncuesta,
        formularioEnviado
    } = useEncuestas({tipoEncuesta});

    if (!encuestas || !encuestas.length) return <></>;

    if (!formEncuesta[tabIndex]) {
        setFormEncuesta(old_value => {
            if (!old_value[tabIndex]) old_value[tabIndex] = {};
            return old_value;
        })
    }

    console.log('\nencuestas: ', encuestas)

    return (
        <>
            <div className="card mb-3">
                <div className="card-header position-relative" style={{ paddingLeft: '3rem' }}>
                    <div className="col-12">
                        <h3>{
                            (tipoEncuesta === 'casosCovid')          ? 'Encuesta Casos Covid'           :
                            (tipoEncuesta === 'cercoEpidemeologico') ? 'Encuesta Cerco epidemiológico'  :
                            (tipoEncuesta === 'riesgoCovid')         ? 'Encuesta Riesgo Covid'          : '' }
                        </h3>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light">
                    <div id="formularioEncuesta">
                        <div className="row">
                            <div className="col-12 mt-3 mb-3" id="container-questions">{
                                (!formularioEnviado) ? 
                                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                                        <TabList style={{ borderBottom: '0px' }}>
                                            { encuestas.map(({ COD_EC, EC_NOMBRE }) => <Tab key={COD_EC}>{EC_NOMBRE}</Tab>) }
                                        </TabList>
                                        <hr/>
                                        <div style={{ paddingTop: '2rem' }}>{
                                            encuestas.map(encuesta => {
                                                const key = encuesta.COD_EC;
                                    
                                                return (
                                                    <TabPanel key={key}>
                                                        <Preguntas currentQuestions={currentQuestions} init={currentQuestions[tabIndex]} setCurrentQuestions={setCurrentQuestions} existeProximoTab={ existeProximoTab } encuesta={ encuesta } tabIndex={tabIndex} nextTab={ nextTab } formEncuesta={ formEncuesta } setFormEncuesta={ setFormEncuesta } />
                                                    </TabPanel>
                                                );
                                            })}
                                        </div>
                                    </Tabs>
                                    :
                                    <Report/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
