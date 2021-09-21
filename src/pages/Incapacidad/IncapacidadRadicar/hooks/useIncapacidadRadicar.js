import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { api } from '../../../../environments/environments';
import { advertenciaFormularioVacio, overlay, postFetch } from '../../../../generalHelpers';

export const useIncapacidadRadicar = (formInitialState = {}, dataUser) => {

    const exprRegNumeros = /^[0-9+]+$/;                                                 //Expresion regular para validar el formato de solo numeros
    const exprRegTelefono = /^[0-9+() -?]+$/;                                           //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;       //Expresion regular para validar los correos electronicos
    const exprRegSoloLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü\s+]+$/;                   //Expresion regular para validar solo letras

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

        postFetch({
            url: api.getEpsIncapacidad,
            params: {
                codigoEmpresaUsuario: dataUser.empresa
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
    const onChangeInputFileHandle = ({ tipoArchivo, documento, target }) => {

        if (target.target.files[0].type === "application/pdf") {
            filesState.files.push({
                fileInfo: target.target.files[0],
                tipoDocumento: documento,
                codigoTipoArchivo: tipoArchivo,
            });

            setFilesState({ ...filesState, files: filesState.files });
        } else {
            document.getElementById(target.target.id).value = "";
            Swal.fire({
                icon: 'error',
                title: 'Solo se permiten subir archivos tipo pdf',
                confirmButtonText: 'Cerrar',
            });
        }
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
                        onChange={values => { onChangeInputFileHandle({ tipoArchivo: element.TIP_CODIGO, documento: (element.TIP_NOMBRE).toUpperCase(), target: values, }) }}
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
                    value: formValue?.otraEntidad?.label || "null",
                },
                rangoFechas: {
                    fechaInicio: formValue.fechaInicio,
                    fechaFin: formValue.fechaFin,
                }
            },
        };


        if (!validarDatosFormulario(allData)) {
            advertenciaFormularioVacio();
        } else {

            const dataForm = new FormData();
            dataForm.append("allData", JSON.stringify(allData));

            filesState.files.forEach(file => {
                dataForm.append("file", file.fileInfo);
                dataForm.append("filesNames", file.tipoDocumento);
                dataForm.append("filesCodigos", file.codigoTipoArchivo);
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

    }


    useEffect(() => {
        let fechaini = new Date(formValue.fechaInicio);
        let fechafin = new Date(formValue.fechaFin);
        let diasdif = fechafin.getTime() - fechaini.getTime();
        let contdias = Math.round(diasdif / (1000 * 60 * 60 * 24));

        if (contdias <= 2 && formValue?.tipoIncapacidad?.label === "ENFERMEDAD GENERAL") {

            Swal.fire({
                title: 'Advertencia',
                html: `
                        <div className="row">
                            <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                                Recuerde que si su incapacidad no supera los dos dias el documento de la historia clinica no es obligatorio. El documento sera obligarotio solo si se trata de una prorroga en la incapacidad y solo aplica a ENFERMEDAD GENERAL
                            </div>
                        </div>
                         <br/>
                    `,
                icon: 'warning',
                confirmButtonText: 'Cerrar',
            });

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValue.fechaFin, formValue.fechaInicio]);


    const validarDatosFormulario = (allData) => {

        const { correoElectronico, telefono } = allData.dataUser;
        const { otraEntidad, rangoFechas, tipoIncapacidad } = allData.dataForm;
        const { fechaFin, fechaInicio } = rangoFechas;

        if (
            exprRegTelefono.test(telefono) &&
            exprRegEmail.test(correoElectronico) &&
            exprRegNumeros.test(tipoIncapacidad) &&
            validarfechas(fechaInicio, fechaFin) &&
            filesState.files.length !== 0
        ) {
            if (otraEntidad.status === true) {
                return (exprRegSoloLetras.test(otraEntidad.label)) ? true : false;
            }
            return true;
        } else {
            return false;
        }

    }

    function validarfechas(fechaInicial, fechaFinal) {

        var arrFechaInicial = fechaInicial.split("-");
        var arrFechaFinal = fechaFinal.split("-");

        var yearIni = arrFechaInicial[0];
        var mesIni = arrFechaInicial[1];
        var diaIni = arrFechaInicial[2];

        var yearFin = arrFechaFinal[0];
        var mesFin = arrFechaFinal[1];
        var diaFin = arrFechaFinal[2];

        var fechaIni = yearIni + mesIni + diaIni;
        var fechaFin = yearFin + mesFin + diaFin;

        if (fechaIni > fechaFin) {
            return false;
        } else {
            return true;
        }
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
