import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "../styles/Pagination.css";
import * as actions from "../actions";
import { getLengthFiltredArr, getPaginationNav } from "../selectors";

const mapStateToProps = state => ({
  currentPage: state.friends.currentPage,
  length: getLengthFiltredArr(state),
  pages: getPaginationNav(state),
  pageSize: state.friends.pageSize
});
const actionCreators = {
  changePage: actions.changePage,
  resetPage: actions.resetPage
};

class Pagination extends React.Component {
  componentDidUpdate(prevProps) {
    const { resetPage, length } = this.props;
    if (prevProps.length !== length) {
      resetPage();
    }
  }

  handleChangePage = page => () => {
    const { changePage, length, pageSize } = this.props;
    const totalPages = Math.ceil(length / pageSize) - 1;
    if (page < 0) {
      changePage({ page: 0 });
    } else if (page >= totalPages) {
      changePage({ page: totalPages });
    } else {
      changePage({ page });
    }
  };

  render() {
    const { currentPage, length, pages, pageSize } = this.props;
    const totalPages = Math.ceil(length / pageSize);

    const getItemButtonStyles = page =>
      cn({
        [styles.itemButton]: true,
        [styles.active]: currentPage + 1 === page
      });

    const getNavigationStyles = num =>
      cn({
        [styles.itemButton]: true,
        [styles.isDisabled]: currentPage === num
      });

    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button
              type="button"
              className={getNavigationStyles(0)}
              disabled={currentPage === 0}
              onClick={this.handleChangePage(0)}
            >
              First
            </button>
          </li>
          <li className={styles.item}>
            <button
              type="button"
              disabled={currentPage === 0}
              className={getNavigationStyles(0)}
              onClick={this.handleChangePage(currentPage - 1)}
            >
              «
            </button>
          </li>
          {pages.map(page => (
            <li key={_.uniqueId()} className={styles.item}>
              <button
                className={getItemButtonStyles(page)}
                type="button"
                onClick={this.handleChangePage(page - 1)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={styles.item}>
            <button
              className={getNavigationStyles(totalPages - 1)}
              onClick={this.handleChangePage(currentPage + 1)}
              type="button"
              disabled={currentPage === totalPages - 1}
            >
              »
            </button>
          </li>
          <li className={styles.item}>
            <button
              className={getNavigationStyles(totalPages - 1)}
              onClick={this.handleChangePage(totalPages - 1)}
              type="button"
              disabled={currentPage === totalPages - 1}
            >
              Last
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired
};
export default connect(
  mapStateToProps,
  actionCreators
)(Pagination);
