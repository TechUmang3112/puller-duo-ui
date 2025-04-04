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
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { UserState } from "@/store/user/UserReducer";
import { useSelector } from "@/store/hooks";
import ChargesForRide from "./ChargesForRide";

const OfferRideForm = () => {
  const [dateValue, setDateValue] = React.useState(null);
  const userState: UserState = useSelector((state) => state.userReducer);
  const theme = useTheme();

  const formattedDate = dateValue
    ? format(dateValue, "dd/MM/yyyy hh:mm a", { locale: enGB })
    : "";

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
              <ComboBoxAutocomplete placeholder="Leaving from..." />
              <Box mb={3}></Box>

              <ComboBoxAutocomplete placeholder="Going to..." />
              <Box mb={3}></Box>

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
                      20 KM
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
                      45 Minutes
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

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
                        placeholder: "Select start time", // Set placeholder here
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
                />
              </LocalizationProvider>

              <ChargesForRide />

              <Button
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
