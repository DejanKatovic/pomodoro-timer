import React, { useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";

interface CounterPropType {
  loop: number;
  remainTime: number;
  isStart: boolean;
  onStart: Function;
  onPause: Function;
  onReset: Function;
}

export const Counter: React.FC<CounterPropType> = ({
  loop,
  remainTime,
  isStart,
  onStart,
  onPause,
  onReset,
}) => {
  const total: number = useMemo(() => {
    return Math.floor(remainTime / 1000);
  }, [remainTime]);
  const minutes: string = useMemo(() => {
    return Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
  }, [total]);
  const seconds: string = useMemo(() => {
    return (total % 60).toString().padStart(2, "0");
  }, [total]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h5"
        color="secondary"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >{`Completed Loop: ${loop}`}</Typography>
      <Typography
        variant="h1"
        color="primary"
        align="center"
        sx={{ fontWeight: "bold", fontSize: "180px", marginBottom: "20px" }}
      >{`${minutes}:${seconds}`}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ marginRight: "5px" }}
          onClick={() => {
            if (isStart) {
              onPause();
            } else {
              onStart();
            }
          }}
        >
          {isStart ? "Pause" : "Start"}
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ marginLeft: "5px" }}
          onClick={() => {
            onReset();
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};
