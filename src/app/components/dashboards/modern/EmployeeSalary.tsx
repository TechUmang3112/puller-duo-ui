// Imports
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
const Chart: any = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import DashboardWidgetCard from "../../shared/DashboardWidgetCard";
import SkeletonEmployeeSalaryCard from "../skeleton/EmployeeSalaryCard";
import { Box } from "@mui/material";
import { nAdmin } from "@/constants/network";
import { get } from "@/services/api.service";
import { useDispatch, useSelector } from "@/store/hooks";
import { setMonthlyUsers } from "@/store/admin/AdminReducer";
import { AppState } from "@/store/store";

interface EmployeeSalaryCardProps {
  isLoading?: boolean;
}

const EmployeeSalary = ({ isLoading }: EmployeeSalaryCardProps) => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: AppState) => state.adminReducer);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.grey[100];

  // chart
  const { optionscolumnchart, seriescolumnchart } = useMemo(() => {
    const options = {
      chart: {
        type: "bar",
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: "#adb0bb",
        toolbar: {
          show: false,
        },
        height: 280,
      },
      colors: [primary, primary, primary, primary, primary, primary],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "45%",
          distributed: true,
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: adminState.monthlyUsers?.map((el) => [el.monthName]),
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        theme: theme.palette.mode === "dark" ? "dark" : "light",
      },
    };

    const series = [
      {
        name: "",
        data: adminState.monthlyUsers?.map((el) => el.count),
      },
    ];

    return { optionscolumnchart: options, seriescolumnchart: series };
  }, [adminState.monthlyUsers, primary, primarylight, theme.palette.mode]);

  useEffect(() => {
    getMonthlyUsers();
  }, []);

  async function getMonthlyUsers() {
    const response = await get(nAdmin.monthlyUsers);
    if (response.list != null && response.list != undefined) {
      console.log(response.list.map((el: any) => [el.monthName]));
      dispatch(setMonthlyUsers(response.list));
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonEmployeeSalaryCard />
      ) : (
        <DashboardWidgetCard
          title="Monthly users"
          subtitle="Every month"
          dataLabel1="Rider"
          dataItem1="234"
          dataLabel2="Driver"
          dataItem2="70"
        >
          <>
            <Box height="400px">
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={310}
                width={"100%"}
              />
            </Box>
          </>
        </DashboardWidgetCard>
      )}
    </>
  );
};

export default EmployeeSalary;
