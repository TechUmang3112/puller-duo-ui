"use client";

// Imports
import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material"; // Import Typography
import ChildCard from "../shared/ChildCard";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ComboBoxAutocomplete from "../forms/form-elements/autoComplete/ComboBoxAutocomplete";
import { format } from "date-fns"; // Import format from date-fns
import { enGB } from "date-fns/locale"; // Import the locale for DD/MM/YYYY format
import { UserState } from "@/store/user/UserReducer";
import { useSelector } from "@/store/hooks";
import ChargesForRide from "./ChargesForRide";

const OfferRideForm = () => {
  const [dateValue, setDateValue] = React.useState(null);
  const userState: UserState = useSelector((state) => state.userReducer);

  // Format the date value to DD/MM/YYYY HH:mm AM/PM
  const formattedDate = dateValue
    ? format(dateValue, "dd/MM/yyyy hh:mm a", { locale: enGB }) // Use enGB locale for DD/MM/YYYY
    : "";

  return (
    <>
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <ChildCard
          title={
            userState.type == "Driver" ? "Offer the ride" : "Find the ride"
          }
        >
          <ComboBoxAutocomplete placeholder="Leaving from ..." />
          <Box sx={{ my: 2 }} />
          <ComboBoxAutocomplete placeholder="Going to ..." />
          {/* Display Total Distance and Total Time */}
          <Box sx={{ my: 2 }}>
            <Typography variant="body1">
              Total distance -{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                20KM
              </Typography>
            </Typography>
            <Box sx={{ my: 1 }} />
            <Typography variant="body1">
              Total estimated time -{" "}
              <Typography
                component="span"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                45 Minutes
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ my: 2 }} />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB} // Set the locale for the date adapter
          >
            <DateTimePicker
              renderInput={(props) => (
                <CustomTextField
                  {...props}
                  fullWidth
                  value={formattedDate} // Display the formatted date
                  inputProps={{
                    placeholder: "Select start time", // Set placeholder here
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      width: 18,
                      height: 18,
                    },
                    "& .MuiFormHelperText-root": {
                      display: "none",
                    },
                  }}
                />
              )}
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              inputFormat="dd/MM/yyyy hh:mm a" // Set the input format explicitly
            />
          </LocalizationProvider>

          <ChargesForRide />

          <Box sx={{ my: 4 }} />
          <Button variant="contained" color="primary">
            {userState.type == "Driver" ? "Offer the ride" : "Find the ride"}
          </Button>
        </ChildCard>
      </Grid>
    </>
  );
};

export default OfferRideForm;
