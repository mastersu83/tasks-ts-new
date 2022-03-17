import React from "react";
import { Button, Paper } from "@mui/material";

const RemoveTaskPopup = () => {
  return (
    <div className={`popupCleanAll`}>
      <div className="check-buttons remove-popup">
        <Paper className="header header-remove-popup" elevation={1}>
          <h4>Удалить все задачи?</h4>
        </Paper>
        <Button>Да</Button>
        <Button>Отмена</Button>
      </div>
    </div>
  );
};

export default RemoveTaskPopup;
