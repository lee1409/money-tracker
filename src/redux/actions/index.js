import { createAction } from "@reduxjs/toolkit";

let nextTodoId = 0;
export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text,
});

export const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id,
});

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

export const addEvent = createAction("ADD_EVENT", (form) => ({
  payload: form,
}));

export const updateEvent = createAction("UPDATE_EVENT", (form) => ({
  payload: form,
}));

export const deleteEvent = createAction("DELETE_EVENT", (id) => ({
  payload: id,
}));

export const addCategory = createAction("ADD_CATEGORY", (category) => ({
  payload: category,
}));

export const deleteCategory = createAction("DELETE_CATEGORY", (category) => ({
  payload: category,
}));

export const initHistory = createAction("INITIAL_HISTORY", (history) => ({
  payload: history,
}));

export const addHistory = createAction("ADD_HISTORY", (history) => ({
  payload: history,
}));

export const updateHistory = createAction("UPDATE_HISTORY", (history) => ({
  payload: history,
}));

export const addKey = createAction("ADD_KEY", (key) => ({ payload: key }));

export const deleteKey = createAction("DELETE_KEY", (key) => ({
  payload: key,
}));
