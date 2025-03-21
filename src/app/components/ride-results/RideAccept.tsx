// Imports
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Button } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RideDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const RideDialog: React.FC<RideDialogProps> = ({ open, onClose, onAccept }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleAccept = () => {
    onAccept(); // Call the onAccept handler from props
    setOpenSnackbar(true);
    window.location.href = "/user/myRides";
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Accept the Ride"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ lineHeight: "1.6" }}>
              <div>
                <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                  From:
                </span>{" "}
                Point A
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                  To:
                </span>{" "}
                Point B
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Charges:
                </span>{" "}
                Rs. 1000
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose} // Fixed: Pass the function directly
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Position at bottom-right
      >
        <Alert
          onClose={handleSnackbarClose} // Fixed: Pass the function directly
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "#2e7d32", // Dark green background
            color: "#fff", // White text
            "& .MuiAlert-icon": {
              color: "#fff", // White icon
            },
          }}
        >
          Ride is accepted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RideDialog;
