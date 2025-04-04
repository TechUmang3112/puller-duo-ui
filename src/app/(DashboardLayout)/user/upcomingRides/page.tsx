"use client";

// Imports
import * as React from "react";
import UpcomingTable from "@/app/components/user/UpcomingTable";
import PageContainer from "@/app/components/container/PageContainer";
import RideInsights from "@/app/components/ride-results/RideInsights";

const MyRides = () => {
  return (
    <PageContainer title="My Upcoming Rides" description="My Upcoming Rides">
      <RideInsights />
      <UpcomingTable />
    </PageContainer>
  );
};

export default MyRides;
