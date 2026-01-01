// src/Components/CategoryPage/FilterPanel.tsx
import React from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface FilterPanelProps {
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  sortBy: "lowToHigh" | "highToLow" | "default";
  setSortBy: (val: "lowToHigh" | "highToLow" | "default") => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          value={priceRange}
          onChange={(_, val) => setPriceRange(val as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Stock Filter */}
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              color="primary"
            />
          }
          label="In Stock Only"
        />
      </div>

      {/* Sort Filter */}
      <div>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Sort By"
            onChange={(e) =>
              setSortBy(e.target.value as "lowToHigh" | "highToLow" | "default")
            }
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="highToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterPanel;
