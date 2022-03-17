import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./reducers/tasksSlice";
import { taskApi } from "../services/taskApi";

export const setupStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksSlice,
      [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(taskApi.middleware),
  });
};

export type AppStoreType = ReturnType<typeof setupStore>;
export type RootReducerType = ReturnType<AppStoreType["getState"]>;
export type AppDispatchType = AppStoreType["dispatch"];
