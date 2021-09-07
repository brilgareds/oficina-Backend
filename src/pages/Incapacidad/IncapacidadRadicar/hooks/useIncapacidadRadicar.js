import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { api } from '../../../../environments/environments';
import { getFetchWithHeader, overlay, postFetch } from '../../../../generalHelpers';

export const useIncapacidadRadicar = (formInitialState = {}, dataUser) => {

    // const exprRegTelefono = /^[0-9+() -?]+$/;                                                //Expresion regular para validar el formato de un teléfono
    // const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;        //Expresion regular para validar los correos electronicos
    // const exprRegTexto = /^([\w\s\d\nÑñáéíóúÁÉÍÓÚ.,\-_@?¿%<>]){1,990}$/;                      //Expresion regular para validar texto largos de 1000 caracteres

    useEffect(() => {
        document.getElementById('root').className = 'incapacidadRadicar';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadTipoIncapacidad();
        loadOtherEntenty();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [formValue, setStateForm] = useState(formInitialState);
    const onChangeInputHandle = ({ target }) => {
        setStateForm({
            ...formValue,
            [target.name]: target.value
        });
    }

    const onChangeSelectHandle = ({ nameSelect, value }) => {
        setStateForm({
            ...formValue,
            [nameSelect]: value
        });
    }

    const [stateOtraEntidadCheck, setStateOtraEntidadCheck] = useState(true);
    const onCheckedOtherEntity = () => {
        setStateOtraEntidadCheck(!stateOtraEntidadCheck)
        setStateForm({
            ...formValue,
            otraEntidad: null
        });
    }

    const [stateInputCheck, setStateInputCheck] = useState(true);
    const onCheckedInputCheck = () => {

        setStateInputCheck(!stateInputCheck);
        setStateForm({
            ...formValue,
            prorroga: stateInputCheck
        });

    }

    const [optionsOtherEntity, setOptionsOtherEntity] = useState({});
    const loadOtherEntenty = () => {

        getFetchWithHeader({
            url: api.getEpsIncapacidad,
            headers: {
                'accept': '*/*',
            }
        })
            .then((responseGetEpsIncapacidad) => {

                let optionsCategory = [{ value: null, label: "SELECCIONE..." }];

                responseGetEpsIncapacidad.forEach(element => {
                    optionsCategory.push({ value: element.cod_enti, label: element.nom_enti.toUpperCase() })
                });

                setOptionsOtherEntity(optionsCategory);

            });


    }


    const [optionsTipoIncapacidad, setOptionsTipoIncapacidad] = useState({});
    const loadTipoIncapacidad = () => {

        postFetch({
            url: api.getTypesIncapacity,
            params: { empresa: Number(dataUser.empresa) }
        })
            .then((responseGetTipoIncapacidad) => {

                let optionsCategory = [{ value: null, label: "SELECCIONE..." }];

                responseGetTipoIncapacidad.forEach(element => {
                    optionsCategory.push({ value: element.TIP_CODIGO, label: element.TIP_NOMBRE.toUpperCase() })
                });

                setOptionsTipoIncapacidad(optionsCategory);

            });


    }


    const onChangeTipoIncapacidadHandle = ({ value }) => {

        overlay(true);

        setStateForm({
            ...formValue,
            files: formValue.files.splice(0, formValue.files.length)
        });

        postFetch({
            url: api.getDocumentsIncapacity,
            params: { empresa: Number(dataUser.empresa), tipoIncapacidad: Number(value.value) }
        })
            .then((resGetDocumentsIncapacity) => {
                actualizarRowsTable(resGetDocumentsIncapacity);
            });

    }


    const onChangeInputFileHandle = ({ target }) => {
        // const onChangeInputFileHandle = ({ numero, documento, target }) => {

        // formValue.files.push({
        //     fileInfo: target.target.files[0],
        //     tipoDocumento: documento
        // });

        // setStateForm({
        //     ...formValue,
        //     files: formValue.files
        // });

        setStateForm({
            ...formValue,
            archivo_de_prueba: target.target.files[0]
        });



    }

    const [rowsTable, setRowsTable] = useState(formValue.rowsDataTable);
    const actualizarRowsTable = (data) => {
        setRowsTable();
        let rowsDTable = [];

        data.forEach((element, key) => {
            let numberRow = key + 1;
            rowsDTable.push({
                numero: numberRow,
                documento: (element.TIP_NOMBRE).toUpperCase(),
                archivo: <input onChange={values => { onChangeInputFileHandle({ numero: numberRow, documento: (element.TIP_NOMBRE).toUpperCase(), target: values, }) }} key={key} id={`file_${numberRow}`} name={`file_${numberRow}`} className="form-control" type="file" />
            });
        });

        overlay(false);
        setRowsTable(rowsDTable);
    }


    const onSubmitFormIncapacidad = (e) => {
        e.preventDefault();
        overlay(true);

        const allData = {
            dataUser: {
                cedula: formValue.cedula,
                nombres: formValue.nombreUsuario,
                correoElectronico: formValue.correoElectronico,
                eps: formValue.eps,
                telefono: formValue.telefono,
            },
            dataForm: {
                files: formValue?.archivo_de_prueba || "null",
                tipoIncapacidad: formValue?.tipoIncapacidad?.value || "null",
                prorroga: formValue?.prorroga || false,
                otraEntidad: {
                    status: Boolean(!stateOtraEntidadCheck),
                    value: formValue?.otraEntidad?.value || "null",
                },
                rangoFechas: {
                    fechaInicio: formValue.fechaInicio,
                    fechaFin: formValue.fechaFin,
                }
            },
        };

        const data = new FormData();
        data.append("allData", allData);
        data.append("files", formValue.files);

        console.log("allData - --- ", allData);

        postFetch({
            url: "https://httpbin.org/anything",
            params: { data }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos guardados correctamente.',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    // window.location.reload();
                })
            })
            .catch(() => {

                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error en la inserción, por favor revisa el formulario.',
                    confirmButtonText: 'Cerrar',
                });
            });

        console.log("state ===> ", formValue);
        console.log("formulario ===> ", allData);
    }


    return ({
        formValue,
        optionsOtherEntity,
        optionsTipoIncapacidad,
        stateOtraEntidadCheck,
        rowsTable,
        onChangeInputHandle,
        onCheckedOtherEntity,
        onChangeTipoIncapacidadHandle,
        onSubmitFormIncapacidad,
        onChangeSelectHandle,
        onCheckedInputCheck,
        onChangeInputFileHandle,
    });


}
