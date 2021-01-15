import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import { addEvent, updateEvent, deleteEvent } from "../actions/index";
import { addCategory, deleteCategory } from "../actions/index";
import { addHistory, initHistory, updateHistory } from "../actions/index";
import { addKey, deleteKey } from "../actions/index";

const events = createReducer([], (builder) => {
  builder.addCase(addEvent, (state, action) => {
    state.push(action.payload.form);
  });
});

const categories = createReducer([], (builder) => {
  builder
    .addCase(addCategory, (state, action) => {
      state.push(action.payload);
    })
    .addCase(deleteCategory, (state, action) => {
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
    });
});

const histories = createReducer([], (builder) => {
  builder
    .addCase(initHistory, (state, action) => {
      return action.payload.history;
    })
    .addCase(addHistory, (state, action) => {
      state.push(action.payload.history);
    })
    .addCase(updateHistory, (state, action) => {
      console.log(state.indexOf(action.payload.history));
      let index = state.indexOf(action.payload.history);
      state.splice(index, 1);
    });
});

const keys = createReducer([], (builder) => {
  builder
    .addCase(addKey, (state, action) => {
      state.push(action.payload.key);
    })
    .addCase(deleteKey, (state, action) => {
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
    });
});

export default combineReducers({
  todos,
  visibilityFilter,
  events,
  categories,
  histories,
  keys,
});
