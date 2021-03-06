import { api } from '../environments/environments';
import { capitalizarPalabras, getFetch, upperFirtLetterText } from '../generalHelpers';

const getAllBranches = async () => {
    const url = api.getAllBranches;
    const branches = await (await (url ? getFetch({ url }) : []) || []);
    const response = formatBranches(branches);

    return response;
};

const getCheckInAndCheckOutInfo = async () => {
    const url = api.getCheckInAndCheckOutInfo;
    const data = await (await (url ? getFetch({ url }) : {}) || {});
    const response = data;

    return response;
    ;
}

const getAllCities = async () => {
    const url = api.getAllCities;
    const cities = await (await (url ? getFetch({ url }) : { data: [] }) || { data: [] });
    const response = formatCities(cities.data);

    return response;
};

const getCitiesForASpecificPerson = async () => {
    const url = api.getCitiesForASpecificPerson;
    const cities = await (await (url ? getFetch({ url }) : []) || []);
    const response = formatCities(cities);

    return response;
};

const getSalesPoints = async (city) => {
    const url = `${api.getCitiesForASpecificPerson}${city}/salePoints`;
    const salesPoints = await (await (url ? getFetch({ url }) : []) || []);
    const response = formatSalesPoints(salesPoints);

    return response;
};

const getAllSalesPoints = async (city) => {
    const url = `${api.getCitiesForASpecificPerson}${city}/salePoints/true`;

    const salesPoints = await (await (url ? getFetch({ url }) : []) || []);
    const response = formatSalesPoints(salesPoints);

    return response;
};

const formatBranches = (branches) => branches.map(({ SED_CODIGO: value, SED_CIUDAD: label }) => ({ value, label: upperFirtLetterText(label.trim()), color: '#1780E8' }));

const formatCities = (cities) => cities.map(({ CIU_CODIGO: value, CIU_NOMBRE: label }) => ({
    value,
    fullLabel: capitalizarPalabras(label.trim()),
    label: (label.trim().length > 20) ? capitalizarPalabras(label.trim().substring(0, 20) + "...") : capitalizarPalabras(label.trim()),
    color: '#1780E8'
}));

const formatSalesPoints = (salesPoints = []) => salesPoints.map(({ PDV_CODIGO: value, PVC_NOMBRE_PDV: label }) => ({
    value,
    fullLabel: capitalizarPalabras(label.trim()),
    label: (label.trim().length > 20) ? capitalizarPalabras(label.trim().substring(0, 20) + "...") : capitalizarPalabras(label.trim()),
    color: '#1780E8'
}));

export {
    getAllBranches,
    getAllCities,
    getCitiesForASpecificPerson,
    getAllSalesPoints,
    getSalesPoints,
    getCheckInAndCheckOutInfo
}