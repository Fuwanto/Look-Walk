"use client"

import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import CouponForm from "./CouponForm"
import SubmitOrderForm from "./SubmitOrderForm"

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents)
  const total = useStore((state) => state.total)
  const discount = useStore((state) => state.discount)

  return (
    <>
      {contents.length ? (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-serif font-bold text-primary-dark">
              Resumen de Compra
            </h3>
            <p className="text-sm text-secondary-text mt-1">
              Revisa los artículos en tu carrito
            </p>
          </div>

          <ul className="divide-y divide-secondary">
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>

          <div className="mt-8 space-y-4 border-t border-secondary pt-6">
            {discount > 0 && (
              <Amount label="Descuento" amount={discount} discount />
            )}

            <Amount label="Total a pagar" amount={total} total />
          </div>

          <div className="mt-8 space-y-6">
            <CouponForm />
            <SubmitOrderForm />
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="inline-block p-4 rounded-full bg-primary-light mb-5"></div>
          <p className="text-xl text-secondary-text font-serif mb-6">
            Tu carrito está vacío
          </p>
        </div>
      )}
    </>
  )
}
