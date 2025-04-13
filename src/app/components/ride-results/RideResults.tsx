"use client";

// Imports
import React, { useState } from "react";
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
  Button,
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
import RideDialog from "./RideAccept";
import { RideState } from "@/store/ride/RideReducer";
import { useSelector } from "@/store/hooks";
import { getFormattedDateAndTime } from "@/services/date.service";

interface PaginationDataType {
  Action?: boolean;
  Date?: string;
  Time?: string;
  "Starting point": string;
  "Ending point": string;
  "Ride cost": number;
  Rating: number;
  id?: string;
  rowIndex?: number; // New field
}

const columnHelper = createColumnHelper<PaginationDataType>();

function getColumns(handleOpenDialog: (rideData: PaginationDataType) => void) {
  const columns = [
    columnHelper.accessor("Date", {
      header: () => "Date",
      cell: (info: any) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h6">{info.getValue()}</Typography>
          </Box>
        </Stack>
      ),
    }),

    columnHelper.accessor("Time", {
      header: () => "Time",
      cell: (info: any) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h6">{info.getValue()}</Typography>
          </Box>
        </Stack>
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

    columnHelper.accessor("Rating", {
      header: () => "Rating",
      cell: (info) => {
        if (info.getValue()) {
          return (
            <Grid
              item
              xs={12}
              lg={4}
              sm={6}
              display="flex"
              alignItems="stretch"
            >
              <Disabled />
            </Grid>
          );
        } else return <></>;
      },
    }),

    columnHelper.accessor("Action", {
      header: () => "Action",
      cell: (info) => (
        <Button onClick={() => handleOpenDialog(info.row.original)}>
          Accept
        </Button>
      ),
    }),
  ];

  return columns;
}

const RideResults = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<PaginationDataType | null>(
    null
  );
  const rideState: RideState = useSelector((state) => state.rideReducer);

  const handleOpenDialog = (rideData: PaginationDataType) => {
    setSelectedRide(rideData); // rideData already contains rowIndex
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAcceptRide = () => {
    setIsDialogOpen(false);
  };

  const transformRidesToTableData = (rides: any[]): PaginationDataType[] => {
    return rides.map((ride, index) => ({
      id: ride.id,
      Action: true,
      Date: getFormattedDateAndTime(new Date(ride.rideTime)).Date,
      Time: getFormattedDateAndTime(new Date(ride.rideTime)).Time,
      "Starting point": ride.startPlace || "Unknown",
      "Ending point": ride.endPlace || "Unknown",
      "Ride cost": ride.total_payment || 0,
      Rating: ride.rating || 0,
      rowIndex: index, // Add the row index to the ride data
    }));
  };

  const [data, setData] = React.useState<PaginationDataType[]>([]);

  React.useEffect(() => {
    if (rideState.availableRides) {
      setData(transformRidesToTableData(rideState.availableRides));
    }
  }, [rideState.availableRides]);

  const [columnFilters, setColumnFilters] = React.useState<any>([]);
  const table = useReactTable({
    data,
    columns: getColumns(handleOpenDialog),
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

  return (
    <Box mt={5}>
      <DownloadCard title="Available rides">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              {data.length === 0 ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="200px"
                >
                  <Typography variant="h6" color="textSecondary">
                    No rides available currently
                  </Typography>
                </Box>
              ) : (
                <>
                  <TableContainer>
                    <Table sx={{ whiteSpace: "nowrap" }}>
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
                                    const sortState =
                                      header.column.getIsSorted();
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
                          defaultValue={
                            table.getState().pagination.pageIndex + 1
                          }
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
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                      >
                        <IconChevronsRight />
                      </IconButton>
                    </Box>
                  </Stack>
                </>
              )}
              <RideDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onAccept={handleAcceptRide}
                rideData={selectedRide}
              />
            </Box>
          </Grid>
        </Grid>
      </DownloadCard>
    </Box>
  );
};

export default RideResults;
