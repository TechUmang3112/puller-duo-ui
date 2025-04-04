"use client";

// Imports
import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "@/app/context/InvoiceContext/index";
import { usePathname } from "next/navigation";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { format, isValid, parseISO } from "date-fns";
import Link from "next/link";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";

const InvoiceDetail = () => {
  const { invoices } = useContext(InvoiceContext);
  const [selectedInvoice, setSelectedInvoice]: any = useState(null);
  const userState = useSelector((state: AppState) => state.userReducer);

  useEffect(() => {
    // Set the first invoice as the default selected invoice initially
    if (invoices.length > 0) {
      setSelectedInvoice(invoices[0]);
    }
  }, [invoices]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the invoice that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const invoice = invoices.find(
        (p: { billFrom: string }) => p.billFrom === getTitle
      );
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [getTitle, invoices]);

  if (!selectedInvoice) {
    return <div>Loading...</div>;
  }

  const orderDate = selectedInvoice.orderDate
    ? isValid(parseISO(selectedInvoice.orderDate))
      ? format(parseISO(selectedInvoice.orderDate), "EEEE, MMMM dd, yyyy")
      : "Invalid Date"
    : format(new Date(), "EEEE, MMMM dd, yyyy");

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box
          sx={{
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          <Typography variant="h5"># {selectedInvoice.id}</Typography>
          <Box mt={1}>
            <Chip
              size="small"
              color="secondary"
              variant="outlined"
              label={orderDate}
            ></Chip>
          </Box>
        </Box>

        <Logo />
      </Stack>
      <Divider></Divider>

      <Grid container spacing={3} mt={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                From :
              </Typography>
              <Typography variant="body1">PullerDuo Inc.</Typography>
              <Typography variant="body1">puller.duo@gmail.com</Typography>
              <Typography variant="body1">Ahmedabad, Gujarat, India</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                To :
              </Typography>
              <Typography variant="body1">Umang Patel</Typography>
              <Typography variant="body1">umang@gmail.com</Typography>
              <Typography variant="body1">Rider</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Starting point
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Ending point
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Total KM
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" fontSize="14px">
                    Total Time
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedInvoice.orders.map(
                (
                  order: {
                    itemName: string;
                    unitPrice: string;
                    units: number;
                    unitTotalPrice: string;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body1">{order.itemName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{order.unitPrice}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{order.units}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        {order.unitTotalPrice}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box p={3} bgcolor="primary.light" mt={3}>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Driver Wage:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedInvoice.totalCost}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Platform fee:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedInvoice.vat}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" gap={3}>
          <Typography variant="body1" fontWeight={600}>
            Grand Total:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedInvoice.grandTotal}
          </Typography>
        </Box>
      </Box>
      {userState.type == "Rider" && (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mt={3}
          justifyContent="end"
        >
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            href={`/apps/invoice/edit/${selectedInvoice.billFrom}`}
          >
            Cancel payment
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/apps/invoice/list"
          >
            Pay now
          </Button>
        </Box>
      )}
    </>
  );
};

export default InvoiceDetail;
