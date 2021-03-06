import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../../../environments/environments";
import { overlay, postFetch } from "../../../../generalHelpers";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export const useEpsCajaConsultar = (formInitialState = {}, dataUser) => {

    const [formValue, setStateForm] = useState(formInitialState);
    const onChangeInputHandle = ({ target }) => {
        setStateForm({
            ...formValue,
            [target.name]: target.value
        });
    }



    useEffect(() => {
        if (formValue.loadingPage === true) {
            document.getElementById('root').className = 'EpsCajaConsultar';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            formValue.loadingPage = false;
            formValue.loadingTable = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValue.loadingPage]);


    const [rowsTable, setRowsTable] = useState(formValue.rowsDataTable);
    useEffect(() => {
        if (formValue.loadingTable === true) {

            overlay(true);

            postFetch({
                url: api.consultarBeneficiarios,
                params: { cedula: dataUser.cedula }
            })
                .then((resConsultarBeneficiarios) => {

                    setRowsTable([]);
                    let rowsDTable = [];

                    resConsultarBeneficiarios.forEach((element, key) => {

                        // rowsDTable.push({
                        //     consecutivo: element.BENEF_CODIGO,
                        //     cedulaIncapacidad: element.BENEF_NUMERO_DOCUMENTO,
                        //     nombre: `${element.BENEF_NOMBRES.toUpperCase()} ${element.BENEF_APELLIDOS.toUpperCase()}`,
                        //     parentesco: element.TIP_NOMBRE,
                        //     eps: (Number(element.BENEF_EPS) === 1) ? "SI" : "NO",
                        //     cajaCompensacion: (Number(element.BENEF_CAJA) === 1) ? "SI" : "NO",
                        //     estado: validarEstadoPeticion(Number(element.ESTADO)),
                        //     documentos:
                        //         <button className="btn btn-link"
                        //             value={String(element.BENEF_CODIGO)}
                        //             onClick={event => { onClickActualizarIncapacidad({ event }) }}
                        //         >
                        //             actualizar
                        //         </button>,
                        // });
                        rowsDTable.push({
                            consecutivo: element.BENEF_CODIGO,
                            cedulaIncapacidad: element.BENEF_NUMERO_DOCUMENTO,
                            nombre: `${element.BENEF_NOMBRES.toUpperCase()} ${element.BENEF_APELLIDOS.toUpperCase()}`,
                            parentesco: element.TIP_NOMBRE,
                            eps: (Number(element.BENEF_EPS) === 1) ? "SI" : "NO",
                            cajaCompensacion: (Number(element.BENEF_CAJA) === 1) ? "SI" : "NO",
                            estado: validarEstadoPeticion(Number(element.ESTADO)),
                            documentos:
                                <img
                                    className="imgDeleteGasto"
                                    alt="trash-fill-orange"
                                    src="/assets/img/fa-file-alt.png"
                                    value={String(element.BENEF_CODIGO)}
                                    onClick={event => { onClickActualizarIncapacidad(element.BENEF_CODIGO) }}
                                />,
                        });

                    });

                    overlay(false);
                    setRowsTable(rowsDTable);
                });

            formValue.loadingTable = false;

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValue.loadingTable]);


    const validarEstadoPeticion = (estado) => {

        try {

            let response = ``;

            switch (Number(estado)) {
                case 1:
                    response = `RADICADO`;
                    break;
                case 2:
                    response = `PARCIAL`;
                    break;
                case 3:
                    response = `APROBADO`;
                    break;
                case 4:
                    response = `RECHAZADO`;
                    break;

                default:
                    response = ``;
                    break;
            }

            return response;
        } catch (error) {
            throw new Error(error.message);
        }

    }


    const validarEstadoPeticionDocumentosBeneficiario = (estado) => {

        try {

            let response = ``;

            switch (Number(estado)) {
                case 1:
                    response = `RADICADO`;
                    break;
                case 2:
                    response = `APROBADO`;
                    break;
                case 3:
                    response = `RECHAZADO`;
                    break;
                default:
                    response = ``;
                    break;
            }

            return response;
        } catch (error) {
            throw new Error(error.message);
        }

    }



    const onClickActualizarIncapacidad = (event) => {

        overlay(true);

        postFetch({
            url: api.consultarArchivosBenefactor,
            params: { codigoBenefactor: event }
        })
            .then((resconsultarArchivosBenefactor) => {
                overlay(false);

                desplegarModalDatos(resconsultarArchivosBenefactor);

            });
    }



    const desplegarModalDatos = (dataApi) => {

        const columnsTableDocumentos = [
            { title: '#' },
            { title: 'Motivo rechazo' },
            { title: 'Estado' },
            { title: 'Descargar' },
            { title: 'Actualizar' },
        ];

        let thHeader = ``;
        columnsTableDocumentos.forEach(header => {
            thHeader += `<th scope="col">${header.title}</th>`;
        });

        let tdBody = ``;
        dataApi.forEach((data, key) => {

            if (data.ARCH_RUTA.includes('../../temporales/archivosBeneficiarios')) {
                data.ARCH_RUTA = data.ARCH_RUTA.replace('../../', 'http://www.listos.com.co:8080/oficinaVirtualPrueba/');
            }

            // tdBody +=
            //     `<tr>
            //         <td>${key + 1}</td>
            //         <td>${(data.RECHAZO !== null) ? data.RECHAZO : ""}</td>
            //         <td>${data.ARCH_ESTADO}</td>
            //         <td><a href="${data.ARCH_RUTA}" target="_blank"> <button id="btnArchivoModal_${key}" class="btn btn-link" >Descargar</button> </a></td>
            //         <td><input name="inputFile_${key}" id="inputFile_${key}" data-target="${data.ARCH_CODIGO}" class="form-control" type="file" accept=".pdf" style="width: 18rem;"></td>
            //     </tr>`
            //     ;


            //     <img
            //     className="imgDeleteGasto"
            //     alt="trash-fill-orange"
            //     src="/assets/img/actualizar-flecha.png"
            //     value={String(element.BENEF_CODIGO)}
            //     onClick={event => { onClickActualizarIncapacidad(element.BENEF_CODIGO) }}
            // />,


            tdBody +=
                `<tr>
                    <td>${key + 1}</td>
                    <td>${(data.RECHAZO !== null) ? data.RECHAZO : "N/A"}</td>
                    <td>${validarEstadoPeticionDocumentosBeneficiario(data.ARCH_ESTADO)}</td>
                    <td><a href="${data.ARCH_RUTA}" target="_blank"> <button id="btnArchivoModal_${key}" class="btn btn-link" ><img class="imgDeleteGasto" alt="download-to-storage-drive" src="/assets/img/download-to-storage-drive.png"/> </button> </a></td>
                    <td>
                        <input class="form-control" name="inputFile_${key}" id="inputFile_${key}" data-target="${data.ARCH_CODIGO}" type="file" accept=".pdf">
                    </td>
                </tr>`
                ;



        });

        Swal.fire({
            width: '900px',
            title: 'Documentos Relacionados',
            html: `
                <div class="row" style="text-align: left; margin: 10px; overflow-x: auto; white-space: nowrap;">
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
                    <div class="col-12 col-lg-12" style="text-align: right;">
                        <div class="d-grid gap-2 d-md-block">
                            <button id="btnModalGuardar" class="btn succesButton" type="button">Guardar</button>
                            <button id="btnModalCerrar" class="btn closeButton" type="button">Cerrar</button>
                        </div>
                    </div>
                </div>

                <br />
                `,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {

                document.getElementById("btnModalGuardar").addEventListener("click", () => { onClickGuardarDatosFormulario(dataApi) }, false);

                document.getElementById("btnModalCerrar").addEventListener("click", () => {
                    Swal.close();
                }, false);

                for (let index = 0; index < dataApi.length; index++) {
                    document.getElementById(`inputFile_${index}`).addEventListener("change", onChangeInputFileHandle, false);
                }

            },

        }).then((result) => {

            limpiarEventosModalActualizacionAlCerrar(dataApi);

        })

    }


    const [filesState, setFilesState] = useState([]);
    const onChangeInputFileHandle = (event) => {

        if (event.target.files[0].type === "application/pdf") {
            filesState.push({
                file: event.target.files[0],
                codigoArchivo: event.target.dataset.target,
            });

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


    const onClickGuardarDatosFormulario = (dataApi) => {

        if (filesState.length !== 0) {

            overlay(true);

            const dataForm = new FormData();
            filesState.forEach(infofile => {
                dataForm.append("file", infofile.file);
                dataForm.append("codigosArchivos", infofile.codigoArchivo);
            });
            dataForm.append("beneficiarioCedula", dataApi[0].BENEF_CEDULA);
            dataForm.append("beneficiarioCodigo", dataApi[0].BENEF_CODIGO);
            dataForm.append("cedulaColaborador", dataUser.cedula);

            postFetch({
                url: api.updateArchivosInclusionBeneficiarios,
                params: dataForm
            })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        html: `Los documentos para su solicitud radicada con el n??mero #${dataApi[0].BENEF_CODIGO} fueron subidos nuevamente para su aprobaci??n.`,
                        confirmButtonText: 'Continuar',
                        confirmButtonColor: "#1783EE",
                    }).then((result) => {
                        window.location.reload();
                    })
                })
                .catch(() => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error en la actualizaci??n, por favor revisa el formulario.',
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
