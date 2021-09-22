import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../../../environments/environments";
import { advertenciaFormularioVacio, getFullNameUser, overlay, postFetch } from "../../../../generalHelpers";


export const useMiBilletera = (formInitialState = {}, dataUser) => {

    const exprRegNumeros = /^[0-9+]+$/;                                                 //Expresion regular para validar el formato de solo numeros
    const exprRegSoloLetras = /^[0-9a-zA-ZÑñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü\s+]+$/;                   //Expresion regular para validar solo letras
    const [formValue, setStateForm] = useState(formInitialState);
    const [stateSalarioUsuario, setStateSalarioUsuario] = useState(formInitialState.salarioUsuario);
    const [stateSumaDeGastos, setStateSumaDeGastos] = useState(formInitialState.sumaDeGastos);
    const [statetTatalDisponible, setStatetTatalDisponible] = useState(formInitialState.tatalDisponible);
    const [stateLoadingTable, setStateLoadingTable] = useState(formInitialState.loadingTable);

    const onChangeInputHandle = ({ target }) => {
        setStateForm({
            ...formValue,
            [target.name]: (target.name === "valorGasto") ? formatNumber(target.value) : target.value
        });
    }

    const formatNumber = (num) => {
        num = String(num).replace(/\D/g, "");
        return num === '' ? num : Number(num).toLocaleString();
    }


    useEffect(() => {
        if (formValue.loadingPage === true) {
            formValue.loadingPage = false;
            setStateLoadingTable(true);
            document.getElementById('root').className = 'mi-billetera';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [rowsTable, setRowsTable] = useState(formValue.rowsDataTable);
    useEffect(() => {

        const source = axios.CancelToken.source();

        if (stateLoadingTable === true) {
            overlay(true);

            let sumaDeGastos = 0;

            try {

                postFetch({
                    url: api.getConsultarDatosUsuarioBilletera,
                    params: {
                        cedula: dataUser.cedula,
                        cancelToken: source.token,
                    }
                })
                    .then(({ dataUsuario, gastosUsuario }) => {

                        let rowsDTable = [];
                        setStateLoadingTable(false);

                        setStateSalarioUsuario(formatearNumeroAPesos(dataUsuario.SALARIO));

                        gastosUsuario.forEach((element, key) => {

                            sumaDeGastos += Number(limpiarCadenaValores(element.GAST_VALOR));

                            rowsDTable.push({
                                gasto: element.GAST_NOMBRE,
                                costo: "$ " + formatNumber(element.GAST_VALOR),
                                accion:
                                    <img
                                        className="imgDeleteGasto"
                                        alt="trash-fill-orange"
                                        src="/assets/img/billetera/trash-fill-orange.png"
                                        onClick={
                                            () => {
                                                onClickEliminarGasto({
                                                    gastoId: element.GAST_CODIGO,
                                                    billCod: element.BILL_CODIGO[0]
                                                })
                                            }
                                        }
                                    />,
                            });
                        });

                        overlay(false);
                        setRowsTable(rowsDTable);
                        setStateSumaDeGastos(formatearNumeroAPesos(sumaDeGastos));
                        setStatetTatalDisponible(formatearNumeroAPesos(dataUsuario.SALARIO - sumaDeGastos));
                        formValue.billeteraNueva = (gastosUsuario.length !== 0) ? false : true;
                        setStateForm({ ...formValue, dataUserGastos: { dataUsuario, gastosUsuario } });

                    });
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
            }
        }


        return () => {
            source.cancel();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateLoadingTable]);


    const onClickEliminarGasto = ({ gastoId, billCod }) => {

        overlay(true);

        postFetch({
            url: api.deleteGastoBilletera,
            params: {
                gastoId,
                billCod
            }
        })
            .then((resDeleteGastoBilletera) => {
                overlay(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Gasto eliminado correctamente',
                    showCancelButton: true,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#A6A6A6",
                    showConfirmButton: false,
                }).then(() => {
                    setStateLoadingTable(true);
                });

            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'El gasto seleccionado no se eliminado correctamente',
                    showCancelButton: true,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#A6A6A6",
                    showConfirmButton: false,
                });

            });
    }

    const limpiarCadenaValores = (number) => {

        let data = number.split(',');
        data = data[0].replace('.', '');
        return Number(data);
    }

    const formatearNumeroAPesos = (data) => {
        return data.toLocaleString("es-ES");
    }

    const limpiarFormatoNumero = (numero) => {
        return Number(numero.replace(/\./g, ''));
    }


    const onClickGuardar = () => {

        overlay(true);
        let params = {
            billCod: formValue.dataUserGastos.gastosUsuario[0]?.BILL_CODIGO[0] || null,
            billeteraNueva: formValue.billeteraNueva,
            cedula: dataUser.cedula,
            conceptos: {
                gasto: formValue.gasto.toUpperCase(),
                valor: limpiarFormatoNumero(String(formValue.valorGasto)),
            },
            salario: formValue.dataUserGastos.dataUsuario.SALARIO,
            nombreUser: getFullNameUser().toUpperCase(),
            userDispo: statetTatalDisponible.replace(/\./g, ""),
            userTotalGas: (formValue.billeteraNueva) ? Number(formValue.valorGasto) : Number(stateSumaDeGastos.replace(/\./g, "")) + Number(formValue.valorGasto),
        };

        console.log("params", params);

        if (!validarInformacionFormulario(params)) {
            advertenciaFormularioVacio();
        } else {
            postFetch({
                url: api.saveGastoBilletera,
                params: params
            })
                .then((response) => {
                    overlay(false);

                    Swal.fire({
                        icon: 'success',
                        title: 'Gasto guardado correctamente',
                        showCancelButton: true,
                        cancelButtonText: "Cerrar",
                        cancelButtonColor: "#A6A6A6",
                        showConfirmButton: false,
                    }).then(() => {
                        setStateLoadingTable(true);
                        formValue.gasto = "";
                        formValue.valorGasto = "";
                        console.log("formValue", formValue);

                    });
                });
        }
    }


    const validarInformacionFormulario = (params) => {

        const { gasto, valor } = params.conceptos

        if (
            exprRegNumeros.test(valor) &&
            exprRegSoloLetras.test(Number(gasto)) &&
            gasto !== ""
        ) {
            return true;
        }

        return false;
    }

    return ({
        formValue,
        rowsTable,
        stateSalarioUsuario,
        stateSumaDeGastos,
        statetTatalDisponible,
        onChangeInputHandle,
        onClickGuardar,
    });

}
