import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "../../Components/Ui/button";
import { Card, CardContent,CardHeader, CardTitle } from "../../Components/Ui/card";
import { Input } from "../../Components/Ui/input";
import { Badge } from "../../Components/Ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../Components/Ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../Components/Ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../Components/Ui/dialog";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category?: string;
};

const initialProducts: Product[] = [
  { id: 1, name: "Laptop Pro 14", price: 89999, stock: 10, category: "Electronics" },
  { id: 2, name: "Smartphone X", price: 49999, stock: 25, category: "Mobiles" },
  { id: 3, name: "NoiseCancel Headset", price: 3499, stock: 50, category: "Audio" },
  { id: 4, name: "Mechanical Keyboard", price: 6999, stock: 12, category: "Accessories" },
  { id: 5, name: "USB-C Hub", price: 1999, stock: 0, category: "Accessories" },
];

export const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [perPage] = useState(5);
  const [page, setPage] = useState(1);

  // dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || String(p.id) === q);
    if (category) list = list.filter((p) => p.category === category);
    return list;
  }, [products, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
  };

  function openDeleteDialog(p: Product) {
    setToDelete(p);
    setConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!toDelete) return;
    setProducts((s) => s.filter((p) => p.id !== toDelete.id));
    setToDelete(null);
    setConfirmOpen(false);
  }

  function handleCancelDelete() {
    setToDelete(null);
    setConfirmOpen(false);
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }
  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category || "Other"))), [products]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
        </div>

        <div className="flex gap-3 items-center">
          <Link to="/admin/add-product">
            <Button variant={"outline"} className="flex items-center gap-2" aria-label="Add product">
              <Plus size={16} /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>Product catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 w-full md:w-1/2 relative">
              <Input
                placeholder="Search by name or id..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={16} />
              </div>

              <div className="flex gap-2 ml-auto">
                <select
                  className="border rounded px-3 py-2 text-sm"
                  value={category ?? ""}
                  onChange={(e) => {
                    setCategory(e.target.value || null);
                    setPage(1);
                  }}
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge>{filtered.length} items</Badge>

              <div className="text-sm text-muted-foreground">Page {page} of {totalPages}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="w-[120px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((p) => (
                  <TableRow key={p.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.category}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
                    <TableCell className="text-right">
                      {p.stock > 0 ? (
                        <span className="inline-block px-2 py-1 rounded text-xs bg-green-50 text-green-700">{p.stock} in</span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded text-xs bg-red-50 text-red-700">Out</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/admin/products/${p.id}`}>
                          <Button size="sm" className="flex items-center gap-2" variant={"outline"}>
                            <Edit size={14} /> Edit
                          </Button>
                        </Link>

                        <Button size="sm" variant={"destructive"} onClick={() => openDeleteDialog(p)} aria-label={`Delete ${p.name}`}>
                          <Trash size={14} />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant={"ghost"} className="ml-1">
                              <MoreHorizontal size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Duplicate action not implemented")}>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(p)}>Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="space-y-2">
                        <p className="font-medium">No products found</p>
                        <p className="text-sm text-muted-foreground">Try changing your search or add a new product.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button onClick={prevPage} disabled={page === 1} size="sm" variant={"ghost"}>
                Previous
              </Button>
              <Button onClick={nextPage} disabled={page === totalPages} size="sm" variant={"ghost"}>
                Next
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">Showing {paginated.length} of {filtered.length} items</div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={(val) => setConfirmOpen(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{toDelete?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant={"ghost"} onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
