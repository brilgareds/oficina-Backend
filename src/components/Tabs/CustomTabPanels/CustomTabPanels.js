import React from 'react';
import { Preguntas } from '../../../components/Preguntas/Preguntas';
import { TabPanel } from 'react-tabs';

export const CustomTabPanels = ({encuestas, nextTab, setFormEncuestaRiesgoCovid}) => {

    if (!encuestas || !encuestas.length) return <></>;

    return (
        <>
            {
                encuestas.map(encuesta => {

                    return (
                        <TabPanel key={encuesta.cod}>
                            <Preguntas encuesta={ encuesta } nextTab={ nextTab } setFormEncuestaRiesgoCovid={ setFormEncuestaRiesgoCovid } />
                        </TabPanel>
                    );
                })
            }
        </>
    )
}