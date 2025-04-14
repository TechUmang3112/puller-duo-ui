"use client";

// Imports
import dynamic from "next/dynamic";
const Chart: any = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowDownRight, IconArrowUpLeft } from "@tabler/icons-react";
import DashboardCard from "../../shared/DashboardCard";
import SkeletonYearlyBreakupCard from "../skeleton/YearlyBreakupCard";
import { nAdmin } from "@/constants/network";
import { get } from "@/services/api.service";
import { setYearlySummary } from "@/store/admin/AdminReducer";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { useEffect, useMemo } from "react";

interface YearlyBreakupCardProps {
  isLoading?: boolean;
}

const YearlyBreakup = ({ isLoading }: YearlyBreakupCardProps) => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppState) => state.adminReducer);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;

  const { optionscolumnchart, seriescolumnchart } = useMemo(() => {
    const options = {
      chart: {
        type: "donut",
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: "#adb0bb",
        toolbar: {
          show: false,
        },
        height: 155,
      },
      colors: [primary, primarylight, "#F9F9FD"],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: "75%",
            background: "transparent",
          },
        },
      },
      tooltip: {
        theme: theme.palette.mode === "dark" ? "dark" : "light",
        fillSeriesColor: false,
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
    };

    const series = [
      adminState.yearlyUserSummary?.totalCurrentYear ?? 0,
      adminState.yearlyUserSummary?.totalLastYear ?? 0,
    ];

    return { optionscolumnchart: options, seriescolumnchart: series };
  }, [adminState.yearlyUserSummary, primary, primarylight, theme.palette.mode]);

  useEffect(() => {
    getYearlyUsers();
  }, []);

  async function getYearlyUsers() {
    const response = await get(nAdmin.yearlyUsers);
    if (response.summary) {
      dispatch(setYearlySummary(response.summary));
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonYearlyBreakupCard />
      ) : (
        <DashboardCard title="Yearly Rides">
          <Grid container spacing={3}>
            {/* column */}
            <Grid item xs={7} sm={7}>
              <Typography variant="h3" fontWeight="700">
                {adminState.yearlyUserSummary.totalCurrentYear}
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                  {adminState.yearlyUserSummary.totalTrend != "negative" && (
                    <IconArrowUpLeft width={20} color="#39B69A" />
                  )}
                  {adminState.yearlyUserSummary.totalTrend == "negative" && (
                    <IconArrowDownRight width={20} color="#FA896B" />
                  )}
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600">
                  {adminState.yearlyUserSummary.totalTrend == "negative"
                    ? "-"
                    : "+"}
                  {adminState.yearlyUserSummary.growthPercentage ?? 0}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  last year
                </Typography>
              </Stack>
              <Stack spacing={3} mt={5} direction="row">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      width: 9,
                      height: 9,
                      bgcolor: primary,
                      svg: { display: "none" },
                    }}
                  ></Avatar>
                  <Typography variant="subtitle2" color="textSecondary">
                    2025
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      width: 9,
                      height: 9,
                      bgcolor: primarylight,
                      svg: { display: "none" },
                    }}
                  ></Avatar>
                  <Typography variant="subtitle2" color="textSecondary">
                    2024
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            {/* column */}
            <Grid item xs={5} sm={5}>
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="donut"
                height={150}
                width={"100%"}
              />
            </Grid>
          </Grid>
        </DashboardCard>
      )}
    </>
  );
};

export default YearlyBreakup;
