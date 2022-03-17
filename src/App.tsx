import { Button, Divider, List, Paper, Tab, Tabs } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import {
  useCheckAllTaskMutation,
  useGetAllTaskQuery,
} from "./services/taskApi";
import { useAppDispatch } from "./hooks/appHooks";
import { checkedAllTasks, getAllTasks } from "./redux/reducers/tasksSlice";

function App() {
  const dispatch = useAppDispatch();
  const [checkAllTasksApi, {}] = useCheckAllTaskMutation();

  const limit: number = 100;
  const page: number = 1;

  const {
    data: tasksAll,
    isLoading,
    error,
  } = useGetAllTaskQuery({ limit, page });
  if (tasksAll) {
    dispatch(getAllTasks(tasksAll));
  }

  const handleCheckAll = () => {
    checkAllTasksApi(tasksAll);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {isLoading && <h1>Идет загрузка...</h1>}
          {error && <h1>Ошибка загрузки</h1>}
          {tasksAll &&
            [...tasksAll]
              .reverse()
              .map((t) => (
                <Item
                  key={t.id}
                  id={t.id}
                  text={t.text}
                  completed={t.completed}
                />
              ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={handleCheckAll}>Отметить всё</Button>
          <Button onClick={() => dispatch(checkedAllTasks(false))}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
