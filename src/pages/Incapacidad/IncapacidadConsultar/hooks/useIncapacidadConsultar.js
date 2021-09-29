import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../../../environments/environments";
import { overlay, postFetch } from "../../../../generalHelpers";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export const useIncapacidadConsultar = (formInitialState = {}, dataUser) => {

    const [formValue, setStateForm] = useState(formInitialState);
    const onChangeInputHandle = ({ target }) => {
        setStateForm({
            ...formValue,
            [target.name]: target.value
        });
    }

    useEffect(() => {
        if (formValue.loadingPage === true) {
            document.getElementById('root').className = 'incapacidadRadicar';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            formValue.loadingPage = false;
            formValue.loadingTable = true;
        }
    }, [formValue]);


    const [rowsTable, setRowsTable] = useState(formValue.rowsDataTable);
    useEffect(() => {
        if (formValue.loadingTable === true) {
            overlay(true);

            postFetch({
                url: api.getUserIncapacities,
                params: { cedula: dataUser.cedula }
            })
                .then((resGetUserIncapacities) => {
                    overlay(false);

                    formValue.loadingTable = false;

                    let rowsDTable = [];

                    resGetUserIncapacities.forEach((element, key) => {

                        // rowsDTable.push({
                        //     consecutivo: element.INCAP_CODIGO,
                        //     tipo_incapacidad: element.TIP_NOMBRE,
                        //     documentos:
                        //         <button
                        //             key={key}
                        //             className="btn btn-info"
                        //             value={String(element.INCAP_CODIGO)}
                        //             onClick={event => { onClickIconDocumento({ event }) }}
                        //         > Ver documentos </button>,
                        //     estado: validarEstadoIncapacidad(String(element.ESTADO)),
                        //     actualizar:
                        //         <button className="btn btn-success"
                        //             value={String(element.INCAP_CODIGO)}
                        //             onClick={event => { onClickActualizarIncapacidad({ event }) }}
                        //         >Actualizar</button>,

                        // });

                        rowsDTable.push({
                            consecutivo: element.INCAP_CODIGO,
                            tipo_incapacidad: element.TIP_NOMBRE,
                            documentos:
                                <img
                                    className="imgDeleteGasto"
                                    alt="view"
                                    src="/assets/img/view.png"
                                    value={String(element.INCAP_CODIGO)}
                                    onClick={event => { onClickIconDocumento(element.INCAP_CODIGO) }}
                                />,
                            estado: validarEstadoIncapacidad(String(element.ESTADO)),
                            actualizar:
                                <img
                                    className="imgDeleteGasto"
                                    alt="trash-fill-orange"
                                    src="/assets/img/actualizar-flecha.png"
                                    value={String(element.INCAP_CODIGO)}
                                    onClick={event => { onClickActualizarIncapacidad(element.INCAP_CODIGO) }}
                                />,

                        });
                    });

                    overlay(false);
                    setRowsTable(rowsDTable);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser.cedula, formValue]);



    const validarEstadoIncapacidad = (data) => {

        let response = '';

        switch (data) {
            case "1":
                response = "RADICADO EMPRESA";
                break;
            case "2":
                response = "PARCIAL";
                break;
            case "3":
                response = "RADICADO EPS";
                break;
            case "4":
                response = "RECHAZADO";
                break;

            default:
                response = "";
                break;
        }

        return response;
    }


    const onClickIconDocumento = (event) => {

        overlay(true);

        postFetch({
            url: api.getUserIncapacitiesFiles,
            params: { numeroIncapacidad: event }
        })
            .then((resGetUserIncapacitiesFiles) => {
                overlay(false);
                generarModalDeDocumentos(resGetUserIncapacitiesFiles);

            });

    }

    const generarModalDeDocumentos = (dataApi) => {

        const columnsTableDocumentos = [
            { title: '#' },
            { title: 'Documento' },
            { title: 'Archivo' },
        ];

        let thHeader = ``;
        columnsTableDocumentos.forEach(header => {
            thHeader += `<th scope="col">${header.title}</th>`;
        });

        let tdBody = ``;
        dataApi.forEach((data, key) => {

            if (data.ARCH_RUTA.includes('../../temporales/archivosIncapacidad')) {
                data.ARCH_RUTA = data.ARCH_RUTA.replace('../../', 'http://www.listos.com.co:8080/oficinaVirtualPrueba/');
            }

            tdBody +=
                `<tr>
                    <td>${key + 1}</td>
                    <td>${data.TIP_NOMBRE}</td>
                    <td><a href="${data.ARCH_RUTA}" target="_blank"> <button id="btnArchivoModal_${key}" class="btn btn-link" > <img class="imgDeleteGasto" alt="download-to-storage-drive" src="/assets/img/download-to-storage-drive.png"/> </button> </a></td>
                </tr>`
                ;

        });

        Swal.fire({
            width: '800px',
            title: 'Documentos Relacionados',
            html: `
            <div class="row" style="text-align: left; margin: 10px;">
                <div class="table-responsive scrollbar">
                    <table class="table">
                        <thead class="headersDataTableModal">
                            <tr>
                                ${thHeader}
                            </tr>
                        </thead>
                        <tbody>
                            ${tdBody}
                        </tbody>
                    </table>
                </div>
            </div>

            <br />
            `,
            showCancelButton: true,
            cancelButtonText: "Cerrar",
            cancelButtonColor: "#A6A6A6",
            showConfirmButton: false,


        });

    }


    const onClickActualizarIncapacidad = (event) => {
        overlay(true);

        postFetch({
            url: api.getUserDataIncapacity,
            params: { numeroIncapacidad: event }
        })
            .then((resGetUserDataIncapacity) => {
                overlay(false);
                desplegarModalActualizarDatos(resGetUserDataIncapacity);

            });
    }



    const validarEstadosArchivos = (estadoArchivo) => {

        let response = {};

        switch (estadoArchivo) {
            case '1':
                response = {
                    estado: "RADICADO",
                    habilitado: 'disabled',
                    clase: 'estadoInhabilitado',
                    trDeshabilitadoClase: 'trDesahbilitado',
                };
                break;
            case '2':
                response = {
                    estado: "APROBADO",
                    habilitado: 'disabled',
                    clase: 'estadoInhabilitado',
                    trDeshabilitadoClase: 'trDesahbilitado',
                };
                break;
            case '3':
                response = {
                    estado: "RECHAZADO",
                    habilitado: '',
                    clase: '',
                    trDeshabilitadoClase: '',
                };
                break;

            default:
                response = "";
                break;
        }

        return response;
    }


    const desplegarModalActualizarDatos = (dataIncapacityObj) => {

        const { dataIncapacity, documentsIncapacity } = dataIncapacityObj;

        if (
            dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE === "null" ||
            dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE === null
        ) {
            dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE = "";
        }

        const columnsTableDocumentos = [
            { title: 'Documento' },
            { title: 'Estado' },
            { title: 'Motivo rechazo' },
            { title: 'Archivo' },
        ];

        let thHeader = ``;
        columnsTableDocumentos.forEach(header => { thHeader += `<th scope="col">${header.title}</th>`; });

        let tdBody = ``;
        documentsIncapacity.forEach((data, key) => {

            const { estado, habilitado, trDeshabilitadoClase } = validarEstadosArchivos(String(data.ARCH_ESTADO));
            tdBody +=
                `<tr class="${trDeshabilitadoClase}">
                    <td>${data.TIP_NOMBRE}</td>
                    <td>${estado}</td>
                    <td>${(data.RECHAZO !== null) ? data.RECHAZO.toUpperCase() : "N/A"}</td>
                    <td>
                    <label for="inputFile_${key}" class="btn fileButton"> Subir archivo </label>
                        <input ${habilitado} name="inputFile_${key}" id="inputFile_${key}" data-target="${data.ARCH_CODIGO}" class="form-control" type="file" accept=".pdf" style="width: 18rem; display:none">
                    </td>
                </tr>`
                ;

        });


        Swal.fire({
            width: '1200px',
            title: 'Actualización de datos',
            html: `
                    <form id="formModalActualizacionDocumentosIncapacidad">
                        <div class="row" style="text-align: left; margin: 10px;">
                            <div className="card-header">
                                <h5 className="card-title">Datos del colaborador</h5>
                            </div>
                            <div class="col-12 col-lg-4">
                                <label class="form-label" htmlFor="cedula">Cédula:</label>
                                <input value="${dataIncapacity[0].INCAP_CEDULA}" id="cedula" name="cedula" class="form-control" type="text" disabled />
                            </div>
                            <div class="col-12 col-lg-4">
                                <label class="form-label" htmlFor="nombre">Nombre:</label>
                                <input value="${dataIncapacity[0].INCAP_NOMBRE}" id="nombre" name="nombre" class="form-control" type="text" disabled />
                            </div>
                            <div class="col-12 col-lg-4">
                                <label class="form-label" htmlFor="telefono">Teléfono:</label>
                                <input value="${dataIncapacity[0].INCAP_TELEFONO}" id="telefono" name="telefono" class="form-control" type="text" disabled />
                            </div>
                            <div class="col-12 col-lg-4">
                                <label class="form-label" htmlFor="email">Correo Electrónico:</label>
                                <input value="${dataIncapacity[0].INCAP_EMAIL}" id="email" name="email" class="form-control" type="email" disabled />
                            </div>
                            <div class="col-12 col-lg-4">
                                <label class="form-label" htmlFor="eps">Eps:</label>
                                <input value="${dataIncapacity[0].INCAP_EPS}" id="eps" name="eps" class="form-control" type="text" disabled />
                            </div>
                            <div class="col-12 col-lg-4 mb-4">
                                <label class="form-label" htmlFor="otraEntidad">Otra Entidad:</label>
                                <input value="${dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE}" id="otraEntidad" name="otraEntidad" class="form-control" type="text" disabled />
                            </div>
                            <div className="card-header">
                                <h5 className="card-title">Datos de la incapacidad</h5>
                            </div>
                            <div class="col-12 col-lg-4 mb-4">
                                <label class="form-label" htmlFor="tipoIncapacidad">Tipo Incapacidad:</label>
                                <input value="${dataIncapacity[0].TIP_NOMBRE}" id="tipoIncapacidad" name="tipoIncapacidad" class="form-control" type="text" disabled />
                            </div>
                            <div class="col-12 col-lg-4 mb-4">
                                <label class="form-label" htmlFor="fechaInicio">Fecha Inicio:</label>
                                <input value="${casterFecha(dataIncapacity[0].INCAP_FECHA_INI)}" id="fechaInicio" name="fechaInicio" class="form-control" type="text" disabled />
                            </div>
                            <div class="col-12 col-lg-4 mb-4">
                                <label class="form-label" htmlFor="fechaFin">Fecha Fin:</label>
                                <input value="${casterFecha(dataIncapacity[0].INCAP_FECHA_FIN)}" id="fechaFin" name="fechaFin" class="form-control" type="text" disabled />
                            </div>

                            <div className="card-header">
                                <h5 className="card-title">Documentos</h5>
                            </div>

                            <div class="table-responsive scrollbar" style="overflow-x: auto;white-space: nowrap;">
                                <table class="table">
                                    <thead class="headersDataTableModal">
                                        <tr>
                                            ${thHeader}
                                        </tr>
                                    </thead>
                                    <tbody class="tbodyModal">
                                        ${tdBody}
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-12 col-lg-12 " style="text-align: right;">
                                <div class="d-grid gap-2 d-md-block">
                                    <button id="btnModalGuardar" class="btn succesButton" type="button">Guardar</button>
                                    <button id="btnModalCerrar" class="btn closeButton" type="button">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                         
                    <br/>
            `,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {

                document.getElementById("btnModalGuardar").addEventListener("click", () => { onClickGuardarDatosFormulario(dataIncapacity[0].INCAP_CODIGO) }, false);

                document.getElementById("btnModalCerrar").addEventListener("click", () => {
                    Swal.close();
                }, false);

                for (let index = 0; index < documentsIncapacity.length; index++) {
                    document.getElementById(`inputFile_${index}`).addEventListener("change", onChangeInputFileHandle, false);
                }

            },

        }).then((result) => {

            limpiarEventosModalActualizacionAlCerrar(documentsIncapacity);

        })

    }

    const casterFecha = (data) => {
        return data.split("T")[0];
    }

    const [filesState, setFilesState] = useState([]);
    const onChangeInputFileHandle = (event) => {

        if (event.target.files[0].type === "application/pdf") {
            filesState.push({ file: event.target.files[0], codigoArchivo: event.target.dataset.target, });
            setFilesState(filesState);
        } else {
            document.getElementById(event.target.id).value = "";

            alertify.warning(`
                <div className="row">
                    <div className="col-12 col-lg-12" style="text-align: center; font-size: 18px; font-weight: 800;">
                        Error.
                    </div>
                    <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                        Solo se permiten subir archivos tipo pdf
                    </div>
                </div>
            `).delay(7);
        }

    };


    const onClickGuardarDatosFormulario = (numerIncapacidad) => {

        if (filesState.length !== 0) {
            overlay(true);

            const dataForm = new FormData();
            dataForm.append("numeroIncapacidad", numerIncapacidad);
            dataForm.append("correoUsuario", dataUser.mail);
            dataForm.append("cedulaUsuario", dataUser.cedula);


            filesState.forEach(infofile => {
                dataForm.append("file", infofile.file);
                dataForm.append("codigosArchivos", infofile.codigoArchivo);
            });

            postFetch({
                url: api.postUpdateDisabilityFiling,
                params: dataForm
            })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Datos actualizados correctamente.',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: "#A6A6A6",
                    }).then((result) => {
                        window.location.reload();
                    })
                })
                .catch(() => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error en la actualización, por favor revisa el formulario.',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: "#A6A6A6",
                    });
                });
        } else {

            alertify.warning(`
            <div className="row">
                <div className="col-12 col-lg-12" style="text-align: center; font-size: 18px; font-weight: 800;">
                    Error.
                </div>
                <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                    Para actualizar los datos debes cargar los archivos
                </div>
            </div>
            `).delay(7);

        }


    }


    const limpiarEventosModalActualizacionAlCerrar = (documentsIncapacity) => {

        document.getElementById("btnModalGuardar").removeEventListener("click", () => { }, false);
        document.getElementById("btnModalCerrar").removeEventListener("click", () => { }, false);

        for (let index = 0; index < documentsIncapacity.length; index++) {
            document.getElementById(`inputFile_${index}`).removeEventListener("click", () => { }, false);
        }

        filesState.splice(0, filesState.length)
        setFilesState(filesState.splice(0, filesState.length));

    }


    return ({
        formValue,
        rowsTable,
        onChangeInputHandle,
    });

}
