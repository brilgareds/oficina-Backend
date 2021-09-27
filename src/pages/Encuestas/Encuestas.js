import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';
import { Redirect } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import './encuestas.css';
import { useEncuestas } from './useEncuestas';
import { Report } from '../Report/Report';
import { Preguntas } from '../../components/Preguntas/Preguntas';
import { routes } from '../../environments/environments';

export const Encuestas = ({ tipoEncuesta= '' }) => {

    const {
        encuestas, tabIndex, currentQuestions, setCurrentQuestions,
        existeProximoTab, nextTab, formEncuesta, setFormEncuesta,
        formularioEnviado, dataReport
    } = useEncuestas({tipoEncuesta});

    if (!encuestas || !encuestas.length) return <></>;

    if (!formEncuesta[tabIndex]) {
        setFormEncuesta(old_value => {
            if (!old_value[tabIndex]) old_value[tabIndex] = {};
            return old_value;
        })
    }

    const showButtonCheckIn = !!(tipoEncuesta === 'riesgoCovid');

    return (
        <>
            <div className="card mb-3">
                <div className="bg-holder d-none d-lg-block bg-card"></div>
                <div className="card-header position-relative text-center text-md-start ps-md-5" style={{ paddingLeft: '3rem' }}>
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
                                    <Tabs selectedIndex={tabIndex} onSelect={() => (()=>{})}>
                                        <TabList style={{ borderBottom: '0px' }}>
                                            { encuestas.map(({ COD_EC, EC_NOMBRE }) => <Tab key={COD_EC}>{EC_NOMBRE}</Tab>) }
                                        </TabList>
                                        <hr/>
                                        <span>Maximo total de preguntas: </span><br/><br/>
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
                                (tipoEncuesta === 'riesgoCovid') ?
                                    <Report showButtonCheckIn={showButtonCheckIn} dataReport={dataReport} />
                                    :
                                    <Redirect to={routes.home.url} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
