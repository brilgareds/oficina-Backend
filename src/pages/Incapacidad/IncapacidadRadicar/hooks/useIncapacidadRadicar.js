import axios from 'axios';
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
        setFilesState({ files: [] });
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

        // console.log();

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
            otraEntidad: stateOtraEntidadCheck
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

        // setStateForm({
        //     ...formValue,
        //     files: formValue.files.splice(0, formValue.files.length)
        // });

        setStateForm({
            ...formValue,
            tipoIncapacidad: value
        });

        setFilesState({
            ...filesState,
            files: filesState.files.splice(0, filesState.files.length)
        });

        postFetch({
            url: api.getDocumentsIncapacity,
            params: { empresa: Number(dataUser.empresa), tipoIncapacidad: Number(value.value) }
        })
            .then((resGetDocumentsIncapacity) => {
                actualizarRowsTable(resGetDocumentsIncapacity);
            });



    }

    const [filesState, setFilesState] = useState();
    const onChangeInputFileHandle = ({ numero, documento, target }) => {

        // formValue.files.push({
        //     fileInfo: target.target.files[0],
        //     tipoDocumento: documento
        // });

        filesState.files.push({
            fileInfo: target.target.files[0],
            tipoDocumento: documento
        });

        // setStateForm({
        //     ...formValue,
        //     files: formValue.files
        // });

        setFilesState({
            ...filesState,
            files: filesState.files
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
                archivo:
                    <input
                        onChange={values => { onChangeInputFileHandle({ numero: numberRow, documento: (element.TIP_NOMBRE).toUpperCase(), target: values, }) }}
                        key={key}
                        id={`file_${numberRow}`} name={`file_${numberRow}`}
                        className="form-control"
                        type="file"
                        accept=".pdf"
                    />
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
                empresa: dataUser.empresa.trim(),
            },
            dataForm: {
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

        console.log("json axio == > ", allData);
        console.log("filesState axio == > ", filesState);

        const dataForm = new FormData();
        dataForm.append("allData", JSON.stringify(allData));

        filesState.files.forEach(file => {
            dataForm.append("file", file.fileInfo);
            dataForm.append("filesNames", file.tipoDocumento);
        });

        postFetch({
            url: api.postSaveDisabilityFiling,
            params: dataForm
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos guardados correctamente.',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    window.location.reload();
                })
            })
            .catch(() => {

                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error en la inserción, por favor revisa el formulario.',
                    confirmButtonText: 'Cerrar',
                });
            });



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
    });


}
