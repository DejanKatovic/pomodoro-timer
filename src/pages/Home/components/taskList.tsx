import React from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { HighlightOff as HighlightOffIcon } from "@mui/icons-material";

import { TaskType } from "src/types/taskType";

interface TaskListPropType {
  value: string;
  setValue: Function;
  tasks: TaskType[];
  setTasks: Function;
}

export const TaskList: React.FC<TaskListPropType> = ({
  value,
  setValue,
  tasks,
  setTasks,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTasks([...tasks, { title: value, isComplete: false }]);
      setValue("");
    }
  };

  const handleCheck = (selected: number) => {
    setTasks(
      tasks.map((task, index) =>
        index === selected ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const handleRemove = (selected: number) => {
    setTasks(tasks.filter((task, index) => index !== selected));
  };

  return (
    <Box
      sx={{
        width: "300px",
        height: "calc(100vh - 300px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        sx={{ fontWeight: 700, marginBottom: "25px" }}
      >
        Todo List
      </Typography>
      <TextField
        fullWidth
        size="small"
        label="Add Task"
        placeholder="Type and press Enter"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <List sx={{ width: "100%" }}>
        {tasks.map((task, index) => (
          <>
            <ListItem
              key={`task-${index + 1}`}
              disableGutters
              secondaryAction={
                <IconButton
                  onClick={() => {
                    handleRemove(index);
                  }}
                >
                  <HighlightOffIcon
                    color={task.isComplete ? "primary" : "inherit"}
                  />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.isComplete}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => {
                    handleCheck(index);
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: task.isComplete ? "primary" : "inherit",
                  fontWeight: 600,
                }}
                primary={task.title}
              />
            </ListItem>
            {index < tasks.length - 1 && <Divider component={"li"} />}
          </>
        ))}
      </List>
    </Box>
  );
};
