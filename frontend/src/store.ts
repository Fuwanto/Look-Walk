import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from "./schemas"

interface Store {
  total: number
  discount: number
  contents: ShoppingCart
  coupon: Coupon
  addToCart: (product: Product) => void
  updateQuantity: (id: Product["id"], quantity: number) => void
  removeFromCart: (id: Product["id"]) => void
  applyCoupon: (couponName: string) => Promise<void>
  clearOrder: () => void
}

export const useStore = create<Store>()(
  devtools((set, get) => {
    // --- Helpers internos ---
    const computeTotal = (cart: ShoppingCart) =>
      cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

    const applyCart = (updatedContents: ShoppingCart) => {
      const subtotal = computeTotal(updatedContents)
      const pct = get().coupon.percentage || 0
      const discount = (pct / 100) * subtotal
      const total = subtotal - discount

      set({
        contents: updatedContents,
        total,
        discount,
      })
    }

    const initialState = {
      total: 0,
      discount: 0,
      contents: [],
      coupon: {
        percentage: 0,
        name: "",
        message: "",
      },
    }

    // --- State inicial y acciones ---
    return {
      ...initialState,

      addToCart: (product) => {
        const { id: productId, ...itemData } = product
        const { contents } = get()
        const idx = contents.findIndex((i) => i.productId === productId)

        let updated: ShoppingCart
        if (idx >= 0) {
          const item = contents[idx]
          // Si ya llegó al stock máximo, no hacer nada
          if (item.quantity >= item.stock) return
          updated = contents.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
          )
        } else {
          // Agregar nuevo ítem al carrito
          updated = [
            ...contents,
            {
              ...itemData,
              productId,
              quantity: 1,
            },
          ]
        }

        applyCart(updated)
      },

      updateQuantity: (id, quantity) => {
        const updated = get().contents.map((i) =>
          i.productId === id ? { ...i, quantity } : i
        )
        applyCart(updated)
      },

      removeFromCart: (id) => {
        const updated = get().contents.filter((i) => i.productId !== id)
        applyCart(updated)

        if (!get().contents.length) {
          get().clearOrder()
        }
      },

      applyCoupon: async (couponName) => {
        const res = await fetch("/coupons/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: couponName }),
        })
        const json = await res.json()
        const coupon = CouponResponseSchema.parse(json)

        // Guardar el cupón
        set({ coupon })

        // Reaplicar carrito para recalcular descuento y total
        applyCart(get().contents)
      },

      clearOrder: () => {
        set({ ...initialState })
      },
    }
  })
)
