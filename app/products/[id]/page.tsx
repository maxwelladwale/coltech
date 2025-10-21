import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/lib/api/implementations/mock/MockServices"; // import mock data

const ProductDetailPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { id } = router.query; // Get the dynamic id from the URL

  // Find the product based on the id
  const product = mockProducts.find((prod) => prod.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image and Info */}
        <div className="p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 my-4">{product.description}</p>
          <span className="text-xl font-bold">${product.price}</span>
          <div className="mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
