/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import * as actions from "../actions";

const friendsFetchingState = handleActions(
  {
    [actions.fetchFriendsRequest]() {
      return "requested";
    },
    [actions.fetchFriendsFailure]() {
      return "failed";
    },
    [actions.fetchFriendsSuccess]() {
      return "finished";
    }
  },
  "none"
);

const friends = handleActions(
  {
    [actions.fetchFriendsSuccess](state, { payload }) {
      return {
        ...state,
        byId: payload.friends.reduce(
          (acc, fr) => ({ ...acc, [fr.id]: fr }),
          {}
        ),
        allIds: payload.friends.map(fr => fr.id),
      };
    },
    [actions.changePage](state, { payload: { page } }
    ) {
      return {
        ...state,
        currentPage: page
      };
    },
    [actions.resetPage](state) {
      return {
        ...state,
        currentPage: 0,
      };
    }
  },
  { byId: {}, allIds: [], currentPage: 0, pageSize: 24 }
);

export default combineReducers({
  form: formReducer,
  friendsFetchingState,
  friends
});
