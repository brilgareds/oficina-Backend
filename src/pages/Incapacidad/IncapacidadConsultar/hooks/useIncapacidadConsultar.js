import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../../../environments/environments";
import { overlay, postFetch } from "../../../../generalHelpers";

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

                        rowsDTable.push({
                            consecutivo: element.INCAP_CODIGO,
                            tipo_incapacidad: element.TIP_NOMBRE,
                            documentos:
                                <button
                                    key={key}
                                    className="btn btn-info"
                                    value={String(element.INCAP_CODIGO)}
                                    onClick={event => { onClickIconDocumento({ event }) }}
                                > Ver documentos </button>,
                            estado: validarEstadoIncapacidad(String(element.ESTADO)),
                            actualizar:
                                <button className="btn btn-success"
                                    value={String(element.INCAP_CODIGO)}
                                    onClick={event => { onClickActualizarIncapacidad({ event }) }}
                                >Actualizar</button>,
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


    const onClickIconDocumento = ({ event }) => {

        overlay(true);

        postFetch({
            url: api.getUserIncapacitiesFiles,
            params: { numeroIncapacidad: event.target.value }
        })
            .then((resGetUserIncapacitiesFiles) => {
                overlay(false);
                generarModalDeDocumentos(resGetUserIncapacitiesFiles);

            });

    }

    const generarModalDeDocumentos = (dataApi) => {

        const columnsTableDocumentos = [
            { title: '#' },
            { title: 'DOCUMENTO' },
            { title: 'ARCHIVO' },
        ];

        let thHeader = ``;
        columnsTableDocumentos.forEach(header => {
            thHeader += `<th scope="col">${header.title}</th>`;
        });

        let tdBody = ``;
        dataApi.forEach((data, key) => {
            tdBody +=
                `<tr>
                    <td>${key + 1}</td>
                    <td>${data.TIP_NOMBRE}</td>
                    <td><a href="${data.ARCH_RUTA}" target="_blank"> <button id="btnArchivoModal_${key}" class="btn btn-info" >Archivo</button> </a></td>
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
            showConfirmButton: false,
            didOpen: () => {

                // creamos  los eventos listenes realacionados a los botones de los archivos
                for (let i = 0; i < dataApi.length; i++) {
                    document.getElementById(`btnArchivoModal_${i}`)?.addEventListener('click', () => {
                        onClickBtnARchivoModal();
                    });
                }

            },

        }).then(() => {

            // Eliminamos todos los eventos listenes realacionados a los botones de los archivos
            for (let i = 0; i < dataApi.length; i++) {
                document.getElementById(`btnArchivoModal_${i}`)?.removeEventListener('click', onClickBtnARchivoModal());
            }

        });

    }

    const onClickBtnARchivoModal = () => {
        console.log("onClickBtnARchivoModal");
    }

    const onClickActualizarIncapacidad = ({ event }) => {
        overlay(true);

        postFetch({
            url: api.getUserDataIncapacity,
            params: { numeroIncapacidad: event.target.value }
        })
            .then((resGetUserDataIncapacity) => {
                overlay(false);
                desplegarModalActualizarDatos(resGetUserDataIncapacity);

            });
    }


    const desplegarModalActualizarDatos = (dataIncapacityObj) => {


        const { dataIncapacity, documentsIncapacity } = dataIncapacityObj;

        if (
            dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE === "null" ||
            dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE === null
        ) {
            dataIncapacity[0].INCAP_OTRA_ENTID_NOMBRE = "";
        }

        console.log("dataIncapacity[0]", dataIncapacity[0]);
        const columnsTableDocumentos = [
            { title: 'SELECCION' },
            { title: 'DOCUMENTO' },
            { title: 'ESTADO' },
            { title: 'MOTIVO RECHAZO' },
            { title: 'ARCHIVO' },
        ];

        let thHeader = ``;
        columnsTableDocumentos.forEach(header => { thHeader += `<th scope="col">${header.title}</th>`; });

        let tdBody = ``;
        documentsIncapacity.forEach((data, key) => {
            console.log("data", data.RECHAZO);
            tdBody +=
                `<tr>
                    <td> <input class="form-check-input" type="checkbox" value="" /> </td>
                    <td>${data.TIP_NOMBRE}</td>
                    <td>${validarEstadosArchivos(String(data.ARCH_ESTADO))}</td>
                    <td>${(data.RECHAZO !== null) ? data.RECHAZO : ""}</td>
                    <td><input class="form-control" type="file" style="width: 18rem;"></td>
                </tr>`
                ;

        });


        Swal.fire({
            width: '1200px',
            title: 'Actualización de datos',
            html: `
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
                            <input value="${dataIncapacity[0].INCAP_EMAIL}" id="eps" name="eps" class="form-control" type="text" disabled />
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
                            <label class="form-label" htmlFor="fechaInicio">Ficha Inicio:</label>
                            <input value="${dataIncapacity[0].INCAP_FECHA_INI}" id="fechaInicio" name="fechaInicio" class="form-control" type="text" disabled />
                        </div>
                        <div class="col-12 col-lg-4 mb-4">
                            <label class="form-label" htmlFor="fechaFin">Ficha Fin:</label>
                            <input value="${dataIncapacity[0].INCAP_FECHA_FIN}" id="fechaFin" name="fechaFin" class="form-control" type="text" disabled />
                        </div>

                        <div className="card-header">
                            <h5 className="card-title">Documentos</h5>
                        </div>

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
                         
                    <br/>
            `,
            showCancelButton: true,
            cancelButtonText: "Cerrar",
            showConfirmButton: false,
            didOpen: () => {


            },

        });

    }

    const validarEstadosArchivos = (estadoArchivo) => {

        let response = "";

        switch (estadoArchivo) {
            case '1':
                response = "RADICADO";
                break;
            case '2':
                response = "APROBADO";
                break;
            case '3':
                response = "RECHAZADO";
                break;

            default:
                response = "";
                break;
        }

        return response;
    }

    return ({
        formValue,
        rowsTable,
        onChangeInputHandle,
    });

}
