
var isRTL = JSON.parse(localStorage.getItem('isRTL'));
if (isRTL) {
    var linkDefault = document.getElementById('style-default');
    var userLinkDefault = document.getElementById('user-style-default');
    linkDefault.setAttribute('disabled', true);
    userLinkDefault.setAttribute('disabled', true);
    document.querySelector('html').setAttribute('dir', 'rtl');
} else {
    var linkRTL = document.getElementById('style-rtl');
    var userLinkRTL = document.getElementById('user-style-rtl');
    linkRTL.setAttribute('disabled', true);
    userLinkRTL.setAttribute('disabled', true);
}

var isFluid = JSON.parse(localStorage.getItem('isFluid'));
if (isFluid) {
    var container = document.querySelector('[data-layout]');
    container.classList.remove('container');
    container.classList.add('container-fluid');
}

var navbarStyle = localStorage.getItem("navbarStyle");
if (navbarStyle && navbarStyle !== 'transparent') {
    document.querySelector('.navbar-vertical').classList.add(`navbar-${navbarStyle}`);
}