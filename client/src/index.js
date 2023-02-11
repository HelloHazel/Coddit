import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ProSidebarProvider } from "react-pro-sidebar";
import { CookiesProvider } from "react-cookie";
import { useEffect } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(process.env.PUBLIC_URL);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <CookiesProvider>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </CookiesProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
