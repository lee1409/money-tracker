import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import { addEvent, updateEvent, deleteEvent } from "../actions/index";
import { addCategory, deleteCategory} from '../actions/index'

const events = createReducer([], (builder) => {
  builder.addCase(addEvent, (state, action) => {
    state.push(action.payload.form);
  });
});

const categories = createReducer([], (builder) => {
  builder.addCase(addCategory, (state, action) => {
    state.push(action.payload);
  }).addCase(deleteCategory, (state, action) => {
    let index = state.indexOf(action.payload);
    state.splice(index, 1);
  })
})

export default combineReducers({
  todos,
  visibilityFilter,
  events,
  categories,
});
