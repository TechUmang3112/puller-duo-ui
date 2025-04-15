"use client";

// Imports
import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableHead,
  Chip,
  Box,
  Grid,
  MenuItem,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import DownloadCard from "@/app/components/shared/DownloadCard";
import { PaginationDataType } from "@/app/(DashboardLayout)/react-tables/pagination/PaginationData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomSelect from "@/app/components/forms/theme-elements/CustomSelect";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  getFormattedDateAndTime,
  jsonDateToReadbaleFormat,
} from "@/services/date.service";
import Disabled from "../ui-components/rating/Disabled";
import { nRider, nUser } from "@/constants/network";
import { get, post } from "@/services/api.service";
import { useSearchParams } from "next/navigation";
import Rating from "@mui/material/Rating";
import { showSuccess } from "@/services/utils.service";

interface RideData {
  Date: string;
  Time?: string;
  Amount: number;
  status: "attempted" | "completed";
}

const columnHelper = createColumnHelper<RideData>();

const columns = [
  columnHelper.accessor("Date", {
    header: () => "Date",
    cell: (info: any) => {
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h6">{info.getValue()}</Typography>
          </Box>
        </Stack>
      );
    },
  }),

  columnHelper.accessor("Time", {
    header: () => "Time",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("Amount", {
    header: () => "Amount",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        Rs. {info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("status", {
    header: () => "Status",
    meta: {
      filterVariant: "select",
    },
    cell: (info) => (
      <Chip
        sx={{
          bgcolor:
            info.getValue() === "attempted"
              ? (theme) => theme.palette.warning.light
              : info.getValue() === "completed"
              ? (theme) => theme.palette.primary.light
              : (theme) => theme.palette.secondary.light,
          color:
            info.getValue() === "attempted"
              ? (theme) => theme.palette.warning.main
              : info.getValue() === "completed"
              ? (theme) => theme.palette.primary.main
              : (theme) => theme.palette.secondary.main,
          borderRadius: "8px",
        }}
        label={info.getValue()}
      />
    ),
  }),
];

const PaymentTable = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("razorpay_payment_id");
  const razorpay_payment_link_status = searchParams.get(
    "razorpay_payment_link_status"
  );
  const razorpay_payment_link_id = searchParams.get("razorpay_payment_link_id");

  const [rideId, setRideId] = useState("");
  const [data, setData] = useState<RideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = React.useState<any>([]);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    getPayments();
  }, []);

  async function getPayments() {
    try {
      setLoading(true);

      if (
        paymentId &&
        razorpay_payment_link_status &&
        razorpay_payment_link_id
      ) {
        const syncResponse = await post(nRider.syncPayment, {
          userId: localStorage.getItem("userId"),
          paymentLinkId: razorpay_payment_link_id,
          paymentId,
        });

        if (syncResponse?.needRating == true) {
          setRideId(syncResponse.rideId);
          setRatingDialogOpen(true);
        }
      }

      const response = await get(nUser.payments, {
        userId: localStorage.getItem("userId"),
      });

      if (response.list) {
        // Transform the API data to match your table structure
        const formattedData = response.list.map((payment: any) => ({
          Date: getFormattedDateAndTime(new Date(payment.dateTime)).Date,
          Time: getFormattedDateAndTime(new Date(payment.dateTime)).Time,
          Amount: payment.amount || 0,
          status: payment.paymentStatus == true ? "completed" : "Attempted",
        }));

        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleRatingSubmit = async () => {
    try {
      setIsSubmittingRating(true);
      // Call your API to submit the rating and feedback
      // Example:
      const response = await post(nRider.rateRide, {
        userId: localStorage.getItem("userId"),
        rating,
        rideId,
        feedback,
      });
      if (response.success) {
        showSuccess(response.successMsg);
      }

      // Close the dialog after submission
      setRatingDialogOpen(false);
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  if (loading) {
    return (
      <DownloadCard title="My Payments">
        <Typography variant="body1" p={3}>
          Loading payments...
        </Typography>
      </DownloadCard>
    );
  }

  if (data.length === 0) {
    return (
      <DownloadCard title="My Payments">
        <Typography variant="body1" p={3}>
          No payments found
        </Typography>
      </DownloadCard>
    );
  }

  return (
    <>
      <DownloadCard title="My Payments">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <TableContainer>
                <Table
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell key={header.id}>
                            <Typography
                              variant="h6"
                              mb={1}
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              {(() => {
                                const sortState = header.column.getIsSorted();
                                if (sortState === "asc") return " 🔼";
                                if (sortState === "desc") return " 🔽";
                                return null;
                              })()}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider />
              <Stack
                gap={1}
                p={3}
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">
                    {table.getPrePaginationRowModel().rows.length} Payments
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "flex",
                    },
                  }}
                  alignItems="center"
                  gap={1}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body1">Page</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    | Go to page:
                    <CustomTextField
                      type="number"
                      min="1"
                      max={table.getPageCount()}
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e: { target: { value: any } }) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        table.setPageIndex(page);
                      }}
                    />
                  </Stack>
                  <CustomSelect
                    value={table.getState().pagination.pageSize}
                    onChange={(e: { target: { value: any } }) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 15, 20, 25].map((pageSize) => (
                      <MenuItem key={pageSize} value={pageSize}>
                        {pageSize}
                      </MenuItem>
                    ))}
                  </CustomSelect>

                  <IconButton
                    size="small"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <IconChevronsLeft />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <IconChevronLeft />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <IconChevronRight />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <IconChevronsRight />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DownloadCard>

      {/* Rating Dialog */}
      <Dialog
        open={ratingDialogOpen}
        onClose={() => setRatingDialogOpen(false)}
      >
        <DialogTitle>Rate Your Experience</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body1" gutterBottom>
                How would you rate your ride experience?
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Your feedback (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleRatingSubmit}
            color="primary"
            variant="contained"
            disabled={isSubmittingRating || rating === null || rating === 0}
          >
            {isSubmittingRating ? "Submitting..." : "Submit Rating"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentTable;
