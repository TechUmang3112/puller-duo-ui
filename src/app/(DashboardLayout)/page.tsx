"use client";

// Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import PageContainer from "@/app/components/container/PageContainer";
import OfferRideForm from "../components/offer-ride-form/OfferRideForm";

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box
        mt={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh" // Adjust this value as needed
      >
        <Grid container justifyContent="center">
          {/* Centering OfferRideForm */}

          <OfferRideForm />
        </Grid>
      </Box>
    </PageContainer>
  );
}
