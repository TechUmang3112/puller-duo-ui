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

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        {userState.isDocVerificationPending && (
          <Breadcrumb title="Profile under verification" items={BCrumb} />
        )}

        <RideInsights />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <OfferRideForm />
          </Grid>

          {userState.type == "Rider" && (
            <Grid item xs={6} md={12}>
              <RideResults />
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
}
