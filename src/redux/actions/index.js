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

export const resetGoal = createAction("RESET_GOAL", (goal) => ({
  payload: goal,
}));

export const updateGoal = createAction("UPDATE_GOAL", (goal) => ({
  payload: goal,
}));

export const initHistory = createAction("INITIAL_HISTORY", (history) => ({
  payload: history,
}));
export const addBulkHistory = createAction("BULK_ADD_HISTORY", (histories) => ({
  payload: histories,
}));

export const addHistory = createAction("ADD_HISTORY", (history) => ({
  payload: history,
}));

export const updateHistory = createAction("UPDATE_HISTORY", (history) => ({
  payload: history,
}));

export const overwriteToday = createAction("OVERWRITE_TODAY", (today) => ({
  payload: today,
}));

export const updateToday = createAction("UPDATE_TODAY", (today) => ({
  payload: today,
}));

export const updatelastAccess = createAction("UPDATE_LAST_ACCESS");

export const incHotSteak = createAction("INC_HOT_STEAK");

export const resetHotSteak = createAction("RESET_HOT_STEAK");

export const updtEnableAuth = createAction("UPDATE_ENABLE_AUTH", (key) => ({
  payload: key,
}));
export const updtDisableAuth = createAction("UPDATE_DISABLE_AUTH", (key) => ({
  payload: key,
}));

export const toggleAuth = createAction("TOGGLE_AUTH");

export const toggleToday = createAction("TOGGLE_TODAY", (uid) => ({
  payload: uid,
}));

export const toggleLogin = createAction("TOGGLE_LOGIN");

export const logout = createAction('LOGOUT')

export const login = createAction('LOGIN');

export const disableFirstAccess = createAction('DISABLE_FIRST_ACCCESS');