import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductGrid = () => {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Headphones For You!</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}











        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
