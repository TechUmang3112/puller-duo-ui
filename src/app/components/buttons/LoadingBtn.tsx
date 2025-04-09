import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material/styles";

interface LoadingBtnProps {
  isLoading: boolean;
  sx?: SxProps<Theme>;
}

const LoadingBtn = ({ isLoading, sx }: LoadingBtnProps) => {
  if (!isLoading) return null;

  return (
    <LoadingButton
      sx={sx} // Removed the spread operator
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
