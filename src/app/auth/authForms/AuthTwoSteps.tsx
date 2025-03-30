"use client";

// Imports
import Link from "next/link";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "@/store/hooks";
import { post } from "@/services/api.service";
import { nAuth } from "@/constants/network";
import { setIsAuthLoading } from "@/store/user/UserReducer";
import { successfulLogIn } from "@/services/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconTrash } from "@tabler/icons-react";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

const AuthTwoSteps = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  // State to manage OTP values
  const [otpType, setOtpType] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input if a digit is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input box
      const prevInput = document.getElementById(
        `code-${index - 1}`
      ) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
  };

  async function submitOTP() {
    dispatch(setIsAuthLoading(true));

    const localOtpType = localStorage.getItem("otpType") ?? "Email";
    const body: any = {
      email: localStorage.getItem("user_email"),
      otp: otp.join(""),
    };
    if (localOtpType == "Forgot") {
      body.password = password;
    }

    let url = nAuth.validateForgotPassword;
    if (localOtpType == "Email") {
      url = nAuth.validateEmailOTp;
    }

    const response = await post(url, body);
    if (response.isError) {
      dispatch(setIsAuthLoading(false));
    } else {
      successfulLogIn(response.id);
      return {};
    }
  }

  useEffect(() => {
    const localOtpType = localStorage.getItem("otpType") ?? "Email";
    setOtpType(localOtpType);
  }, []);

  return (
    <>
      <Box mt={4}>
        <Stack mb={2}>
          <CustomFormLabel htmlFor="code">
            Type your 6 digits security code
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            {otp.map((digit, index) => (
              <CustomTextField
                key={index}
                id={`code-${index}`}
                variant="outlined"
                fullWidth
                value={digit}
                disabled={userState.isAuthLoading}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                onPaste={handlePaste}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" }, // Center the text
                }}
                sx={{
                  "& input": {
                    textAlign: "center",
                    fontSize: { xs: "1rem", sm: "1.5rem" }, // Responsive font size
                  },
                  width: { xs: "40px", sm: "56px" }, // Responsive width
                }}
              />
            ))}
          </Stack>
        </Stack>

        {otpType == "Forgot" && (
          <CustomFormLabel htmlFor="new-password">New Password</CustomFormLabel>
        )}
        {otpType == "Forgot" && (
          <CustomTextField
            id="newPassword"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            disabled={userState.isAuthLoading}
            variant="outlined"
            fullWidth
            value={password}
          />
        )}
        {otpType == "Forgot" && <Box mb={3}></Box>}

        {!userState.isAuthLoading && (
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => {
              submitOTP();
            }}
          >
            Verify My Account
          </Button>
        )}

        {userState.isAuthLoading && (
          <LoadingButton
            fullWidth
            loading
            variant="contained"
            color="secondary"
            endIcon={<IconTrash width={18} />}
          >
            Loading
          </LoadingButton>
        )}

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Didn&apos;t get the code?
          </Typography>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Resend
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default AuthTwoSteps;
