import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskType = {
  id?: number;
  text: string;
  completed: boolean;
};

type initialStateType = {
  tasks: TaskType[];
  filterBy: string;
};

const initialState: initialStateType = {
  tasks: [
    {
      id: 4,
      text: "Задача №4",
      completed: true,
    },
    {
      id: 5,
      text: "Задача №5",
      completed: true,
    },
    {
      id: 6,
      text: "Задача №6",
      completed: true,
    },
    {
      id: 7,
      text: "Задача №7",
      completed: true,
    },
    {
      id: 8,
      text: "Задача №8",
      completed: false,
    },
    {
      id: 9,
      text: "Задача №10",
      completed: false,
    },
    {
      id: 10,
      text: "Задача №11",
      completed: false,
    },
    {
      id: 11,
      text: "Задача №12",
      completed: false,
    },
  ],
  filterBy: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state: initialStateType, action: PayloadAction<TaskType>) {
      state.tasks.push(action.payload);
    },
    getAllTasks(state: initialStateType, action: PayloadAction<TaskType[]>) {
      state.tasks = action.payload;
    },
    checkedToggle(state: initialStateType, action: PayloadAction<number>) {
      state.tasks.map((task) =>
        task.id === action.payload ? (task.completed = !task.completed) : task
      );
    },
    checkedAllTasks(state: initialStateType, action: PayloadAction<boolean>) {
      state.tasks.map((task) => (task.completed = action.payload));
    },
    unCheckedAllTasks(state: initialStateType) {
      state.tasks.map((task) => (task.completed = false));
    },
    removeTask(state: initialStateType, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  checkedToggle,
  removeTask,
  addTask,
  getAllTasks,
  checkedAllTasks,
  unCheckedAllTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
