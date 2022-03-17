import { Button, Checkbox, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAddTaskMutation } from "../services/taskApi";
import { TaskType } from "../redux/reducers/tasksSlice";
import { ChangeEvent, useState } from "react";

export const AddField = () => {
  const [inputs, setInputs] = useState<{ text: string; completed: boolean }>({
    text: "",
    completed: false,
  });
  const [addTask, {}] = useAddTaskMutation();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputs({ ...inputs, text: value });
  };

  const handleClickAddTaskCheck = () => {
    setInputs({ ...inputs, completed: !inputs.completed });
  };
  const onAddTask = () => {
    addTask({
      text: inputs.text,
      completed: inputs.completed,
    } as TaskType);
    setInputs({ ...inputs, text: "", completed: false });
  };

  return (
    <div className="field">
      <Checkbox
        onClick={handleClickAddTaskCheck}
        checked={inputs.completed}
        name="checked"
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        name="text"
        onChange={onChangeInput}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
        value={inputs.text}
      />
      <Button onClick={onAddTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
