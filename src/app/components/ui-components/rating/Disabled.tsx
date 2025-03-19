"use client";

import * as React from "react";
import { Rating } from "@mui/material";

const Disabled = () => {
  const [value, setValue] = React.useState<number | null>(2);

  return <Rating name="disabled" value={value} disabled />;
};
export default Disabled;
