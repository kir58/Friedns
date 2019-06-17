/* eslint-disable import/extensions */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./RenderFirends.css";
import { getInitials } from "../../utils";

const RenderFriends = ({ friends }) => {
  if (friends.length === 0) {
    return null;
  }
  return (
    <ul className={styles.list}>
      {friends.map(({ id, age, name, gender, company }) => (
        <li key={id} className={styles.item}>
          <Link to={`/${id}`} key={id} className={styles.link}>
            <div className={styles.icon}>{getInitials(name)}</div>
            <div className={styles.text}>
              <div className={styles.name}>{name}</div>
              <div className={styles.inform}>
                {`${gender}, ${age} y. o. works for ${company}`}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
RenderFriends.propTypes = {
  friends: PropTypes.array.isRequired
};
export default RenderFriends;
