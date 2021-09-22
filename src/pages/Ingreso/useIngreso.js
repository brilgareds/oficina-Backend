import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeModal } from "../../generalHelpers";
import { saveCheckIn, saveCheckOut } from "../../repositories/CheckInCheckOut/CheckInCheckOut";
import { getCheckInAndCheckOutInfo } from "../../repositories/generalInfo";

export const useIngreso = () => {

    const [mainInfo, setMainInfo] = useState({});
    const [finished, setFinished] = useState(false);
    const [formCheckIn, setFormCheckIn] = useState({});

    const hasMainInfo     = !!(Object.keys(mainInfo || {}).length);
    const userHasSurvey   = !!(Object.keys(mainInfo?.hasSurvey   || {}).length);
    const userHasCheckIn  = !!(Object.keys(mainInfo?.hasCheckIn  || {}).length);
    const userHasCheckOut = !!(Object.keys(mainInfo?.hasCheckOut || {}).length);

    /*
        const hasMainInfo     = !!(Object.keys(mainInfo || {}).length);
        const userHasSurvey   = !!(Object.keys(mainInfo?.hasSurvey   || {}).length);
        const userHasCheckIn  = !!(Object.keys(mainInfo?.hasCheckIn  || {}).length);
        const userHasCheckOut = !!(Object.keys(mainInfo?.hasCheckOut || {}).length);
    */

    useEffect(() => {
        const success = (pos) => {
            setFormCheckIn(oldData => ({
                ...oldData,
                longitude: pos?.coords?.longitude || null,
                latitude:  pos?.coords?.latitude  || null
            }));
        };

        navigator.geolocation.getCurrentPosition(success, ()=>{});
        getCheckInAndCheckOutInfo().then(setMainInfo);
    }, []);

    useEffect(() => {
        if (hasMainInfo) {
            
            setFormCheckIn(oldData => {

                const a = {
                    ...oldData,
                    branch: mainInfo?.hasCheckIn?.SED_CODIGO || '',
                    city: mainInfo?.hasCheckIn?.CIN_CIU_CODIGO || '',
                    reason: mainInfo?.hasCheckIn?.CIN_MOTIVO_INGRESO || '',
                    salesPoints: mainInfo?.hasCheckIn?.CIN_PDV_CODIGO || '',
                    temperature: mainInfo?.hasCheckIn?.CIN_TEMPERATURA || '',
                    typeCheckIn: mainInfo?.hasCheckIn?.CIN_TIPO_INGRESO || '',
                    temperatureCheckOut: mainInfo?.hasCheckOut?.CIN_TEMPERATURA_SALIDA || ''
                };

                return a;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainInfo]);

    const handleCheckUpdate = (e) => {
        setFormCheckIn(oldValue => ({ typeCheckIn: parseFloat(e?.target?.value || 0), longitude: oldValue?.longitude ?? null, latitude: oldValue?.latitude ?? null }));
    };

    const tipoIngresos = [
        {
           id: 1164, // CIN_TIPO_INGRESO
           title: 'Home Office'
        },
        {
            id: 1165,
            title: 'Personal campo'
        },
        {
            id: 1166,
            title: 'Sede'
        }
    ];

    const handleFormSubmit = (e) => {
        e.preventDefault();

        console.log('formCheckIn: ', formCheckIn);

        if (!userHasCheckIn) {

            const params = {
                typeEntrance: formCheckIn?.typeCheckIn,
                temperature: parseFloat(formCheckIn?.temperature),
                longitude: formCheckIn?.longitude,
                latitude: formCheckIn?.latitude,
                reason: formCheckIn?.reason,
                branch: formCheckIn?.branch,
                city: formCheckIn?.city,
                salePoint: formCheckIn?.salesPoints?.value,
                otherSalePoint: ''
            };

            return saveCheckIn({params})
                .then(() => makeModal({text: 'Ingreso registrado con exito!', icon: 'success'}))
                .then(() => setFinished(true))
                .catch(err => { console.warn(err); makeModal({text: err.toString(), icon: 'error', confirmButtonText: 'Aceptar'})});

        } else if (!userHasCheckOut) {

            const params = {
                typeEntrance: formCheckIn?.typeCheckIn,
                temperature: parseFloat(formCheckIn?.temperatureCheckOut)
            };

            return saveCheckOut({params})
                .then(() => makeModal({text: 'Salida registrada con exito!', icon: 'success'}))
                .then(() => setFinished(true))
                .catch(err => { console.warn(err); makeModal({text: err.toString(), icon: 'error', confirmButtonText: 'Aceptar'})});
        }
    };

    if (hasMainInfo && userHasSurvey && userHasCheckIn && userHasCheckOut && !finished) {
        Swal.fire({
            title: '',
            text: 'Usted ya realizó el ingreso y salida',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#2c7be5',
            confirmButtonText: 'Cerrar'
        }).then(setFinished(true));
    }

    return {
        mainInfo,
        finished,
        hasMainInfo,
        formCheckIn,
        setFinished,
        tipoIngresos,
        userHasSurvey,
        userHasCheckIn,
        setFormCheckIn,
        userHasCheckOut,
        handleFormSubmit,
        handleCheckUpdate
    }
};