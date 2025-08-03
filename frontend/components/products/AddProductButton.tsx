"use client"

import { Product } from "@/src/schemas"
import { useStore } from "@/src/store"

export default function AddProductButton({
  product,
  mobile = false,
}: {
  product: Product
  mobile?: boolean
}) {
  const addToCart = useStore((state) => state.addToCart)

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className={`cursor-pointer ${
        mobile
          ? "p-3 bg-accent text-accent-text rounded-full shadow-md"
          : "px-3 py-2 bg-accent text-accent-text rounded-md font-medium hover:bg-primary"
      } flex items-center gap-1 transition-all duration-300`}
      aria-label={`Añadir ${product.name} al carrito`}
    >
      {mobile ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-1.45L17 13M7 13V6a1 1 0 011-1h3m4 0h2a1 1 0 011 1v7"
          />
        </svg>
      ) : (
        <>
          <span className="tracking-wider">Añadir</span>
        </>
      )}
    </button>
  )
}
