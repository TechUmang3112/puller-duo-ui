"use client";

// Imports
import * as React from "react";
import { Box } from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { UserState } from "@/store/user/UserReducer";
import { useSelector } from "@/store/hooks";

const ChargesForRide = () => {
  const userState: UserState = useSelector((state) => state.userReducer);

  if (userState.type != "Driver") return <></>;

  return (
    <>
      <Box sx={{ my: 2 }} />
      <CustomTextField
        id="charges"
        variant="outlined"
        placeholder="Charges for the ride"
        fullWidth
        value={""}
        onChange={(e: any) => {}}
      />
    </>
  );
};

export default ChargesForRide;
