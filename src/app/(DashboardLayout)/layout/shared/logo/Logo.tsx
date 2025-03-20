"use client";

// Imports
import { useSelector } from "@/store/hooks";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { AppState } from "@/store/store";
import Image from "next/image";

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);

  // Styled component for the Link
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/pullerduologo.svg"
        alt="logo"
        height={customizer.TopbarHeight} // Set height dynamically
        width={customizer.isCollapse ? 40 : 180} // Set width dynamically
        //height={110}
        //width={250}
        priority
        style={{
          objectFit: "contain", // Ensures the image fits within the container
        }}
      />
    </LinkStyled>
  );
};

export default Logo;
