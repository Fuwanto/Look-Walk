import { CartItem } from "@/src/schemas"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import { useStore } from "@/src/store"

export default function ShoppingCartItem({ item }: { item: CartItem }) {
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)

  return (
    <li className="flex items-start py-6 border-b border-secondary">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-secondary">
        <Image
          src={getImagePath(item.image)}
          alt={`Imagen del producto ${item.name}`}
          width={100}
          height={100}
          className="h-full w-full object-cover object-center"
          priority
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <h3 className="font-serif font-medium text-primary-dark">
            {item.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-secondary-text">
            {formatCurrency(item.price)}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center">
            <label
              htmlFor={`quantity-${item.productId}`}
              className="mr-2 text-secondary-text"
            >
              Cantidad:
            </label>
            <select
              id={`quantity-${item.productId}`}
              className="py-1 pl-2 pr-8 rounded border border-secondary focus:ring-2 focus:ring-accent focus:border-transparent"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, +e.target.value)}
            >
              {Array.from({ length: item.stock }, (_, index) => index + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.productId)}
            className="font-medium text-accent hover:text-accent-dark transition-colors duration-200"
          ></button>
        </div>
      </div>
    </li>
  )
}
