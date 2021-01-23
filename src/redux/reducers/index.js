import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import {
  updatelastAccess,
  updateToday,
  incHotSteak,
  resetHotSteak,
  toggleToday,
  updateEvent,
  deleteEvent,
  resetGoal,
  updateGoal,
  toggleAuth
} from "../actions/index";

import { overwriteToday } from "../actions/index";
import { addEvent } from "../actions/index";
import { addCategory, deleteCategory } from "../actions/index";
import {
  addHistory,
  initHistory,
  updateHistory,
  addBulkHistory,
} from "../actions/index";

const events = createReducer([], (builder) => {
  builder
    .addCase(addEvent, (state, action) => {
      state.push(action.payload);
    })
    .addCase(updateEvent, (state, action) => {
      let index = state.findIndex(
        (element) => element.uid === action.payload.uid
      );
      if (index !== -1) {
        state.splice(index, 1, action.payload);
      }
      console.warn("Index not found: ", index, state, action.payload.uid);
    })
    .addCase(deleteEvent, (state, action) => {
      let index = state.findIndex(
        (element) => element.uid === action.payload.uid
      );
      state.splice(index, 1);
    });
});

const categories = createReducer(
  [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Clothing",
    "Medical",
    "Insurance",
    "Household Items",
    "Personal",
    "Debt",
    "Retirement",
    "Education",
    "Savings",
    "Gifts",
  ],
  (builder) => {
    builder
      .addCase(addCategory, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteCategory, (state, action) => {
        let index = state.indexOf(action.payload);
        state.splice(index, 1);
      });
  }
);

const profileGoal = createReducer(
  {
    username: "Alice",
    name: "A Gift",
    amount: 20,
    date: new Date().toDateString(),
  },
  (builder) => {
    builder
      .addCase(resetGoal, (state, action) => {
        state = action.payload;
      })
      .addCase(updateGoal, (state, action) => {
        return Object.assign({}, action.payload, { date: state.date });
      });
  }
);

const today = createReducer([], (builder) => {
  builder
    .addCase(overwriteToday, (_, action) => {
      return action.payload;
    })
    .addCase(updateToday, (state, action) => {
      let index = state.findIndex((ele) => ele.uid === action.payload.uid);
      state.splice(index, 1, action.payload);
    })
    .addCase(toggleToday, (state, action) => {
      let index = state.findIndex((ele) => ele.uid === action.payload);
      if (index !== -1) {
        let event = state[index];
        let updatedEvent = { ...event, isCompleted: !event.isCompleted };
        state.splice(index, 1, updatedEvent);
      }
      console.warn("Index not found: ", index, state, action.payload.uid);
    });
});

const hotSteak = createReducer(1, (builder) => {
  builder
    .addCase(incHotSteak, (state) => {
      state++;
    })
    .addCase(resetHotSteak, (state) => {
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

const keys = createReducer(
  { first_access: true, allow_auth: false },
  (builder) => {
    builder
    .addCase(toggleAuth, (state) => {
      state.allow_auth = !state.allow_auth;
    })
  }
);

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
  profileGoal,
});
