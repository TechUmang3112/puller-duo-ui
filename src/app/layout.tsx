// Imports
import "./global.css";
import React from "react";
import MyApp from "./app";
import { Providers } from "@/store/providers";
import { APP_NAME } from "@/constants/strings";

export const metadata = {
  title: APP_NAME,
  description: "Ride together, Save Together !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
