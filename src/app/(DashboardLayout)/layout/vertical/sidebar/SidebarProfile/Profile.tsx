// Imports
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { AppState } from "@/store/store";
import { useSelector } from "@/store/hooks";
import { IconPower } from "@tabler/icons-react";
import { logoutFromApp } from "@/services/auth.service";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const userState = useSelector((state: AppState) => state.userReducer);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={"/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">{userState.name.split(" ")[0]}</Typography>
            <Typography variant="caption">Rider</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={() => {
                  logoutFromApp();
                }}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
