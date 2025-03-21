// Imports
import {
  IconCalendar,
  IconCar,
  IconListDetails,
  IconShoppingBag,
  IconSortAscending,
  IconStack,
  IconTruck,
} from "@tabler/icons-react";
import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

function RideInsights() {
  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        {/* Total rides */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="primary.light"
            p={3}
            onClick={() => {}}
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
                <Typography fontWeight={500}>10 Rides</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Upcoming rides */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="warning.light"
            p={3}
            onClick={() => {}}
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
                <Typography fontWeight={500}>3 Rides</Typography>
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
                <Typography fontWeight={500}>1 Ride</Typography>
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
                <Typography fontWeight={500}>6 Rides</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RideInsights;
