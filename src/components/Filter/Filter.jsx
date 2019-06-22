/* eslint-disable react/prefer-stateless-function */
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./Filter.css";
import { PaginataionSelector } from "../../selectors";
// eslint-disable-next-line import/extensions
import Pagination from "../Pagination/Pagination";
import NewFriendsForm from "../NewFriendsForm/NewFriendsForm";
import RenderFriends from "../RenderFriends/RenderFirends";
import Footer from "../Footer/Footer";

const mapStateToProps = state => ({
  friends: PaginataionSelector(state),
  friendsFetchingState: state.friendsFetchingState,
  currentPage: state.friends.currentPage,
  pageSize: state.friends.pageSize
});

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.top = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { currentPage } = this.props;
    if (prevProps.currentPage !== currentPage) {
      this.handleScroll();
    }
  }

  handleScroll = () => {
    this.top.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { friends, friendsFetchingState, pageSize, currentPage } = this.props;
    if (friendsFetchingState === "requested") {
      return (
        <div className={styles.wrapper}>
          <div className={styles.loader} />
        </div>
      );
    }

    if (friendsFetchingState === "failed") {
      return <div className={styles.failed}>Please, reload page!</div>;
    }
    return (
      <div className={styles.listContainer} ref={this.top}>
        <NewFriendsForm />
        <RenderFriends friends={friends} />
        {friends.length < pageSize && currentPage === 0 ? null : <Pagination />}
        <Footer />
      </div>
    );
  }
}
Friends.propTypes = {
  friends: PropTypes.array.isRequired,
  friendsFetchingState: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Friends);
