import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Product, ShoppingCart } from "./schemas"

interface Store {
  total: number
  contents: ShoppingCart
  addToCart: (product: Product) => void
  updateQuantity: (id: Product["id"], quantity: number) => void
  removeFromCart: (id: Product["id"]) => void
  calculateTotal: () => void
}

export const useStore = create<Store>()(
  devtools((set, get) => {
    // --- Helpers internos ---
    const computeTotal = (cart: ShoppingCart) =>
      cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

    const applyCart = (updatedContents: ShoppingCart) => {
      set({ contents: updatedContents, total: computeTotal(updatedContents) })
    }

    // --- State inicial y acciones ---
    return {
      total: 0,
      contents: [],

      addToCart: (product) => {
        const { id: productId, ...itemData } = product
        const { contents } = get()
        const existingItemIndex = contents.findIndex(
          (item) => item.productId === productId
        )

        let updatedContents: ShoppingCart
        if (existingItemIndex >= 0) {
          const existingItem = contents[existingItemIndex]
          // Si ya llegó al stock máximo, no cambia nada
          if (existingItem.quantity >= existingItem.stock) return

          // Incremento cantidad
          updatedContents = contents.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          // Agrego nuevo ítem
          updatedContents = [
            ...contents,
            {
              ...itemData,
              productId,
              quantity: 1,
            },
          ]
        }

        applyCart(updatedContents)
      },

      updateQuantity: (id, quantity) => {
        const { contents } = get()
        const updatedContents = contents.map((item) =>
          item.productId === id ? { ...item, quantity } : item
        )
        applyCart(updatedContents)
      },

      removeFromCart: (id) => {
        const { contents } = get()
        const updatedContents = contents.filter((item) => item.productId !== id)
        applyCart(updatedContents)
      },

      calculateTotal: () => {
        const { contents } = get()
        set({ total: computeTotal(contents) })
      },
    }
  })
)
