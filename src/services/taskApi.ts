import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TaskType } from "../redux/reducers/tasksSlice";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getAllTask: build.query<TaskType[], { limit: number; page: number }>({
      query: ({ limit, page }) => ({
        url: "tasks",
        params: {
          _limit: limit,
          _page: page,
        },
      }),
      providesTags: ["Task"],
    }),
    addTask: build.mutation<TaskType[], TaskType>({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<TaskType[], number | undefined>({
      query: (id) => ({
        url: `tasks`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    checkTask: build.mutation<
      TaskType[],
      { id: number | undefined; completed: boolean }
    >({
      query: ({ id, completed }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: { completed: !completed },
      }),
      invalidatesTags: ["Task"],
    }),
    editTask: build.mutation<
      TaskType[],
      { id: number | undefined; text: string; completed: boolean }
    >({
      query: ({ id, text, completed }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: { text: text, completed },
      }),
      invalidatesTags: ["Task"],
    }),
    checkAllTask: build.mutation<TaskType[], TaskType[] | undefined>({
      query: (tasks) => ({
        url: `tasks`,
        method: "PATCH",
        body: tasks && tasks.map((t) => ({ ...t, completed: !t.completed })),
      }),
      // invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useCheckTaskMutation,
  useCheckAllTaskMutation,
  useEditTaskMutation,
} = taskApi;
