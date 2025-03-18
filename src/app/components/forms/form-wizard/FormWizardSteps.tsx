"use client";

// Imports
import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import ParentCard from "@/app/components/shared/ParentCard";
import { Stack } from "@mui/system";

const steps = ["Account created", "Profile updated", "Document verification"];

const FormWizardSteps = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step: any) => step === 1;

  const isStepSkipped = (step: any) => skipped.has(step);

  // eslint-disable-next-line consistent-return
  const handleSteps = (step: any) => {
    return (
      <Box pt={3}>
        <Typography variant="h5">Note</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Your profile is under document verification, We will update you in
          next 2-3 hours
        </Typography>
      </Box>
    );
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ParentCard title="Document verification">
      <Box width="100%">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Stack spacing={2} mt={3}>
              <Alert severity="success">
                All steps completed - you&apos;re finished
              </Alert>

              <Box textAlign="right">
                <Button onClick={handleReset} variant="contained" color="error">
                  Reset
                </Button>
              </Box>
            </Stack>
          </>
        ) : (
          <>
            <Box>{handleSteps(activeStep)}</Box>
          </>
        )}
      </Box>
    </ParentCard>
  );
};

export default FormWizardSteps;
