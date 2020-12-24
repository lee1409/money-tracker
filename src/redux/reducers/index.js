import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import { addEvent, updateEvent, deleteEvent } from "../actions/index";

const event = createReducer([], (builder) => {
  builder.addCase(addEvent, (state, action) => {
    state.push(action.payload.form);
  });
});

export default combineReducers({
  todos,
  visibilityFilter,
  event,
});
