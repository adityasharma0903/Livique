import ProductCard from "./ProductCard";
import { products } from "@/data/products";

// 1. Accept the searchTerm prop from Index.jsx
const ProductGrid = ({ searchTerm }) => {
  
  // 2. Filter the products array
  const filteredProducts = products.filter((product) => {
    // The searchTerm is already lowercased in Index.jsx,
    // so we just need to lowercase the product name for comparison.
    return product.name.toLowerCase().includes(searchTerm);
  });

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ear rings For You!</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          {/* 3. Render the filtered list of products */}
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}

          {/* Optional: Show a message if no products match the search */}
          {filteredProducts.length === 0 && searchTerm && (
            <div className="col-span-full text-center py-10 text-gray-500">
                No products found matching "{searchTerm}".
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductGrid;