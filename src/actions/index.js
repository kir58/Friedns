import { createAction } from "redux-actions";
import axios from "axios";

export const fetchFriendsRequest = createAction("FRIENDS_FETCH_REQUEST");
export const fetchFriendsSuccess = createAction("FRIENDS_FETCH_SUCCESS");
export const fetchFriendsFailure = createAction("FRIENDS_FETCH_FAILURE");

export const changePage = createAction("CHANGE_PAGE");
export const resetPage = createAction("RESET_PAGE");
export const fetchFriends = () => async dispatch => {
  dispatch(fetchFriendsRequest());
  try {
    const url = "https://api.myjson.com/bins/11hi3x";
    const request = await axios.get(url);
    const { data } = request;
    dispatch(fetchFriendsSuccess({ friends: data }));
  } catch (e) {
    dispatch(fetchFriendsFailure());
  }
};
