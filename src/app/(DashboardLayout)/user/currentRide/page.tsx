// Imports
import React from "react";
import { CardContent } from "@mui/material";
import BlankCard from "@/app/components/shared/BlankCard";
import PageContainer from "@/app/components/container/PageContainer";
import { InvoiceProvider } from "@/app/context/InvoiceContext/index";
import InvoiceDetail from "@/app/components/apps/invoice/Invoice-detail/index";

const CurrentRide = () => {
  return (
    <InvoiceProvider>
      <PageContainer
        title="Invoice Detail"
        description="this is Invoice Detail"
      >
        <BlankCard>
          <CardContent>
            <InvoiceDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </InvoiceProvider>
  );
};
export default CurrentRide;
