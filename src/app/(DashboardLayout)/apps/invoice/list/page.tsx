// Imports
import React from "react";
import { CardContent } from "@mui/material";
import BlankCard from "@/app/components/shared/BlankCard";
import PageContainer from "@/app/components/container/PageContainer";
import { InvoiceProvider } from "@/app/context/InvoiceContext/index";
import InvoiceList from "@/app/components/apps/invoice/Invoice-list/index";

const InvoiceListing = () => {
  return (
    <InvoiceProvider>
      <PageContainer title="Invoice List" description="this is Invoice List">
        <BlankCard>
          <CardContent>
            <InvoiceList />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </InvoiceProvider>
  );
};
export default InvoiceListing;
