/* eslint-disable import/no-anonymous-default-export */
import { PROFILE_DETAILS_FETCHED } from "./actions";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_DETAILS_FETCHED:
      return { ...state, ...payload };
      
    default:
      return state;
  }
};