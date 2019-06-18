import { Link } from "react-router-dom";
import React from "react";
import styles from "./Header.css";
import Logo from "../../assets/logo.png";

export default () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img className={styles.picture} alt="" src={Logo} />
        </div>
      </Link>
    </div>
  );
};
