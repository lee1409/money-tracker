import { createAction } from "@reduxjs/toolkit";

let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}



export const addEvent = createAction("ADD_EVENT", (form) => ({
  payload: {
    form
  }
}))

export const updateEvent = createAction("UPDATE_EVENT", (form) => ({payload: form}));

export const deleteEvent = createAction("DELETE_EVENT", (id) => ({payload: id}));


