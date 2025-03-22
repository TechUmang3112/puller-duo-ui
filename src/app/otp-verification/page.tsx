// Imports
import AuthTwoSteps from "../auth/authForms/AuthTwoSteps";
import { Grid, Box, Card, Typography } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";

export default function TwoSteps2() {
  return (
    <PageContainer title="Verify OTP" description="Verify OTP">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
                mb={1}
              >
                We sent a verification code to your email. Enter the code from
                the email in the field below.
              </Typography>
              <AuthTwoSteps />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
