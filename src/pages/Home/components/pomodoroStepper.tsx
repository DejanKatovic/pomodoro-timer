import React from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

const steps = [
  {
    label: "Pomodoro 1",
  },
  {
    label: "Short Break 1",
  },
  {
    label: "Pomodoro 2",
  },
  {
    label: "Short Break 2",
  },
  {
    label: "Pomodoro 3",
  },
  {
    label: "Short Break 3",
  },
  {
    label: "Pomodoro 4",
  },
];

interface PomodoroStepperPropType {
  activeStep: number;
}

export const PomodoroStepper: React.FC<PomodoroStepperPropType> = ({
  activeStep,
}) => {
  return (
    <Box
      sx={{
        width: "300px",
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === activeStep ? (
                  <Typography variant="caption">Current step</Typography>
                ) : null
              }
            >
              <Typography variant="h5">{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
