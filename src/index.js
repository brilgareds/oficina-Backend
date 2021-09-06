import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { AppRouter } from "./routers/AppRouter";
import './cssGeneral/general.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>,
  document.getElementById("rootVum")
);
