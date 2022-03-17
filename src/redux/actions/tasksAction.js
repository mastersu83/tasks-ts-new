import axios from "axios";

export const addTaskAction = (text, completed) => ({
  type: "ADD_TASK",
  payload: {
    text,
    completed,
  },
});

export const clearAllTasksAction = () => ({ type: "CLEAR_ALL_TASKS" });

export const checkAllAction = (toggleAllCheck) => ({
  type: "TOGGLE_CHECK_ALL",
  payload: toggleAllCheck,
});

export const handleTaskCheckAction = (id, completed) => ({
  type: "HANDLE_TASK_CHECK",
  payload: {
    id,
    completed,
  },
});

export const removeTaskAction = (id) => ({
  type: "REMOVE_TASK",
  payload: {
    id,
  },
});

export const getTasksAction = (data) => ({
  type: "GET_TASKS",
  payload: data,
});
export const getTasks = () => async (dispatch) => {
  await axios
    .get("https://61eb42297ec58900177cdbf3.mockapi.io/users")
    .then((resp) => {
      dispatch(getTasksAction(resp.data));
    });
};
export const addTasksThunk = (text, completed) => async (dispatch) => {
  await axios.post(
    "https://61eb42297ec58900177cdbf3.mockapi.io/users",
    dispatch(addTaskAction(text, completed)).payload
  );
  dispatch(getTasks());
};
export const taskCheckThunk = (id, completed) => async (dispatch) => {
  await axios.put(`https://61eb42297ec58900177cdbf3.mockapi.io/users/` + id, {
    completed: !completed,
  });
  dispatch(getTasks());
};

export const removeTaskThunk = (id) => async (dispatch) => {
  await axios.delete(
    `https://61eb42297ec58900177cdbf3.mockapi.io/users/` + id,
    dispatch(removeTaskAction(id)).payload.id
  );
  dispatch(getTasks());
};
