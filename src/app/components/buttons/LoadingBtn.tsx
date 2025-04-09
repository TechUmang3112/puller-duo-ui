// Imports
import * as React from "react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface LoadingBtnProps {
  isLoading: boolean;
  sx?: any;
}

const LoadingBtn = ({ isLoading, sx }: LoadingBtnProps) => {
  if (!isLoading) return <></>;

  return (
    <LoadingButton
      sx={...sx}
      fullWidth
      loading
      variant="contained"
      color="secondary"
    >
      Loading
    </LoadingButton>
  );
};

export default LoadingBtn;
