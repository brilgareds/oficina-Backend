import React from 'react';
import { Tab, TabList } from 'react-tabs';

export const CustomTabs = ({encuestas}) => {
    
    return <TabList>{ encuestas.map(encuesta => <Tab key={encuesta.cod}>{encuesta.titulo}</Tab>) }</TabList>
}