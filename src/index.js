import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { AppRouter } from "./routers/AppRouter";
import './cssGeneral/general.css';

ReactDOM.render(
    <AppRouter/>,
  document.getElementById("rootVum")
);
