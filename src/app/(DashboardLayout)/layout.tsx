"use client";

// Imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Navigation from "./layout/horizontal/navbar/Navigation";
import HorizontalHeader from "./layout/horizontal/header/Header";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { validateAuth } from "@/services/auth.service";
import { APP_NAME } from "@/constants/strings";
import { get } from "@/services/api.service";
import { nUser } from "@/constants/network";
import { setName } from "@/store/user/UserReducer";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  // Checks for login details
  useEffect(() => {
    validateAuth();
    getProfile();
  });

  async function getProfile() {
    const userId = localStorage.getItem("userId");
    if (!userId) return {};

    const response = await get(nUser.profile, { userId });
    if (!response.isError) {
      localStorage.setItem("user_name", response.name ?? "User");
      dispatch(setName(response.name ?? "User"));
    }
  }

  return (
    <MainWrapper
      className={
        customizer.activeMode === "dark" ? "darkbg mainwrapper" : "mainwrapper"
      }
    >
      <title>{APP_NAME}</title>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? "" : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        {customizer.isHorizontal ? <Navigation /> : ""}
        <Container
          sx={{
            pt: "30px",
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            {/* <Outlet /> */}
            {children}
            {/* <Index /> */}
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
