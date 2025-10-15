import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { products as initialProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>(
    initialProducts.map((p) => ({ ...p, stock: 50 }))
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "0",
    rating: "5",
  });

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock.toString(),
      rating: product.rating.toString(),
    });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "Product deleted",
      description: "Product has been removed successfully.",
    });
  };

  const handleSave = () => {
    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                price: formData.price,
                description: formData.description,
                stock: parseInt(formData.stock),
                rating: parseInt(formData.rating),
              }
            : p
        )
      );
      toast({
        title: "Product updated",
        description: "Changes saved successfully.",
      });
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: formData.name,
        price: formData.price,
        description: formData.description,
        stock: parseInt(formData.stock),
        rating: parseInt(formData.rating),
        reviews: 0,
        image: initialProducts[0].image,
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Product added",
        description: "New product created successfully.",
      });
    }
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      price: "",
      description: "",
      stock: "0",
      rating: "5",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      price: "",
      description: "",
      stock: "0",
      rating: "5",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingId) && (
          <div className="bg-card rounded-lg border p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Rating</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-3">{product.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">${product.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          product.stock > 20
                            ? "text-green-600"
                            : product.stock > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.rating}/5</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
