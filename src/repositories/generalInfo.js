import { api } from '../environments/environments';
import { getFetch } from '../generalHelpers';

const getAllBranches = async () => {
    const branches = fakeBranches;
    // const url = api.getAllBranches;
    // const branches = await(await(url ? getFetch({ url }) : {}) || {});
    const response = formatBranches(branches.data);

    console.log('\nBranches: ', response);

    return response;
};

const getAllCities = async() => {
    const url = api.getAllCities;
    const cities = await(await(url ? getFetch({ url }) : {}) || {});
    const response = formatCities(cities.data);

    return response;
};

const getCitiesForASpecificPerson = async() => {
    const cities = await fakeCities;
    // const url = api.getCitiesForASpecificPerson;
    // const cities = await(await(url ? getFetch({ url }) : {}) || {});
    const response = formatCities(cities.data);

    return response;
};

const getSalesPoints = async(city) => {
    const salesPoints = fakeSalesPoints[city] || { data: [] };
    // const url = api.getCitiesForASpecificPerson;
    // const salesPoints = await(await(url ? getFetch({ url }) : {}) || {});
    const response = formatCities(salesPoints.data);

    return response;
};

const fakeSalesPoints = {
    cali: {
        data: [
            {
                value: '3091',
                label: 'cali_1'
            },
            {
                value: 3104,
                label: 'cali_2'
            },
            {
                value: 3112,
                label: 'cali_3'
            },
            {
                value: 3130,
                label: 'cali_4'
            },
            {
                value: '3160',
                label: 'cali_5'
            },
            {
                value: '3178',
                label: 'cali_6'
            }
        ]
    },
    medellin: {
        data: [
            {
                value: 'medellin_1',
                label: 'medellin_1'
            },
            {
                value: 'medellin_2',
                label: 'medellin_2'
            },
            {
                value: 'medellin_3',
                label: 'medellin_3'
            },
            {
                value: 'medellin_4',
                label: 'medellin_4'
            },
            {
                value: 'medellin_5',
                label: 'medellin_5'
            },
            {
                value: 'medellin_6',
                label: 'medellin_6'
            }
        ]
    },
    palmira: {
        data: [
            {
                value: 'palmira_1',
                label: 'palmira_1'
            },
            {
                value: 'palmira_2',
                label: 'palmira_2'
            },
            {
                value: 'palmira_3',
                label: 'palmira_3'
            },
            {
                value: 'palmira_4',
                label: 'palmira_4'
            },
            {
                value: 'palmira_5',
                label: 'palmira_5'
            },
            {
                value: 'palmira_6',
                label: 'palmira_6'
            }
        ]
    }
};

const fakeBranches = {
    data: [
        {
            value: 'Cali',
            label: 'Cali',
            color: '#1780E8'
        },
        {
            value: 'Medellin',
            label: 'Medellin',
            color: '#1780E8'
        },
        {
            value: 'Palmira',
            label: 'Palmira',
            color: '#1780E8'
        },
        {
            value: 'Tulua',
            label: 'Tulua',
            color: '#1780E8'
        },
        {
            value: 'Bogota',
            label: 'Bogota',
            color: '#1780E8'
        }
    ]
};

const fakeCities = {
    data: [
        {
            value: 'Cali',
            label: 'Cali'
        },
        {
            value: 'Medellin',
            label: 'Medellin'
        },
        {
            value: 'Palmira',
            label: 'Palmira'
        },
        {
            value: 'Tulua',
            label: 'Tulua'
        },
        {
            value: 'Bogota',
            label: 'Bogota'
        }
    ]
};

const formatBranches = (branches) => {

    return branches.map(({ value, label }) => ({
        value: value,
        label: label,
        color: '#1780E8'
    }));
};

const formatCities = (cities) => {

    return cities.map(({ value, label }) => ({
        value: value,
        label: label,
        color: '#1780E8'
    }));
};


export {
    getAllBranches,
    getAllCities,
    getCitiesForASpecificPerson,
    getSalesPoints
}