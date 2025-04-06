"use client";

// Imports
import * as React from "react";
import RiderListTable from "@/app/components/manage/RiderListTable";
import PageContainer from "@/app/components/container/PageContainer";

const DriverList = () => {
  return (
    <PageContainer title="Riders" description="Riders">
      <RiderListTable />
    </PageContainer>
  );
};

export default DriverList;
