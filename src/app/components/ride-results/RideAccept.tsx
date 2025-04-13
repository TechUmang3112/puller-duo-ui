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
  rideData: any;
  onClose: () => void;
  onAccept: () => void;
}

const RideDialog: React.FC<RideDialogProps> = ({
  rideData,
  open,
  onClose,
  onAccept,
}) => {
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
        sx={{
          "& .MuiDialog-paper": {
            width: "400px", // Fixed width
            borderRadius: "12px", // Rounded corners
            padding: "20px", // Overall padding
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "600",
            padding: "16px 24px",
            color: "#1976d2",
          }}
        >
          {"Accept the Ride"}
        </DialogTitle>
        <DialogContent sx={{ padding: "20px 24px" }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: "1rem",
              color: "text.primary",
              "& > div": {
                marginTop: "12px",
                marginBottom: "12px",
              },
            }}
          >
            <div style={{ lineHeight: "1.6" }}>
              <div>
                <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                  From:
                </span>{" "}
                {(rideData ?? {})["Starting point"] ?? ""}
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                  To:
                </span>{" "}
                {(rideData ?? {})["Ending point"] ?? ""}
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Charges:
                </span>{" "}
                Rs. {(rideData ?? {})["Ride cost"] ?? ""}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={onClose}
            color="primary"
            sx={{
              padding: "8px 16px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            color="primary"
            autoFocus
            variant="contained"
            sx={{
              padding: "8px 16px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "#1565c0",
              },
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "#2e7d32",
            color: "#fff",
            "& .MuiAlert-icon": {
              color: "#fff",
            },
            fontSize: "0.875rem",
            padding: "12px 16px",
            borderRadius: "8px",
          }}
        >
          Ride is accepted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RideDialog;
