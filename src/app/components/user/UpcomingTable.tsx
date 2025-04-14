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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import { Stack } from "@mui/system";
import DownloadCard from "@/app/components/shared/DownloadCard";
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
  IconSettings,
} from "@tabler/icons-react";
import {
  getFormattedDateAndTime,
  jsonDateToReadbaleFormat,
} from "@/services/date.service";
import Disabled from "../ui-components/rating/Disabled";
import { get, post } from "@/services/api.service";
import { nDriver, nUser } from "@/constants/network";
import { showSuccess } from "@/services/utils.service";

export interface PaginationDataType {
  Date?: string;
  Time?: string;
  "Starting point": string;
  "Ending point": string;
  "Ride cost": number;
  id?: string;
}

const columnHelper = createColumnHelper<PaginationDataType>();

const UpcomingTable = () => {
  const [data, setData] = useState<PaginationDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = React.useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRide, setSelectedRide] = useState<{
    data: PaginationDataType;
    index: number;
  } | null>(null);

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

    columnHelper.accessor("Starting point", {
      header: () => "Starting point",
      cell: (info) => (
        <Typography variant="subtitle1" color="textSecondary">
          {info.getValue()}
        </Typography>
      ),
    }),

    columnHelper.accessor("Ending point", {
      header: () => "Ending point",
      cell: (info) => (
        <Typography variant="subtitle1" color="textSecondary">
          {info.getValue()}
        </Typography>
      ),
    }),

    columnHelper.accessor("Ride cost", {
      header: () => "Ride cost",
      cell: (info) => (
        <Typography variant="subtitle1" color="textSecondary">
          Rs. {info.getValue()}
        </Typography>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: () => "Actions",
      cell: (info) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRide({
              data: info.row.original,
              index: info.row.index,
            });
            setOpenDialog(true);
          }}
        >
          <IconSettings size="20" />
        </IconButton>
      ),
    }),
  ];

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
    getUpcomingRides();
  }, []);

  async function getUpcomingRides() {
    try {
      setLoading(true);
      const response = await get(nUser.upcomingRideList, {
        userId: localStorage.getItem("userId"),
      });

      if (response.list && Array.isArray(response.list)) {
        const formattedData = response.list.map((ride: any) => ({
          id: ride._id,
          Date: getFormattedDateAndTime(new Date(ride.rideTime)).Date,
          Time: getFormattedDateAndTime(new Date(ride.rideTime)).Time,
          "Starting point": ride.startPlace || "N/A",
          "Ending point": ride.endPlace || "N/A",
          "Ride cost": ride.total_payment || 0,
        }));

        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching upcoming rides:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRide(null);
  };

  const handleCancelRide = async () => {
    const response = await post(nDriver.cancelRide, {
      userId: localStorage.getItem("userId"),
      rideId: selectedRide?.data.id,
    });
    if (response.success) {
      showSuccess(response.successMsg);
    }

    getUpcomingRides();
    handleCloseDialog();
  };

  const handleStartRide = async () => {
    const body = {
      userId: localStorage.getItem("userId"),
      rideId: selectedRide?.data.id,
    };
    const response = await post(nDriver.startRide, body);
    if (response.success) {
      showSuccess(response.successMsg);
    }

    handleCloseDialog();
  };

  if (loading) {
    return (
      <DownloadCard title="My Upcoming Rides">
        <Typography variant="body1" p={3}>
          Loading rides...
        </Typography>
      </DownloadCard>
    );
  }

  if (!data.length) {
    return (
      <DownloadCard title="My Upcoming Rides">
        <Typography variant="body1" p={3}>
          No upcoming rides found
        </Typography>
      </DownloadCard>
    );
  }

  return (
    <>
      <DownloadCard title="My Upcoming Rides">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ p: 2 }}>
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{ borderRadius: 2 }}
              >
                <Table
                  sx={{
                    whiteSpace: "nowrap",
                    "& .MuiTableCell-root": {
                      padding: "16px 24px",
                    },
                  }}
                >
                  <TableHead sx={{ backgroundColor: "action.hover" }}>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell key={header.id}>
                            <Typography
                              variant="h6"
                              mb={1}
                              fontWeight={600}
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
                      <TableRow
                        key={row.id}
                        hover
                        sx={{ "&:last-child td": { borderBottom: 0 } }}
                      >
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
              <Divider sx={{ my: 2 }} />
              <Stack
                gap={2}
                p={3}
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                sx={{ backgroundColor: "background.paper", borderRadius: 2 }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">
                    {table.getPrePaginationRowModel().rows.length} Rides
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
                  gap={2}
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
                      sx={{ width: "80px", mx: 1 }}
                    />
                  </Stack>
                  <CustomSelect
                    value={table.getState().pagination.pageSize}
                    onChange={(e: { target: { value: any } }) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                    sx={{ minWidth: "100px", mx: 1 }}
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
                    sx={{ mx: 0.5 }}
                  >
                    <IconChevronsLeft />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    sx={{ mx: 0.5 }}
                  >
                    <IconChevronLeft />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    sx={{ mx: 0.5 }}
                  >
                    <IconChevronRight />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    sx={{ mx: 0.5 }}
                  >
                    <IconChevronsRight />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DownloadCard>

      {/* Enhanced Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            py: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          Ride Details
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedRide && (
            <Stack spacing={2}>
              <Box
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  p: 2,
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {selectedRide.data["Starting point"]} →{" "}
                  {selectedRide.data["Ending point"]}
                </Typography>
              </Box>

              <Stack spacing={1} sx={{ px: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={500}>
                    Date:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRide.data.Date}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={500}>
                    Time:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRide.data.Time}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={500}>
                    Starting Point:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRide.data["Starting point"]}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={500}>
                    Ending Point:
                  </Typography>
                  <Typography variant="body1">
                    {selectedRide.data["Ending point"]}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight={500}>
                    Ride Cost:
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    Rs. {selectedRide.data["Ride cost"]}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
                What would you like to do with this ride?
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            p: 3,
            gap: 2,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleCancelRide}
            color="error"
            variant="contained"
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel Ride
          </Button>
          <Button
            onClick={handleStartRide}
            color="primary"
            variant="contained"
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Start Ride
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpcomingTable;
