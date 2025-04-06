// Imports
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { MenuItem, Grid, Stack, Typography, Avatar, Box } from "@mui/material";
import { IconGridDots } from "@tabler/icons-react";
import DashboardCard from "../../shared/DashboardCard";
import CustomSelect from "../../forms/theme-elements/CustomSelect";
import SkeletonRevenueUpdatesTwoCard from "../skeleton/RevenueUpdatesTwoCard";

interface RevenueupdatestwoCardProps {
  isLoading?: boolean;
}

const RevenueUpdates = ({ isLoading }: RevenueupdatestwoCardProps) => {
  const [month, setMonth] = React.useState("1");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 360,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "20%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
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
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 10000,
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "Driver Earnings this month",
      data: [6000, 5000, 2000, 5000, 4000],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonRevenueUpdatesTwoCard />
      ) : (
        <DashboardCard
          title="Revenue Updates"
          subtitle="Overview of Profit"
          action={
            <CustomSelect
              labelId="month-dd"
              id="month-dd"
              size="small"
              value={month}
              onChange={handleChange}
            >
              <MenuItem value={1}>March 2023</MenuItem>
              <MenuItem value={2}>April 2023</MenuItem>
              <MenuItem value={3}>May 2023</MenuItem>
            </CustomSelect>
          }
        >
          <Grid container spacing={3}>
            {/* column */}
            <Grid item xs={12} sm={8}>
              <Box className="rounded-bars">
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="bar"
                  height={360}
                  width={"100%"}
                />
              </Box>
            </Grid>
            {/* column */}
            <Grid item xs={12} sm={4}>
              <Stack spacing={3} mt={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    width={40}
                    height={40}
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography color="primary" variant="h6" display="flex">
                      <IconGridDots size={24} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="700">
                      ₹25,000
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Ride Cost
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Stack spacing={3} my={5}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: 9,
                      mt: 1,
                      height: 9,
                      bgcolor: primary,
                      svg: { display: "none" },
                    }}
                  ></Avatar>
                  <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                      Driver Earnings this month
                    </Typography>
                    <Typography variant="h5">₹22,000</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: 9,
                      mt: 1,
                      height: 9,
                      bgcolor: secondary,
                      svg: { display: "none" },
                    }}
                  ></Avatar>
                  <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                      Net Income this month
                    </Typography>
                    <Typography variant="h5">₹3,000</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DashboardCard>
      )}
    </>
  );
};

export default RevenueUpdates;
