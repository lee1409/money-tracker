import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import {
  addEvent,
  updateEvent,
  deleteEvent,
  updatelastAccess,
  updateToday,
  incHotSteak,
  resetHotSteak
} from "../actions/index";
import { addCategory, deleteCategory } from "../actions/index";
import {
  addHistory,
  initHistory,
  updateHistory,
  addBulkHistory,
} from "../actions/index";

import { overwriteToday } from "../actions/index";
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

const today = createReducer([], (builder) => {
  builder
    .addCase(overwriteToday, (_, action) => {
      return action.payload;
    })
    .addCase(updateToday, (state, action) => {
      let index = state.findIndex((ele) => ele.uid === action.payload.uid);
      state.splice(index, 1, action.payload);
    });
});

const hotSteak = createReducer(1, (builder) => {
  builder.addCase(incHotSteak, (state) => {
    state++;
  }).addCase(resetHotSteak, (state) => {
    state = 1;
  });
});


const lastAccess = createReducer(new Date().toDateString(), (builder) => {
  builder.addCase(updatelastAccess(), (state) => {
    state = new Date().toDateString();
  });
});


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
  lastAccess,
  today,
  hotSteak,
  keys,
});
