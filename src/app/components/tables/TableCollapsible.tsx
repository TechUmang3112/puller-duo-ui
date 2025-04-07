"use client";

import * as React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Button,
} from "@mui/material";
import BlankCard from "@/app/components/shared/BlankCard";
import ParentCard from "@/app/components/shared/ParentCard";
import { SAMPLE_BASE_64 } from "@/constants/strings";

const sampleBase64Image = "data:image/png;base64," + SAMPLE_BASE_64;

function createData(pname?: string, type?: "Driver" | "Rider", image?: string) {
  return {
    pname,
    type,
    image: image || sampleBase64Image,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;

  const handleImageClick = () => {
    if (row.image) {
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Image Preview</title>
              <style>
                body { 
                  margin: 0; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  height: 100vh; 
                  background-color: #f5f5f5; 
                }
                .image-container {
                  max-width: 90vw;
                  max-height: 90vh;
                  display: flex;
                  justify-content: center;
                }
                img { 
                  max-width: 100%; 
                  max-height: 100%; 
                  object-fit: contain;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }
              </style>
            </head>
            <body>
              <div class="image-container">
                <img src="${row.image}" alt="Full size preview" />
              </div>
              <script>
                // Close window when clicking anywhere
                document.body.addEventListener('click', function() {
                  window.close();
                });
              </script>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  const handleApprove = () => console.log("Approved:", row.pname);
  const handleDecline = () => console.log("Declined:", row.pname);

  return (
    <TableRow sx={{ "& .MuiTableCell-root": { verticalAlign: "middle" } }}>
      <TableCell>
        <Typography variant="h6" fontWeight="600">
          {row.pname}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography color="textSecondary" variant="h6">
          {row.type}
        </Typography>
      </TableCell>
      <TableCell>
        <div
          style={{
            width: 50,
            height: 50,
            cursor: "pointer",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #eee",
            borderRadius: 4,
          }}
          onClick={handleImageClick}
        >
          <img
            src={row.image}
            alt="Thumbnail"
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

const rows = [
  createData("John Doe", "Driver"),
  createData("Jane Smith", "Rider"),
  createData("Mike Johnson", "Driver"),
  createData("Sarah Williams", "Rider"),
];

const TableCollapsible = () => (
  <ParentCard title="Pending Approvals (19)">
    <BlankCard>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.pname} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  </ParentCard>
);

export default TableCollapsible;
