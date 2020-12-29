import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

import { addEvent, updateEvent, deleteEvent } from "../actions/index";
import { addCategory, deleteCategory} from '../actions/index'
import { addGoal, updateGoal} from '../actions/index'


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

const goal_ = createReducer([], (builder) => {
  builder
  //   .addCase(addGoal, (state, action) => {
  //   state.push(action.payload);
  // })
    .addCase(updateGoal, (state, action) => {
    if(state.length > 0){
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
      state.push(action.payload);
    }else{
      state.push(action.payload);
    }
  })
})

export default combineReducers({
  todos,
  visibilityFilter,
  events,
  categories,
  goal_
});
