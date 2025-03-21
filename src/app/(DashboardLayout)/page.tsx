"use client";

// Imports
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import RideResults from "../components/ride-results/RideResults";
import RideInsights from "../components/ride-results/RideInsights";
import PageContainer from "@/app/components/container/PageContainer";
import OfferRideForm from "../components/offer-ride-form/OfferRideForm";

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <RideInsights />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <OfferRideForm />
          </Grid>

          <Grid item xs={6} md={12}>
            <RideResults />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
