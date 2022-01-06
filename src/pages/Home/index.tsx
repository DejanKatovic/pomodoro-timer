import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { useIntervalWhen } from "rooks";

import { TaskType } from "src/types/taskType";

import { BackgroundContext } from "src/context/backgroundContext";
import { PomodoroStepper } from "./components/pomodoroStepper";
import { Counter } from "./components/counter";
import { TaskList } from "./components/taskList";

// const work = 25;
// const shortBreak = 5;
// const longBreak = 15;
const work = 0.3;
const shortBreak = 0.1;
const longBreak = 0.2;

const music = new Audio("/ring.wav");

export const Home: React.FC = () => {
  const { backgroundColor, setBackgroundColor } = useContext(BackgroundContext);
  const [loop, setLoop] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [remainTime, setRemainTime] = useState<number>(work * 60 * 1000);
  const [endTime, setEndTime] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useIntervalWhen(
    () => {
      const current = Date.now();
      if (current < endTime) {
        setRemainTime(endTime - current);
      } else {
        if (step < 7) {
          setStep(step + 1);
        } else {
          setLoop(loop + 1);
          setStep(0);
        }
        const newTime =
          step === 0 || step === 2 || step === 4
            ? shortBreak
            : step === 6
            ? longBreak
            : work;
        setRemainTime(newTime * 60 * 1000);
        setEndTime(Date.now() + newTime * 60 * 1000);

        const newColor =
          step === 0 || step === 2 || step === 4
            ? "lightBlue"
            : step === 6
            ? "lightGreen"
            : "pink";
        setBackgroundColor(newColor);
        music.play();
      }
    },
    1000,
    isStart,
    true
  );

  const handleStart = () => {
    setEndTime(Date.now() + remainTime);
    const newColor =
      step === 1 || step === 3 || step === 5
        ? "lightBlue"
        : step === 7
        ? "lightGreen"
        : "pink";
    setBackgroundColor(newColor);
    setIsStart(true);
  };

  const handlePause = () => {
    setIsStart(false);
    setBackgroundColor("lightGray");
  };

  const handleReset = () => {
    setLoop(0);
    setStep(0);
    setIsStart(false);
    setRemainTime(work * 60 * 1000);
    setEndTime(0);
    setBackgroundColor("lightGray");
    setValue("");
    setTasks([]);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: backgroundColor,
        paddingY: "50px",
        transition: "all 0.3s ease-in",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          marginX: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "calc(100vh - 100px)",
        }}
      >
        <PomodoroStepper activeStep={step} />
        <Counter
          loop={loop}
          remainTime={remainTime}
          isStart={isStart}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
        <TaskList
          value={value}
          setValue={setValue}
          tasks={tasks}
          setTasks={setTasks}
        />
      </Box>
    </Box>
  );
};
