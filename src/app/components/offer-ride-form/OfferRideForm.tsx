"use client";

import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  useTheme,
} from "@mui/material";
import ChildCard from "../shared/ChildCard";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ComboBoxAutocomplete from "../forms/form-elements/autoComplete/ComboBoxAutocomplete";
import { format, addDays } from "date-fns";
import { enGB } from "date-fns/locale";
import { UserState } from "@/store/user/UserReducer";
import { useSelector } from "@/store/hooks";
import ChargesForRide from "./ChargesForRide";
import { showError } from "@/services/utils.service";
import { post } from "@/services/api.service";
import { nGoogle } from "@/constants/network";
import { useEffect } from "react";

const OfferRideForm = () => {
  const [charges, setCharges] = React.useState<string>("");
  const [dateValue, setDateValue] = React.useState<Date | null>(null);
  const userState: UserState = useSelector((state) => state.userReducer);
  const theme = useTheme();

  const [latC, setLatC] = React.useState<number>(0);
  const [longC, setLongC] = React.useState<number>(0);
  const [latD, setLatD] = React.useState<number>(0);
  const [longD, setLongD] = React.useState<number>(0);
  const [distanceInKm, setDistanceInKm] = React.useState<number>(0);
  const [durationInMinutes, setDurationInMinutes] = React.useState<number>(0);

  useEffect(() => {
    measureDistance();
  }, [latD, longD]);

  const formattedDate = dateValue
    ? format(dateValue, "dd/MM/yyyy hh:mm a", { locale: enGB })
    : "";

  // Function to validate date is in future and within one week
  const shouldDisableDate = (date: Date) => {
    const now = new Date();
    const oneWeekLater = addDays(now, 7);
    return date < now || date > oneWeekLater;
  };

  async function measureDistance() {
    if (!latC || !latD) {
      return {};
    } else {
      const body = {
        latC,
        longC,
        latD,
        longD,
      };
      const response = await post(nGoogle.measureDistance, body);
      if (response.distanceInKm) {
        setDistanceInKm(response.distanceInKm ?? 0);
      }
      if (response.durationInMinutes) {
        setDurationInMinutes(response.durationInMinutes ?? 0);
      }
    }
  }

  async function publishRide() {
    if (userState.isDocVerificationPending) {
      showError("Ride can not published before document verification");
      return {};
    }

    // Additional validation for date
    if (!dateValue || dateValue < new Date()) {
      showError("Please select a future departure time");
      return;
    }

    if (dateValue > addDays(new Date(), 7)) {
      showError("Departure time cannot be more than one week in the future");
      return;
    }

    // Your publish ride logic here
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} lg={8} sm={10}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: theme.shadows[10],
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              boxShadow: theme.shadows[16],
            },
          }}
        >
          <ChildCard
            title={
              userState.type === "Driver" ? "Publish a Ride" : "Find a Ride"
            }
          >
            <Box sx={{ mb: 3 }}>
              <ComboBoxAutocomplete
                onChange={(selectedOption) => {
                  if (selectedOption?.value) {
                    setLatC(selectedOption?.value?.lat);
                    setLongC(selectedOption?.value?.long);
                  } else {
                    setLatC(0);
                    setLongC(0);
                  }
                  measureDistance();
                }}
                placeholder="Leaving from..."
              />
              <Box mb={3}></Box>

              <ComboBoxAutocomplete
                onChange={(selectedOption) => {
                  if (selectedOption?.value) {
                    setLatD(selectedOption?.value?.lat);
                    setLongD(selectedOption?.value?.long);
                  } else {
                    setLatD(0);
                    setLongD(0);
                  }
                  measureDistance();
                }}
                placeholder="Going to..."
              />
              <Box mb={3}></Box>

              {latC != 0 &&
                latD != 0 &&
                distanceInKm != 0 &&
                durationInMinutes != 0 && (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.grey[100],
                      borderRadius: 2,
                      p: 2,
                      mb: 3,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body1">Total distance</Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                          }}
                        >
                          {distanceInKm} KM
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">Estimated time</Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                          }}
                        >
                          {durationInMinutes} Minutes
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}

              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Departure Date & Time
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enGB}
              >
                <DateTimePicker
                  renderInput={(props) => (
                    <CustomTextField
                      {...props}
                      fullWidth
                      value={formattedDate}
                      inputProps={{
                        placeholder: "Select start time",
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                        "& .MuiSvgIcon-root": {
                          width: 20,
                          height: 20,
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  )}
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  minDateTime={new Date()}
                  maxDateTime={addDays(new Date(), 7)}
                />
              </LocalizationProvider>

              <ChargesForRide
                value={charges}
                onChange={(value) => setCharges(value)}
              />

              <Button
                disabled={latC == 0 || !dateValue || !charges}
                onClick={publishRide}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: theme.shadows[2],
                  "&:hover": {
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                {userState.type === "Driver"
                  ? "Publish a Ride"
                  : "Search Available Rides"}
              </Button>
            </Box>
          </ChildCard>
        </Paper>
      </Grid>
    </Container>
  );
};

export default OfferRideForm;
