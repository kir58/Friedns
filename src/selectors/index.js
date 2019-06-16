import { createSelector } from "reselect";

const initData = {
  sex: "all",
  name: "",
  min: "18",
  max: "55",
  work: ""
};

const getFriends = state => {
  const { byId, allIds } = state.friends;
  return allIds.map(id => byId[id]);
};
const getCurrentPage = state => state.friends.currentPage;
const getFilterValues = state =>
  state.form.newFriends ? state.form.newFriends.values : initData;
const getPageSize = state => state.friends.pageSize;

const filterByName = (userName, inputName) => {
  const str = inputName.toLowerCase();
  const lastName = ` ${str}`;
  return (
    userName.toLowerCase().indexOf(str) === 0 ||
    userName.toLowerCase().indexOf(lastName) !== -1
  );
};

const filterByWork = (userJob, inputJob) =>
  userJob.toLowerCase().indexOf(inputJob.toLowerCase()) === 0;

const filterByGender = (userGender, inputGender) =>
  userGender === inputGender || inputGender === "all";

const filterByAge = (userAge, min, max) => userAge >= min && userAge <= max;

const filteredFriendsAll = createSelector(
  getFriends,
  getFilterValues,
  (friends, values) => {
    return friends.filter(
      friend =>
        filterByGender(friend.gender, values.sex) &&
        filterByName(friend.name, values.name) &&
        filterByWork(friend.company, values.work) &&
        filterByAge(friend.age, values.min, values.max)
    );
  }
);
export const getLengthFiltredArr = createSelector(
  filteredFriendsAll,
  filtred => filtred.length
);

export const PaginataionSelector = createSelector(
  filteredFriendsAll,
  getCurrentPage,
  getPageSize,
  (filtred, currentPage, pageSize) => {
    const start = currentPage * pageSize;
    return filtred.slice(start, start + pageSize);
  }
);

export const getPaginationNav = createSelector(
  getLengthFiltredArr,
  getCurrentPage,
  getPageSize,
  (length, currentPage, pageSize) => {
    const totalPages = Math.ceil(length / pageSize);
    let startPage;
    let endPage;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 3;
    }
    return [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);
  }
);
