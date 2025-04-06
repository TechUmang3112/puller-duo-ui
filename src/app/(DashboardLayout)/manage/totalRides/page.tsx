"use client";

// Imports
import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import TotalRideListTable from "@/app/components/manage/TotalRideListTable";

const DriverList = () => {
  return (
    <PageContainer title="Riders" description="Riders">
      <TotalRideListTable />
    </PageContainer>
  );
};

export default DriverList;
