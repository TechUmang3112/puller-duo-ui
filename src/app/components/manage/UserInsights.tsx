// Imports
import React, { useEffect } from "react";
import {
  IconBus,
  IconCar,
  IconListDetails,
  IconUser,
} from "@tabler/icons-react";
import { AppState } from "@/store/store";
import { useDispatch, useSelector } from "@/store/hooks";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { get } from "@/services/api.service";
import { nAdmin } from "@/constants/network";
import { setUserCount } from "@/store/admin/AdminReducer";

function UserInsights() {
  const adminState = useSelector((state: AppState) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCounts();
  }, []);

  async function getUserCounts() {
    const response = await get(nAdmin.userIngiths);
    if (response.count) {
      dispatch(setUserCount(response.count));
    }
  }

  return (
    <Box mb={8}>
      <Grid container spacing={3}>
        {/* Total users */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="primary.light"
            p={3}
            onClick={() => {
              window.location.href = "/user/list";
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
                  {adminState.count.total} Users
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Total drivers */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="warning.light"
            p={3}
            onClick={() => {
              window.location.href = "/manage/drivers";
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
                  <IconBus width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Total</Typography>
                <Typography fontWeight={500}>
                  {adminState.count.driver} Drivers
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Total riders */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="secondary.light"
            p={3}
            onClick={() => {
              window.location.href = "/manage/riders";
            }}
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
                  <IconUser width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Total</Typography>
                <Typography fontWeight={500}>
                  {adminState.count.rider} Riders
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Total rides */}
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            bgcolor="success.light"
            p={3}
            onClick={() => {
              window.location.href = "/manage/totalRides";
            }}
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
                <Typography>Total</Typography>
                <Typography fontWeight={500}>
                  {adminState.count.rides} Rides
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserInsights;
