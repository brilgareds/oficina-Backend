import React from 'react';
import './dashboard.css';
import Header from '../../components/shared/header/Header';
import Footer from '../../components/shared/footer/Footer';
import { CardsOficina } from '../../components/cards-oficina/CardsOficina';

export const Dashboard = () => {

    let arrayMenu;
    let elementMenuPrincipal;
    let elementMenuSecundario;

    let urlImagenRedireccion;
    let elementModalPrincipal;
    let elementModalRedireccion;
    let elementModalUrlRedireccion;
    let elementModalImgImagenRedireccion;

    window.onload = async () => {
        elementMenuPrincipal = document.querySelector('#navbarVerticalNav');
        elementMenuSecundario = document.querySelector('#menu_secundario');

        elementModalPrincipal = document.querySelector('#modalPricipal');
        elementModalRedireccion = document.querySelector('#modalImagenRedireccion');
        elementModalUrlRedireccion = document.querySelector('#modalUrlImagenRedireccion');
        elementModalImgImagenRedireccion = document.querySelector('#modalImgImagenRedireccion');

        elementModalRedireccion.addEventListener('show.bs.modal', abriendoModalRedireccion);

        arrayMenu = await consultarMenu();
        elementMenuPrincipal.innerHTML = await obtenerMenuPrincipal(arrayMenu[0]);
        elementMenuSecundario.innerHTML = await obtenerMenuSecundario(arrayMenu[1]);
    }


    const test = (e) => {
        if (e.target.hash) {
            console.log('TEST TEST');
            e.preventDefault();
        }
    }


    const abriendoModalRedireccion = (e) => {

        const button = e.relatedTarget;
        const imgUrl = button.getAttribute('img-url');
        const urlRedireccion = button.getAttribute('img-redireccion');
        const target = (urlRedireccion && urlRedireccion !== '#') ? '_blank' : '_self';

        elementModalImgImagenRedireccion.src = (imgUrl) ? `../../../${imgUrl}` : '';
        elementModalUrlRedireccion.href = urlRedireccion;
        elementModalUrlRedireccion.target = target;
        elementModalUrlRedireccion.addEventListener('click', test);
    };



    const consultarMenu = async () => {

        try {
            const url = 'http://localhost:3001/api/v1/navigator/';
            return (await fetch(url)).json();
        }
        catch (e) {
            console.error(e);
            alert('Error al consultar el menu principal!');
        }
    };


    const obtenerMenuPrincipal = async (menus) => {
        let menuHtml = '';

        try {
            menus.subMenus.forEach((menu, a) => {

                menuHtml += `
                    <li class="nav-item">
                        <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                            <div class="col-auto navbar-vertical-label">${menu.titulo}</div>
                            <div class="col ps-0"><hr class="mb-0 navbar-vertical-divider" /></div>
                        </div>
                `;

                menu.subMenus.forEach((subMenu, b) => {
                    const obj = {
                        a: a + 1,
                        b: b + 1
                    };
                    menuHtml += obtenerMenuHtml(subMenu, obj, true);
                });

                menuHtml += `</li>`;
            });

            return menuHtml;
        } catch (e) {

            console.error(e);
            alert('Error al construir el menu principal!');
        }
    };



    const obtenerMenuSecundario = (menu) => {

        let menuSecundarioHtml = '';

        menu.subMenus.forEach(subMenu => {

            menuSecundarioHtml += `<a class="dropdown-item" href="#">${subMenu.titulo}</a>`;

        });

        return menuSecundarioHtml;
    }



    const nextLetter = (s) => {
        return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function (a) {
            var c = a.charCodeAt(0);
            switch (c) {
                case 90:
                    return 'A';
                case 122:
                    return 'a';
                default:
                    return String.fromCharCode(++c);
            }
        });
    }


    const construirId = (obj) => {

        let nuevoid = 'menu';
        for (let prop in obj) {
            nuevoid += `_${obj[prop]}`;
        }

        return nuevoid;
    };



    const definirPropiedadesSubMenu = (menu, obj, first) => {
        const { descripcion, clasesIcono, titulo, redireccionar, recurso, tipoAccion } = menu;
        const tieneSubMenus = !!(menu.subMenus.length);

        return {
            titulo,
            recurso,
            tipoAccion,
            clasesIcono,
            descripcion,
            redireccionar,
            tieneSubMenus,
            colorTitulo: (first) ? '' : 'color: #5e6e82;',
            target: (tipoAccion === 'R') ? 'target="_blank"' : '',
            dropDown: (tieneSubMenus) ? 'dropdown-indicator' : '',
            collapse: (tieneSubMenus) ? 'data-bs-toggle="collapse"' : '',
            href: (tipoAccion === 'R') ? redireccionar : `#${construirId(obj)}`,
            icono: !(first) ? '' : `<span class="nav-link-icon"><i class="${clasesIcono}"></i></span>`,
            abrirModal: (tipoAccion === 'RI') ? `img-redireccion="${redireccionar ?? '#'}" img-url="${recurso ?? ''}" data-bs-toggle="modal" data-bs-target="#modalImagenRedireccion"` : ''
        }
    };




    const obtenerMenuHtml = (menu, obj, first = false) => {

        const {
            tieneSubMenus, colorTitulo, target, dropDown, collapse, href, icono, abrirModal,
            descripcion, clasesIcono, titulo, redireccionar, recurso, tipoAccion
        } = definirPropiedadesSubMenu(menu, obj, first);

        let menuHtml = `
            <a class="nav-link ${dropDown}" href="${href}" ${abrirModal} ${collapse} aria-controls="${href}" ${target} title="${descripcion}">
                <div class="d-flex align-items-center" style="color: #1780E8;">
                    ${icono}
                    <span class="nav-link-text ps-1" style="${colorTitulo}" >${titulo}</span>
                </div>
            </a>
        `;

        if (tieneSubMenus) {

            menuHtml += `<ul class="nav collapse false" id="${construirId(obj)}"><li class="nav-item">`;

            const propiedades = Object.keys(obj);
            const nuevaProp = nextLetter(propiedades[propiedades.length - 1]);

            menu.subMenus.forEach((subMenu, i) => {
                obj[nuevaProp] = i + 1;

                menuHtml += obtenerMenuHtml(subMenu, obj);
            });

            delete obj[nuevaProp];

            menuHtml += `</li></ul>`;
        }

        return menuHtml;

    }

    const controlIngresoSalidaHtml = `
        <li class="nav-item">
            <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
              <div class="col ps-0">
                <hr class="mb-0 navbar-vertical-divider">
              </div>
            </div>

            <a class="nav-link" href="documentation/gulp.html" role="button">
              <div class="d-flex align-items-center btn" style="color: #1780E8; background: #4be064;">
                <span class="nav-link-icon" style="font-size: 1em;"><i class="bi bi-door-open"></i></span>
                <span class="nav-link-text ps-1">Control de ingreso y salida</span>
              </div>
            </a>
        </li>
    `;


    return (
        <main className="main dashboard" id="top">
            <div className="paddingContainer" data-layout="container">

                <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile">

                    <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                        <div className="toggle-icon-wrapper">
                            <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Menú"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                        </div>
                        <a className="navbar-brand" href="index.html">
                            <div className="d-flex align-items-center py-3">
                                <img className="me-2" src="./assets/img/logo-vum-login.svg" alt="" width="80" />
                            </div>
                        </a>
                    </div>

                    <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                        <div className="navbar-vertical-content scrollbar navbarPadding mb-2">

                            <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ padding: "13px", paddingTop: "0px" }}>
                            </ul>

                        </div>
                        <div className="divCerrarSesion text-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <img className="iconoCerrarSesion" src="./assets/img/icono-cerrar-sesion.svg" alt="icono-cerrar-sesion" />
                                </div>
                                <div className="col-md-12">
                                    <span className="spanCerrarSesion nav-link-text">Cerrar Sesion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="content">

                    <Header />

                    <div className="row p-4" id="root">

                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-533ab411-31a3-4e27-87a1-2e6e0f25835c" id="dom-533ab411-31a3-4e27-87a1-2e6e0f25835c">
                                    <div className="row light">

                                        <div className="col-md-12 text-center mb-4">
                                            <img className="imgVumHeader" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                                        </div>

                                        <div className="col-md-12 text-center mb-5">
                                            <h3 className="tituloComoTePodemosAyudar">¿Como te podemos ayudar?</h3>
                                            <span className="spanNombreUsuario">Jose Carlos Avila Perea</span>
                                        </div>

                                        <CardsOficina />

                                        <div className="col-md-12 text-center">
                                            <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice" type="submit" name="submit">
                                                <img className="imgControlIngresoYSalida" src="./assets/img/icono-control-ingreso-salida.svg" alt="icono-control-ingreso-salida" />
                                                Control de ingreso y salida
                                            </button>
                                            <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice" type="submit" name="submit">
                                                Califícanos y comunícate
                                            </button>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </main>
    )
}
