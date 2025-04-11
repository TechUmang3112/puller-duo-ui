"use client";

// Imports
import React from "react";
import { Button, Grid } from "@mui/material";
import ParentCard from "../shared/ParentCard";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";

const ChangePasswordForm = () => {
  return (
    <div>
      <ParentCard
        title="Change your password"
        footer={
          <>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                localStorage.setItem("isProfileUpdated", "true");
                localStorage.setItem("isDocUnderVerification", "true");
              }}
            >
              Submit
            </Button>
          </>
        }
      >
        <>
          <form>
            <Grid container spacing={3} mb={3}>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">
                  Current password
                </CustomFormLabel>
                <CustomTextField
                  id="password-text"
                  variant="outlined"
                  fullWidth
                  type="password" // This makes the input a password field
                  placeholder="Enter your current password" // Optional: Adds a placeholder
                />
              </Grid>

              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">
                  New password
                </CustomFormLabel>
                <CustomTextField
                  id="password-text"
                  variant="outlined"
                  fullWidth
                  type="password" // This makes the input a password field
                  placeholder="Enter your new password" // Optional: Adds a placeholder
                />
              </Grid>
            </Grid>
          </form>
        </>
      </ParentCard>
    </div>
  );
};

export default ChangePasswordForm;
