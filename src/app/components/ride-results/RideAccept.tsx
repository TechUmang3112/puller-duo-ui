// Imports
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { RideState } from "@/store/ride/RideReducer";
import { useSelector } from "@/store/hooks";
import { post } from "@/services/api.service";
import { nRider } from "@/constants/network";
import { showSuccess } from "@/services/utils.service";

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
  const rideState: RideState = useSelector((state) => state.rideReducer);

  const handleAccept = () => {
    acceptRide();
  };

  async function acceptRide() {
    const rideId = rideState.availableRides[rideData.rowIndex]._id;

    const body = { userId: localStorage.getItem("userId"), rideId };
    const response = await post(nRider.acceptRide, body);
    if (response.success == true) {
      onAccept();

      showSuccess(response.successMsg);
      window.location.replace("/user/upcomingRides");
    }
  }

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
    </>
  );
};

export default RideDialog;
