"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";

export function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <div className="relative w-24 h-24">
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                fill
                className="object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{item.product.title}</h3>
              <p className="text-sm text-gray-600">
                ${(
                  item.product.price *
                  (1 - item.product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className="px-3 py-1 text-destructive hover:text-destructive/90 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between items-center mb-8">
          <span className="font-medium">Total Price:</span>
          <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/"
            className="h-10 px-6 flex items-center justify-center border border-border rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => alert("Checkout functionality coming soon!")}
            className="h-10 px-6 flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 