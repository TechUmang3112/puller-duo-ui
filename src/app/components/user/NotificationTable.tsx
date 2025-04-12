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
import { nUser } from "@/constants/network";
import { get } from "@/services/api.service";

export interface PaginationDataType {
  Date: string;
  Time: string;
  Content: string;
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

  columnHelper.accessor("Content", {
    header: () => "Content",
    cell: (info) => (
      <Typography variant="subtitle1" color="textSecondary">
        {info.getValue()}
      </Typography>
    ),
  }),
];

const NotificationTable = () => {
  const [data, setData] = useState<PaginationDataType[]>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    getNotifications();
  }, []);

  async function getNotifications() {
    try {
      const response = await get(nUser.notifications, {
        userId: localStorage.getItem("userId"),
      });

      if (response?.list) {
        // Transform the API response to match the table data structure
        const formattedData = response.list.map((notification: any) => {
          return {
            Date: getFormattedDateAndTime(new Date(notification.dateTime)).Date,
            Time: getFormattedDateAndTime(new Date(notification.dateTime)).Time,
            Content:
              notification.message || notification.content || "Notification",
          };
        });
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // You might want to show an error message to the user here
    }
  }

  return (
    <DownloadCard title="Notifications">
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
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <Typography variant="subtitle1" color="textSecondary">
                          No notifications found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            {data.length > 0 && (
              <Stack
                gap={1}
                p={3}
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">
                    {table.getPrePaginationRowModel().rows.length} Notifications
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
            )}
          </Box>
        </Grid>
      </Grid>
    </DownloadCard>
  );
};

export default NotificationTable;
