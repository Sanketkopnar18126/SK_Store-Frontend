import React, { useMemo, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category?: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Pro 14",
    price: 89999,
    stock: 10,
    category: "Electronics",
  },
  { id: 2, name: "Smartphone X", price: 49999, stock: 25, category: "Mobiles" },
  {
    id: 3,
    name: "NoiseCancel Headset",
    price: 3499,
    stock: 50,
    category: "Audio",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 6999,
    stock: 12,
    category: "Accessories",
  },
  { id: 5, name: "USB-C Hub", price: 1999, stock: 0, category: "Accessories" },
];

export const AdminProductsTable: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "">("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    let list = products;
    if (query.trim())
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          String(p.id) === query
      );
    if (category) list = list.filter((p) => p.category === category);
    return list;
  }, [products, query, category]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category || "Other"))),
    [products]
  );

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+ event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Link to="/admin/add-product">
          <Button variant="contained">Add Product</Button>
        </Link>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by name or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                </TableRow>
              ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};
