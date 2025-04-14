// Imports
import dynamic from "next/dynamic";
const Chart: any = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar } from "@mui/material";
import { IconArrowDownRight, IconArrowUpLeft } from "@tabler/icons-react";
import DashboardCard from "../../shared/DashboardCard";
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { useEffect } from "react";
import { nAdmin } from "@/constants/network";
import { get } from "@/services/api.service";
import { setMonthlyComparison } from "@/store/admin/AdminReducer";

interface MonthlyearningsCardProps {
  isLoading?: boolean;
}

const MonthlyEarnings = ({ isLoading }: MonthlyearningsCardProps) => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppState) => state.adminReducer);

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      color: secondary,
      data: [0, 6],
    },
  ];

  useEffect(() => {
    getMonthlyComparision();
  }, []);

  async function getMonthlyComparision() {
    const response = await get(nAdmin.monthlyComparision);
    if (response.summary) {
      dispatch(setMonthlyComparison(response.summary));
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonMonthlyEarningsTwoCard />
      ) : (
        <DashboardCard
          title="Monthly Rides"
          footer={
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="area"
              height={60}
              width={"100%"}
            />
          }
        >
          <>
            <Typography variant="h3" fontWeight="700" mt="-20px">
              {adminState.monthlyComparision.currentMonth ?? 0}
            </Typography>
            <Stack direction="row" spacing={1} my={1} alignItems="center">
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                {adminState.monthlyComparision.trend != "negative" && (
                  <IconArrowUpLeft width={20} color="#39B69A" />
                )}
                {adminState.monthlyComparision.trend == "negative" && (
                  <IconArrowDownRight width={20} color="#FA896B" />
                )}
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                +6%
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                last month
              </Typography>
            </Stack>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default MonthlyEarnings;
