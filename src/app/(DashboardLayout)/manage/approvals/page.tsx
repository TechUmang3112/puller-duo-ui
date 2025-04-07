"use client";

// Imports
import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import TableCollapsible from "@/app/components/tables/TableCollapsible";

const Approvals = () => {
  return (
    <PageContainer title="Pending Approvals" description="Pending Approvals">
      <TableCollapsible />
    </PageContainer>
  );
};

export default Approvals;
