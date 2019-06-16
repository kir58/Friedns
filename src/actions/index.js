import { createAction } from "redux-actions";

export const fetchFriendsRequest = createAction("FRIENDS_FETCH_REQUEST");
export const fetchFriendsSuccess = createAction("FRIENDS_FETCH_SUCCESS");
export const fetchFriendsFailure = createAction("FRIENDS_FETCH_FAILURE");

export const changePage = createAction("CHANGE_PAGE");
export const resetPage = createAction("RESET_PAGE");
export const fetchFriends = () => async dispatch => {
  dispatch(fetchFriendsRequest());
  try {
    const url = "https://api.myjson.com/bins/11hi3x";
    const response = await fetch(url);
    const json = await response.json();
    dispatch(fetchFriendsSuccess({ friends: json }));
  } catch (e) {
    dispatch(fetchFriendsFailure());
  }
};
