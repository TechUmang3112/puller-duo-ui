// Imports
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";

const BannerCard = () => {
  const theme = useTheme();

  return (
    <Box mt={5} ml={3}>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {/* Card 1 - Low Prices */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: theme.shadows[1],
              borderRadius: 2,
              borderLeft: "4px solid",
              borderLeftColor: theme.palette.primary.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                transform: "translateY(-2px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <EmojiTransportationIcon
                color="primary"
                sx={{
                  fontSize: 32,
                  backgroundColor: theme.palette.primary.light,
                  p: 1,
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 0,
                }}
              >
                Your pick of rides at low prices
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "text.secondary", pl: 6 }}>
              No matter where you're going, by bus or carpool, find the perfect
              ride from our wide range of destinations and routes at low prices.
            </Typography>
          </Card>
        </Grid>

        {/* Card 2 - Trust */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: theme.shadows[1],
              borderRadius: 2,
              borderLeft: "4px solid",
              borderLeftColor: theme.palette.success.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                transform: "translateY(-2px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <VerifiedUserIcon
                color="success"
                sx={{
                  fontSize: 32,
                  backgroundColor: theme.palette.success.light,
                  p: 1,
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.success.main,
                  mb: 0,
                }}
              >
                Trust who you travel with
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "text.secondary", pl: 6 }}>
              We take the time to get to know each of our members and bus
              partners. We check reviews, profiles and IDs, so you know who
              you're traveling with.
            </Typography>
          </Card>
        </Grid>

        {/* Card 3 - Easy Booking */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: theme.shadows[1],
              borderRadius: 2,
              borderLeft: "4px solid",
              borderLeftColor: theme.palette.warning.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                transform: "translateY(-2px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <TouchAppIcon
                color="warning"
                sx={{
                  fontSize: 32,
                  backgroundColor: theme.palette.warning.light,
                  p: 1,
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.warning.main,
                  mb: 0,
                }}
              >
                Scroll, click, tap and go!
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "text.secondary", pl: 6 }}>
              Booking a ride has never been easier! Thanks to our simple app
              powered by great technology, you can book a ride close to you in
              just minutes.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerCard;
