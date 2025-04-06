"use client";

// Imports
import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import DriverListTable from "@/app/components/manage/DriverListTable";

const DriverList = () => {
  return (
    <PageContainer title="Drivers" description="Drivers">
      <DriverListTable />
    </PageContainer>
  );
};

export default DriverList;
