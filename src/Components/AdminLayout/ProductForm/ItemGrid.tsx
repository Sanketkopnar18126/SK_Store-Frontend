import React from "react";
import { Grid } from "@mui/material";
import type { GridProps } from "@mui/material";

interface ItemGridProps extends GridProps {
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
const ItemGrid = React.forwardRef<HTMLDivElement, ItemGridProps>((props, ref) => {
  return <Grid ref={ref} {...props} />;
});

export default ItemGrid;