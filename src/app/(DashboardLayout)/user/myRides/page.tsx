"use client";

// Imports
import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import TablePagination from "@/app/components/react-table/TablePagination";
import RideInsights from "@/app/components/ride-results/RideInsights";

const MyRides = () => {
  return (
    <PageContainer title="My Rides" description="My Rides">
      <RideInsights />
      <TablePagination />
    </PageContainer>
  );
};

export default MyRides;
