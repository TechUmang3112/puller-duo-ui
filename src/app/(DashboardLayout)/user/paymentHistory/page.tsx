"use client";

// Imports
import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import RideInsights from "@/app/components/ride-results/RideInsights";
import PaymentTable from "@/app/components/user/PaymentTable";

const MyRides = () => {
  return (
    <PageContainer title="My Payments" description="My Payments">
      <RideInsights />
      <PaymentTable />
    </PageContainer>
  );
};

export default MyRides;
