// Imports
import React from "react";
import {
  IconCalendar,
  IconCar,
  IconListDetails,
  IconStack,
} from "@tabler/icons-react";
import { AppState } from "@/store/store";
import { useSelector } from "@/store/hooks";
import { Box, Grid, Stack, Typography } from "@mui/material";

function RideInsights() {
  const rideState = useSelector((state: AppState) => state.rideReducer);

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        {/* Total rides */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="primary.light"
            p={3}
            onClick={() => {
              window.location.href = "/user/myRides";
            }}
            sx={{ cursor: "pointer" }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconListDetails width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Total</Typography>
                <Typography fontWeight={500}>
                  {rideState.count.total} Rides
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Upcoming rides */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="warning.light"
            p={3}
            onClick={() => {
              window.location.href = "/user/upcomingRides";
            }}
            sx={{ cursor: "pointer" }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="warning.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconCalendar width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Upcoming</Typography>
                <Typography fontWeight={500}>
                  {rideState.count.upcoming} Rides
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Current ride */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="secondary.light"
            p={3}
            onClick={() => {}}
            sx={{ cursor: "pointer" }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="secondary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconStack width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Current</Typography>
                <Typography fontWeight={500}>
                  {rideState.count.current} Ride
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Completed rides */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="success.light"
            p={3}
            onClick={() => {}}
            sx={{ cursor: "pointer" }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="success.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconCar width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Completed</Typography>
                <Typography fontWeight={500}>
                  {rideState.count.completed} Rides
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RideInsights;
