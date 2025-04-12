"use client";

// Imports
import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import ParentCard from "../shared/ParentCard";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import { nUser } from "@/constants/network";
import { post } from "@/services/api.service";
import { showSuccess } from "@/services/utils.service";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
    };

    if (!oldPassword) {
      newErrors.oldPassword = "Current password is required";
      valid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      valid = false;
    } else if (oldPassword && newPassword === oldPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      // Call your API to update password here
      updatePassword();
    }
  };

  async function updatePassword() {
    const body = {
      userId: localStorage.getItem("userId"),
      password: newPassword,
      oldPassword: oldPassword,
    };
    const response = await post(nUser.changePassword, body);
    if (response.success == true) {
      showSuccess(response.successMsg);

      window.location.href = "/";
    }

    setLoading(false);
  }

  return (
    <div>
      <ParentCard
        title="Change your password"
        footer={
          <>
            <Button
              disabled={isLoading}
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mb={3}>
            <Grid item lg={6} md={12} sm={12}>
              <CustomFormLabel htmlFor="old-password">
                Current password
              </CustomFormLabel>
              <CustomTextField
                value={oldPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setOldPassword(e.target.value);
                  setErrors({ ...errors, oldPassword: "" });
                }}
                id="old-password"
                variant="outlined"
                fullWidth
                type="password"
                placeholder="Enter your current password"
                error={!!errors.oldPassword}
                helperText={errors.oldPassword}
              />
            </Grid>

            <Grid item lg={6} md={12} sm={12}>
              <CustomFormLabel htmlFor="new-password">
                New password
              </CustomFormLabel>
              <CustomTextField
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: "" });
                }}
                id="new-password"
                variant="outlined"
                fullWidth
                type="password"
                placeholder="Enter your new password"
                error={!!errors.newPassword}
                helperText={errors.newPassword}
              />
            </Grid>
          </Grid>
        </form>
      </ParentCard>
    </div>
  );
};

export default ChangePasswordForm;
