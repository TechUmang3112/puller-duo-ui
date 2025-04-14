"use client";

// Imports
import React, { useState, useEffect } from "react"; // Added useEffect
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
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { nAdmin } from "@/constants/network";
import { get } from "@/services/api.service";

export interface PaginationDataType {
  id: string;
  Name: string;
  Email: string;
  DocumentStatus: string;
  isActive: boolean;
}

const columnHelper = createColumnHelper<PaginationDataType>();

const UserListTable = () => {
  const [data, setData] = useState<PaginationDataType[]>([]); // Initialize as empty array
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<{
    id: string;
    field: "Name" | "Email";
    value: string;
  } | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditClick = (
    id: string,
    field: "Name" | "Email",
    value: string
  ) => {
    setCurrentEdit({ id, field, value });
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentEdit(null);
  };

  const handleDialogSave = () => {
    if (currentEdit) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === currentEdit.id
            ? { ...item, [currentEdit.field]: currentEdit.value }
            : item
        )
      );
    }
    handleDialogClose();
  };

  const handleToggleActive = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const columns = [
    columnHelper.accessor("Name", {
      header: () => "Name",
      cell: (info) => (
        <Typography
          variant="subtitle1"
          color="textSecondary"
          onClick={() =>
            handleEditClick(info.row.original.id, "Name", info.getValue())
          }
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          {info.getValue()}
        </Typography>
      ),
    }),

    columnHelper.accessor("Email", {
      header: () => "Email",
      cell: (info) => (
        <Typography
          variant="subtitle1"
          color="textSecondary"
          onClick={() =>
            handleEditClick(info.row.original.id, "Email", info.getValue())
          }
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          {info.getValue()}
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

    columnHelper.accessor("isActive", {
      header: () => "Status",
      cell: (info) => (
        <Switch
          checked={info.getValue()}
          onChange={() => handleToggleActive(info.row.original.id)}
          color="primary"
        />
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

  async function getUsers() {
    setLoading(true);
    const response = await get(nAdmin.users);
    if (response.list) {
      // Map the API response to match your data structure
      const mappedData = response.list.map((user: any) => ({
        id: user._id.toString(),
        Name: user.name || "N/A",
        Email: user.email || "N/A",
        DocumentStatus:
          user.isAadhaarApproved || user.isDriverLicenceApproved
            ? "Approved"
            : "Not uploaded",
        isActive: user.isActive || false,
      }));
      setData(mappedData);
      setLoading(false);
    }
  }

  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  return (
    <>
      <DownloadCard title="Registered Users">
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
                    {table.getPrePaginationRowModel().rows.length} Users
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          Edit {currentEdit?.field === "Name" ? "Name" : "Email"}
        </DialogTitle>
        <DialogContent>
          <CustomTextField
            autoFocus
            margin="dense"
            label={currentEdit?.field === "Name" ? "Name" : "Email"}
            type="text"
            fullWidth
            variant="outlined"
            value={currentEdit?.value || ""}
            onChange={(e: any) =>
              setCurrentEdit(
                currentEdit ? { ...currentEdit, value: e.target.value } : null
              )
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleDialogSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserListTable;
