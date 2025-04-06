"use client";

// Imports
import * as React from "react";
import UserListTable from "@/app/components/user/UserListTable";
import PageContainer from "@/app/components/container/PageContainer";

const UserList = () => {
  return (
    <PageContainer title="Users" description="Users">
      <UserListTable />
    </PageContainer>
  );
};

export default UserList;
