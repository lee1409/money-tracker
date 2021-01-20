import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import { addEvent, updateEvent, deleteEvent, updatelastAccess } from "../actions/index";
import { addCategory, deleteCategory } from "../actions/index";
import {
  addHistory,
  initHistory,
  updateHistory,
  addBulkHistory,
} from "../actions/index";

import {updateToday} from '../actions/index'


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


const today = createReducer([], (builder) => {
  builder.addCase(updateToday, (_, action) => {
    return action.payload;
  });
})

const lastAccess = createReducer(new Date().toDateString(), (builder) => {
  builder.addCase(updatelastAccess(), (state) => {
    state = new Date().toDateString();
  })
})

const histories = createReducer([], (builder) => {
  builder
    .addCase(initHistory, (state, action) => {
      return action.payload.history;
    })
    .addCase(addBulkHistory, (state, action) => {
      return Array.concat(state, action.payload);
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

export default combineReducers({
  todos,
  visibilityFilter,
  events,
  categories,
  histories,
  lastAccess,
  today,
});
