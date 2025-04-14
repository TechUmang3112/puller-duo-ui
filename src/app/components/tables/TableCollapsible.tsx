"use client";

// Imports
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
import { nAdmin } from "@/constants/network";
import { get, post } from "@/services/api.service";
import { showSuccess } from "@/services/utils.service";

// Define types for your data
interface ApprovalItem {
  id: string; // Added id field for API operations
  pname?: string;
  type?: "Driver" | "Rider";
  image?: string;
}

function Row(props: { row: ApprovalItem; onActionComplete: () => void }) {
  const { row, onActionComplete } = props;

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

  const handleApprove = async () => {
    try {
      await updateDocStatus(row.id, "approve");
      onActionComplete();
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await updateDocStatus(row.id, "decline");
      onActionComplete();
    } catch (error) {
      console.error("Failed to decline:", error);
    }
  };

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

const TableCollapsible = () => {
  const [approvalList, setApprovalList] = React.useState<ApprovalItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getApprovalList();
  }, []);

  async function getApprovalList() {
    try {
      setLoading(true);
      const response = await get(nAdmin.approvalList);

      if (response.list) {
        // Transform the API response into the format your component expects
        const transformedData = response.list.map((item: any) => ({
          id: item._id, // Make sure to include the id from the API response
          pname: item.name || item.username || item.email,
          type: item.type === "1" ? "Driver" : "Rider",
          image: "data:image/png;base64," + item.base64Content,
        }));

        setApprovalList(transformedData);
      } else {
        setApprovalList([]);
      }
    } catch (err) {
      setError("Failed to fetch approval list");
      console.error("Error fetching approval list:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleActionComplete = () => {
    // Refresh the table data after any action
    getApprovalList();
  };

  // Get the count of pending approvals for the title
  const pendingCount = approvalList.length;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <ParentCard title={`Pending Approvals (${pendingCount})`}>
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
              {approvalList.length > 0 ? (
                approvalList.map((row, index) => (
                  <Row
                    key={`${row.id}-${index}`}
                    row={row}
                    onActionComplete={handleActionComplete}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No pending approvals
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </BlankCard>
    </ParentCard>
  );
};

async function updateDocStatus(userId: string, action: "approve" | "decline") {
  const response = await post(nAdmin.updateDocStatus, {
    userId,
    action: action === "approve" ? "approve" : "rejected",
  });
  if (response?.success) {
    showSuccess(response.successMsg);
  }
}

export default TableCollapsible;
