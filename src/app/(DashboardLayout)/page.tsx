"use client";

// Imports
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AppState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "@/store/hooks";
import Breadcrumb from "./layout/shared/breadcrumb/Breadcrumb";
import RideResults from "../components/ride-results/RideResults";
import RideInsights from "../components/ride-results/RideInsights";
import PageContainer from "@/app/components/container/PageContainer";
import OfferRideForm from "../components/offer-ride-form/OfferRideForm";
import RevenueUpdates from "../components/dashboards/modern/RevenueUpdates";
import YearlyBreakup from "../components/dashboards/modern/YearlyBreakup";
import MonthlyEarnings from "../components/dashboards/modern/MonthlyEarnings";
import EmployeeSalary from "../components/dashboards/modern/EmployeeSalary";
import TopPerformers from "../components/dashboards/modern/TopPerformers";
import BannerCard from "../components/widgets/cards/BannerCard";

const BCrumb = [
  {
    title: "Profile",
    to: "/user/profile",
  },
  {
    title: "Check status",
    to: "/user/verification-pending",
  },
  {
    title:
      "It might takes 2-3 hours, If not do reach out to us on puller.duo@gmail.com",
  },
];

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const userState = useSelector((state: AppState) => state.userReducer);
  const rideState = useSelector((state: AppState) => state.rideReducer);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        {userState.isDocVerificationPending && (
          <Breadcrumb title="Profile under verification" items={BCrumb} />
        )}

        {userState.type != "Admin" && userState.type != "Not decided" && (
          <RideInsights />
        )}

        {userState.type != "Admin" && userState.type != "Not decided" && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <OfferRideForm />
            </Grid>

            {userState.type == "Rider" && rideState.isSearchedForRide && (
              <Grid item xs={6} md={12}>
                <RideResults />
              </Grid>
            )}

            {userState.type == "Rider" && <BannerCard />}
          </Grid>
        )}

        {userState.type == "Admin" && (
          <Grid container spacing={3}>
            {/* column */}
            <Grid item xs={12} lg={8}>
              <RevenueUpdates isLoading={isLoading} />
            </Grid>
            {/* column */}
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={12}>
                  <YearlyBreakup isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <MonthlyEarnings isLoading={isLoading} />
                </Grid>
              </Grid>
            </Grid>

            {/* column */}
            <Grid item xs={12} lg={4}>
              <EmployeeSalary isLoading={isLoading} />
            </Grid>
            {/* column */}
            <Grid item xs={12} lg={8}>
              <TopPerformers />
            </Grid>
          </Grid>
        )}
      </Box>
    </PageContainer>
  );
}
