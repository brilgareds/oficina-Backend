import React, { useState } from 'react'

export const ToggleIcon = () => {

    const [openMenu, setopenMenu] = useState(false);

    const onClickToggleHandle = () => {

        document.querySelector("html").classList.remove("navbar-vertical-collapsed");

        if (openMenu) {
            document.querySelector("html").classList.remove("navbar-vertical-collapsed");
            setopenMenu(false);
        } else if (!openMenu) {
            document.querySelector("html").classList.add("navbar-vertical-collapsed");
            setopenMenu(true);
        }
    }

    return (
        <button onClick={onClickToggleHandle} className="btn navbar-toggler-humburger-icon navbar-vertical-toggle">
            <span className="navbar-toggle-icon">
                <span className="toggle-line"></span>
            </span>
        </button>
    )
}
