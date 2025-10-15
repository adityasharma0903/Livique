import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const orderDetails = items
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - $${(
            parseFloat(item.price) * item.quantity
          ).toFixed(2)}`
      )
      .join("%0A");

    const message = `*New Order*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AAddress: ${formData.address}, ${formData.city} ${formData.postalCode}%0A%0A*Order Items:*%0A${orderDetails}%0A%0A*Total: $${getTotalPrice().toFixed(2)}*%0A%0A*Notes:* ${formData.notes || "None"}`;

    // WhatsApp number (replace with your business number)
    const whatsappNumber = "7743062799";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Clear cart and show success
    clearCart();
    toast({
      title: "Order placed!",
      description: "Redirecting to WhatsApp...",
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Order Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Place Order via WhatsApp
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
