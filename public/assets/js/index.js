
window.onload = async () => {
    const elementMenu = document.querySelector('#navbarVerticalNav');
    const menu = await obtenerMenu();

    elementMenu.innerHTML = menu + controlIngresoSalidaHtml;
}



const obtenerMenu = async () => {

    try {
        const url = 'http://localhost:3000/api/v1/navigator/';
        const menus = await (await fetch(url)).json();
        let menuHtml = '';
        console.log('\n\nData: ', menus);

        menus.forEach((menu, a) => {

            menuHtml += `
          <li class="nav-item">
            <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
              <div class="col-auto navbar-vertical-label">${menu.titulo}</div>
              <div class="col ps-0"><hr class="mb-0 navbar-vertical-divider" /></div>
            </div>
        `;

            menu.subMenus.forEach((subMenu, b) => {
                const obj = {
                    a,
                    b
                };
                menuHtml += obtenerMenuHtml(subMenu, obj, true);
            });

            menuHtml += `</li>`;
        });

        return menuHtml;
    } catch (e) {

        console.error(e);
        alert('Error al consultar el menu principal!');
    }
};



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



const obtenerMenuHtml = (menu, obj, first = false) => {

    let menuHtml = `
      <a class="nav-link ${(menu.tieneSubMenus) ? 'dropdown-indicator' : ''}" href="#${construirId(obj)}" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${construirId(obj)}">
          <div class="d-flex align-items-center" style="color: #1780E8;">
              ${!(first) ? '' : `<span class="nav-link-icon"><i class="${menu.clasesIcono}"></i></span>`}
              <span class="nav-link-text ps-1" ${(first) ? '' : 'style="color: #5e6e82;"'} >${menu.titulo}</span>
          </div>
      </a>
      <ul class="nav collapse false" id="${construirId(obj)}">
          <li class="nav-item">
  `;

    const propiedades = Object.keys(obj);
    const nuevaProp = nextLetter(propiedades[propiedades.length - 1]);

    if (menu.subMenus.length) {

        menu.subMenus.forEach((subMenu, i) => {
            console.log('\n\nPropiedades: ', propiedades, ' Nueva Propiedad: ' + nuevaProp);
            if (nuevaProp === 'e') {
                console.log('\n\nsubMenu: ', subMenu, '\n\n');
            }
            obj[nuevaProp] = i;
            menuHtml += obtenerMenuHtml(subMenu, obj);

        });

    }

    menuHtml += `</li></ul>`;

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