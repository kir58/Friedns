import React from "react";
import styles from "./Header.css";

export default () => {
  return (
    <div className={styles.header}>
      <img
        className={styles.picture}
        alt=""
        src="https://library.kissclipart.com/20180829/ale/kissclipart-house-icon-clipart-computer-icons-clip-art-1ca007c706960d7d.jpg"
      />
    </div>
  );
};
