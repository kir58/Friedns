import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Friend.css";
import { getInitials, randomSlice } from "../../utils";
import RenderFriends from "../RenderFriends/RenderFirends";

const USER_FRIENDS_SIZE = 15;

const mapStateToProps = state => ({
  byId: state.friends.byId
});
const renderList = (ids = [], usersObj, size) => {
  const users = ids.map(idEL => usersObj[idEL]);
  const arrForRender = randomSlice(users, ids.length, size);
  return <RenderFriends friends={arrForRender} />;
};
const Friend = ({ byId, match }) => {
  const { id } = match.params;
  const { age, company, email, gender, name, friends } = byId[id] || {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{name}</span>
      </div>
      <div className={styles.main}>
        <div className={styles.element}>
          <div className={styles.icon}>
            <div className={styles.picture}>{name && getInitials(name)}</div>
          </div>
          <div className={styles.name}>{name}</div>
          <div className={styles.info}>
            <div className={styles.item}>
              Company:
              <span className={styles.description}>{` ${company || ""}`}</span>
            </div>
            <div className={styles.item}>
              Email:
              <span className={styles.description}>{` ${email || ""}`}</span>
            </div>
            <div className={styles.item}>
              Age:
              <span className={styles.description}>{` ${age || ""}`}</span>
            </div>
            <div className={styles.item}>
              Gender:
              <span className={styles.description}>{` ${gender || ""}`}</span>
            </div>
          </div>
        </div>
        <div className={styles.element}>
          <h3>Friends</h3>
          {renderList(friends, byId, USER_FRIENDS_SIZE)}
        </div>
      </div>
    </div>
  );
};
Friend.propTypes = {
  byId: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(Friend);
