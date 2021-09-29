import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../../../environments/environments";
import { advertenciaFormularioVacio, getFetchWithHeader, overlay, postFetch } from "../../../../generalHelpers";

export const useEpsCajaRadicar = (formInitialState = {}, dataUser) => {

    const exprRegNumeros = /^[0-9+]+$/;                                                 //Expresion regular para validar el formato de solo numeros
    const exprRegTelefono = /^[0-9+() -?]+$/;                                           //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;       //Expresion regular para validar los correos electronicos
    const exprRegSoloLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü\s+]+$/;                   //Expresion regular para validar solo letras
    const [loadingPage, setloadingPage] = useState(formInitialState.loadingPage)

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

    const [stateBeneficioPara, setstateBeneficioPara] = useState(false)
    const onClickButtonRadioHandle = ({ target }) => {

        if (target.checked && target.dataset.target === "eps") {
            setstateBeneficioPara("eps");
        } else if (target.checked && target.dataset.target === "caja") {
            setstateBeneficioPara("caja");
        } else {
            setstateBeneficioPara(false);
        }

    }

    useEffect(() => {
        if (loadingPage === true) {
            overlay(true);
            setloadingPage(false);
            cargarBeneficiarios();
            cargarTipoIdentificacion();
            document.getElementById('root').className = 'EpsCajaRadicar';
        }

        return () => {
            overlay(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingPage])


    const [stateRowsBeneficiarios, setstateRowsBeneficiarios] = useState([]);
    const cargarBeneficiarios = () => {

        let rowsDTable = [];

        postFetch({
            url: api.getBeneficiariesByUser,
            params: {
                cedula: dataUser.cedula
            }
        })
            .then((responseGetBeneficiariesByUser) => {

                responseGetBeneficiariesByUser.forEach(element => {
                    rowsDTable.push({
                        identificacion: element.cod_fami,
                        nombres: `${element.nom_fami} ${element.ape_fami}`,
                        genero: element.sex_fami,
                        edad: element.Edad,
                        beneficiarioEps: element.ben_eeps,
                        beneficiarioCaja: element.BEN_CACO,
                    });
                });

                setstateRowsBeneficiarios(rowsDTable);

            });
    }


    const [statetipoParentesco, setstatetipoParentesco] = useState([])
    useEffect(() => {
        if (stateBeneficioPara !== false) {

            overlay(true);

            postFetch({
                url: api.getConsultarParentesco,
                params: {
                    beneficioPara: String(stateBeneficioPara)
                }
            })
                .then((resGetConsultarParentesco) => {

                    let optionsCategory = [{ value: null, label: "SELECCIONE..." }];
                    overlay(false);
                    resGetConsultarParentesco.forEach(element => {
                        optionsCategory.push({ value: element.TIP_CODIGO, label: element.TIP_NOMBRE.toUpperCase() })
                    });

                    setstatetipoParentesco(optionsCategory);
                    setStateForm(oldValue => ({
                        ...oldValue,
                        tipoParentesco: optionsCategory?.[0].value
                    }));

                });
        }
    }, [stateBeneficioPara])


    const [filesState, setFilesState] = useState([]);
    const onChangeInputFileHandle = ({ tipoArchivo, documento, target }) => {

        if (target.target.files[0].type === "application/pdf") {

            filesState.push({
                fileInfo: target.target.files[0],
                tipoDocumento: documento,
                codigoTipoArchivo: tipoArchivo,
            });

            setFilesState(filesState);

        } else {
            document.getElementById(target.target.id).value = "";
            Swal.fire({
                icon: 'error',
                title: 'Solo se permiten subir archivos tipo pdf',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: "#A6A6A6",
            });
        }

    }

    useEffect(() => {

        if (formValue.tipoParentesco) {
            (stateBeneficioPara === "eps") ? consultarArchivos(formValue.tipoParentesco.value) : consultarCaja(formValue.tipoParentesco.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValue.tipoParentesco])


    const [stateRowsTableDocumentos, setstateRowsTableDocumentos] = useState([])
    const consultarArchivos = (tipoParentesco) => {
        overlay(true);
        postFetch({
            url: api.consultarArchivosBeneficiarios,
            params: {
                beneficioPara: String(stateBeneficioPara),
                tipParentesco: Number(tipoParentesco)
            }
        })
            .then((resConsultarArchivosBeneficiarios) => {

                let rowsDTable = [];
                setFilesState(filesState.splice(0, filesState.length));
                overlay(false);
                setstateRowsTableDocumentos([]);

                resConsultarArchivosBeneficiarios.forEach((element, key) => {
                    let numberRow = key + 1;
                    rowsDTable.push({
                        numero: numberRow,
                        documento: (element.TIP_NOMBRE).toUpperCase(),
                        archivo:
                            <>
                                <input
                                    onChange={values => { onChangeInputFileHandle({ tipoArchivo: element.TIP_CODIGO, documento: (element.TIP_NOMBRE).toUpperCase(), target: values, }) }}
                                    key={key}
                                    id={`file_${numberRow}`} 
                                    name={`file_${numberRow}`}
                                    className="form-control"
                                    type="file"
                                    accept=".pdf"
                                    required={element?.TIP_ATRIBUTO3}
                                />
                            </>
                    });
                });

                setstateRowsTableDocumentos(rowsDTable);

            });
    }

    const consultarCaja = (tipoParentesco) => {
        postFetch({
            url: api.getCajasBeneficiario,
            params: {
                cedula: dataUser.cedula
            }
        })
            .then((resGetConsultarParentesco) => {

                let mensaje = ``;

                switch (Number(resGetConsultarParentesco[0].cod_enti)) {
                    case 21:
                        mensaje = `Queremos informarle que la caja de compensaci&oacuten a la cual pertenece, tiene un sistema de autogesti&oacuten que le permitir&aacute; hacer la inclusi&oacuten de sus beneficiarios, por lo cual le invitamos a hacer el tr&aacutemite directamente en la p&aacutegina<br><br>www.comfenalco.com.co`;
                        break;
                    case 49:
                        mensaje = `Estimado (a) trabajador, queremos informarle que la Caja de compensacion a la cual pertenece  tiene un sistema de autogestion, que le permitira hacer  la inclusion de sus beneficiarios, por  lo  cual lo invitamos a realizar este  tramite directamente en la pagina<br><br>www.colsubsidio.com<br>Si tiene alguna dificultad o inquietud no dude en contactar a Jakeline Rueda Celular 3222569460, quien estara para asesorarlo en este proceso\n`;
                        break;
                    case 50:
                        mensaje = `Estimado (a) trabajador, queremos informarle que la Caja de compensacion a la cual pertenece  tiene un sistema de autogestion, que le permitirÃ¡ hacer  la inclusion de sus beneficiarios, por  lo  cual lo invitamos a realizar este  tramite directamente en la pagina<br><br>www.colsubsidio.com<br>Si tiene alguna dificultad o inquietud no dude en contactar a Jakeline Rueda Celular 3222569460, quien estara para asesorarlo en este proceso\n`;
                        break;
                    default:
                        break;
                }

                Swal.fire({
                    icon: 'info',
                    html: mensaje,
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: 'Continuar',
                    cancelButtonColor: "#1783EE",

                }).then((result) => {
                    consultarArchivos(tipoParentesco);
                })



            });
    }


    const [stateTipoIdentificacion, setstateTipoIdentificacion] = useState({});
    const cargarTipoIdentificacion = () => {

        getFetchWithHeader({
            url: api.getTipoDocumentoBeneficiario,
        })
            .then((resGetTipoDocumentoBeneficiario) => {

                let optionsCategory = [{ value: null, label: "SELECCIONE..." }];

                resGetTipoDocumentoBeneficiario.forEach(element => {
                    optionsCategory.push({ value: element.TIP_CODIGO, label: element.TIP_NOMBRE.toUpperCase() })
                });

                setstateTipoIdentificacion(optionsCategory);

            });

    }

    const onSubmitFormIncapacidad = (event) => {

        event.preventDefault();
        overlay(true);

        const allData = {
            dataColaborador: {
                cedula: formValue?.cedula || null,
                correoElectronico: formValue?.correoElectronico || null,
                nombreUsuario: formValue?.nombreUsuario || null,
                telefono: formValue?.telefono || null,
                empresa: dataUser.empresa
            },
            dataNuevoBeneficiario: {
                apellidoBeneficiario: formValue?.apellidoBeneficiario || null,
                cedulaBeneficiario: formValue?.cedulaBeneficiario || null,
                fechaNacimientoBeneficiario: formValue?.fechaNacimientoBeneficiario || null,
                nombreBeneficiario: formValue?.nombreBeneficiario || null,
                beneficiarioPara: (stateBeneficioPara) ? stateBeneficioPara : null,
                tipoParentesco: formValue?.tipoParentesco?.value || null,
                tipoDocumento: formValue?.tipoDocumento?.value || null,
            },
        }

        if (!validarDatosFormulario(allData)) {
            advertenciaFormularioVacio();
        } else {
            const dataForm = new FormData();
            dataForm.append("allData", JSON.stringify(allData));

            console.log("allData", allData);

            filesState.forEach(file => {
                dataForm.append("file", file.fileInfo);
                dataForm.append("filesNames", file.tipoDocumento);
                dataForm.append("filesCodigos", file.codigoTipoArchivo);
            });

            postFetch({
                url: api.saveInclusionBeneficios,
                params: dataForm
            })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Datos guardados correctamente.',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: "#A6A6A6",
                    }).then((result) => {
                        window.location.reload();
                    })
                })
                .catch(() => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error en la inserción, por favor revisa el formulario.',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: "#A6A6A6",
                    });
                });

        }

    }


    const validarDatosFormulario = (allData) => {

        const { correoElectronico, telefono } = allData.dataColaborador;
        const { apellidoBeneficiario, beneficiarioPara, cedulaBeneficiario, nombreBeneficiario, tipoDocumento, tipoParentesco } = allData.dataNuevoBeneficiario;

        if (
            exprRegTelefono.test(telefono) &&
            exprRegEmail.test(correoElectronico) &&
            exprRegSoloLetras.test(beneficiarioPara) &&
            exprRegNumeros.test(tipoParentesco) &&
            exprRegNumeros.test(tipoDocumento) &&
            exprRegNumeros.test(cedulaBeneficiario) &&
            exprRegSoloLetras.test(nombreBeneficiario) &&
            exprRegSoloLetras.test(apellidoBeneficiario)
        ) {
            return true;
        }

        return false;

    }


    return ({
        formValue,
        stateRowsBeneficiarios,
        stateTipoIdentificacion,
        statetipoParentesco,
        stateRowsTableDocumentos,
        onChangeInputHandle,
        onSubmitFormIncapacidad,
        onChangeSelectHandle,
        onClickButtonRadioHandle,
    });
}
