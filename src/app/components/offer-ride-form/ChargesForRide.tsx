"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { useSelector } from "@/store/hooks";
import { UserState } from "@/store/user/UserReducer";
import CustomTextField from "../forms/theme-elements/CustomTextField";

interface ChargesForRideProps {
  value: string;
  onChange: (value: string) => void;
}

const ChargesForRide = ({ value, onChange }: ChargesForRideProps) => {
  const userState: UserState = useSelector((state) => state.userReducer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numbers and empty string
    if (inputValue === "" || /^[0-9\b]+$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  if (userState.type !== "Driver") return null;

  return (
    <>
      <Box sx={{ my: 2 }} />
      <CustomTextField
        id="charges"
        variant="outlined"
        placeholder="Charges for the ride"
        fullWidth
        value={value}
        onChange={handleChange}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          min: 0,
        }}
      />
    </>
  );
};

export default ChargesForRide;
