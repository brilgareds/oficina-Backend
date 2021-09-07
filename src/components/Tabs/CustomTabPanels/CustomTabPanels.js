import React from 'react';
import { Preguntas } from '../../../components/Preguntas/Preguntas';
import { TabPanel } from 'react-tabs';

export const CustomTabPanels = ({encuestas, nextTab, setFormEncuesta}) => {

    if (!encuestas || !encuestas.length) return <></>;

    return (
        <>
            {
                encuestas.map(encuesta => {

                    return (
                        <TabPanel key={encuesta.cod}>
                            <Preguntas encuesta={ encuesta } nextTab={ nextTab } setFormEncuesta={ setFormEncuesta } />
                        </TabPanel>
                    );
                })
            }
        </>
    )
}