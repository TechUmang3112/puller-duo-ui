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
  Box,
  Grid,
  MenuItem,
  Divider,
  IconButton,
  Chip,
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
import Disabled from "../ui-components/rating/Disabled";
import { get } from "@/services/api.service";
import { nAdmin } from "@/constants/network";

export interface PaginationDataType {
  id: string;
  Name: string;
  Email: string;
  "Total Rides": number;
  Spendings: number;
  DocumentStatus: string;
}

const columnHelper = createColumnHelper<PaginationDataType>();

const columns = [
  columnHelper.accessor("Name", {
    header: () => "Name",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("Email", {
    header: () => "Email",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("Total Rides", {
    header: () => "Total Rides",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("Spendings", {
    header: () => "Spendings",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        ₹{info.getValue()}
      </Typography>
    ),
  }),

  columnHelper.accessor("DocumentStatus", {
    header: () => "Document Status",
    meta: {
      filterVariant: "select",
    },
    cell: (info) => (
      <Chip
        sx={{
          bgcolor:
            info.getValue() === "Approved"
              ? (theme) => theme.palette.success.light
              : info.getValue() === "In Verification"
              ? (theme) => theme.palette.warning.light
              : info.getValue() === "Not uploaded"
              ? (theme) => theme.palette.warning.light
              : info.getValue() === "Rejected"
              ? (theme) => theme.palette.error.light
              : (theme) => theme.palette.secondary.light,
          color:
            info.getValue() === "Approved"
              ? (theme) => theme.palette.success.main
              : info.getValue() === "In Verification"
              ? (theme) => theme.palette.warning.main
              : info.getValue() === "Not uploaded"
              ? (theme) => theme.palette.warning.main
              : info.getValue() === "Rejected"
              ? (theme) => theme.palette.error.main
              : (theme) => theme.palette.secondary.main,
          borderRadius: "8px",
        }}
        label={info.getValue()}
      />
    ),
  }),
];

const RiderListTable = () => {
  const [data, setData] = useState<PaginationDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    getRiders();
  }, []);

  async function getRiders() {
    try {
      setLoading(true);
      const response = await get(nAdmin.riders);
      if (response.list && Array.isArray(response.list)) {
        // Transform the API response to match our table data structure
        const formattedData = response.list.map((rider: any) => ({
          id: rider.id || rider._id, // Use whichever field your API provides
          Name: rider.name || `${rider.firstName} ${rider.lastName}`,
          Email: rider.email,
          "Total Rides": rider.totalRides || 0,
          Spendings: rider.totalSpendings || 0,
          DocumentStatus: rider.isAadhaarApproved ? "Approved" : "Not uploaded",
        }));
        setData(formattedData);
      }
    } catch (err) {
      setError("Failed to fetch riders. Please try again later.");
      console.error("Error fetching riders:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DownloadCard title="Riders">
        <Typography variant="body1" p={3}>
          Loading riders...
        </Typography>
      </DownloadCard>
    );
  }

  if (error) {
    return (
      <DownloadCard title="Riders">
        <Typography variant="body1" color="error" p={3}>
          {error}
        </Typography>
      </DownloadCard>
    );
  }

  if (data.length === 0) {
    return (
      <DownloadCard title="Riders">
        <Typography variant="body1" p={3}>
          No riders found.
        </Typography>
      </DownloadCard>
    );
  }

  return (
    <DownloadCard title="Riders">
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
                  {table.getPrePaginationRowModel().rows.length} Riders
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

export default RiderListTable;
