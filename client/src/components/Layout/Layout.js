import React from "react";
import Sidemenu from "../views/UtilPage/Sidemenu";
import Header from "../views/UtilPage/Header";
import styles from "./Layout.module.css";
import ExampleSide from "../views/UtilPage/ExampleSide";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        <Sidemenu />
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  );
}
