import { Cart } from "@/components/cart/cart";
import Header from "@/components/header";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="mt-20">
        <Cart />
      </div>
    </div>
  );
} 