"use client";

// Imports
import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import NotificationTable from "@/app/components/user/NotificationTable";

const Notifications = () => {
  return (
    <PageContainer title="My Notifications" description="My Notifications">
      <NotificationTable />
    </PageContainer>
  );
};

export default Notifications;
