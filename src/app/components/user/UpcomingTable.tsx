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
} from "@tabler/icons-react";
import {
  getFormattedDateAndTime,
  jsonDateToReadbaleFormat,
} from "@/services/date.service";
import Disabled from "../ui-components/rating/Disabled";
import { get } from "@/services/api.service";
import { nUser } from "@/constants/network";

export interface PaginationDataType {
  Date?: string;
  Time?: string;
  "Starting point": string;
  "Ending point": string;
  "Ride cost": number;
}

const columnHelper = createColumnHelper<PaginationDataType>();

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
];

const UpcomingTable = () => {
  const [data, setData] = useState<PaginationDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = React.useState<any>([]);

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
        // Transform API data to match table structure
        const formattedData = response.list.map((ride: any) => ({
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
    <DownloadCard title="My Upcoming Rides">
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
  );
};

export default UpcomingTable;
