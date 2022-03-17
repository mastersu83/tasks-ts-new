import React, { ChangeEvent, useState } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useCheckTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} from "../services/taskApi";

type PropsType = {
  text: string;
  completed: boolean;
  id: number | undefined;
};

export const Item: React.FC<PropsType> = ({ text, completed, id }) => {
  const [edit, setEdit] = useState(false);
  const [removeTask, {}] = useDeleteTaskMutation();
  const [checkedToggle, { isLoading: isLoadingCheck }] = useCheckTaskMutation();
  const [editTask, { isLoading }] = useEditTaskMutation();
  const [inputs, setInputs] = useState<{ text: string; completed: boolean }>({
    text: "",
    completed: false,
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputs({ ...inputs, text: value });
  };

  const handleClickAddTaskCheck = () => {
    setInputs({ ...inputs, completed: !inputs.completed });
  };

  const openEditFieldTask = () => {
    setEdit(true);
    setInputs({ ...inputs, text: text, completed: completed });
  };
  const onEditTask = () => {
    editTask({
      id,
      text: inputs.text,
      completed: inputs.completed,
    });
    setInputs({ ...inputs, text: "", completed: false });
    setEdit(false);
  };

  return (
    <ListItem>
      <div className="d-flex item">
        {edit ? (
          <>
            <Checkbox
              onClick={handleClickAddTaskCheck}
              checked={inputs.completed}
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
            <div className="item-buttons d-flex">
              <IconButton onClick={onEditTask}>
                <CheckIcon style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => setEdit(false)}>
                <ClearIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <Checkbox
              onClick={() => checkedToggle({ id, completed })}
              // disabled={isLoadingCheck}
              checked={completed}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            <Typography className="item-text">{text}</Typography>
            <div className="item-buttons d-flex">
              <IconButton onClick={openEditFieldTask}>
                <EditIcon style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => removeTask(id)}>
                <DeleteOutlineIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </>
        )}
      </div>
    </ListItem>
  );
};
