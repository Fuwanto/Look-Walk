import { useStore } from "@/src/store"
import { FormEvent } from "react"

export default function CouponForm() {
  const applyCoupon = useStore((state) => state.applyCoupon)
  const coupon = useStore((state) => state.coupon)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const couponName = formData.get("coupon_name")!.toString()
    if (!couponName.length) return
    await applyCoupon(couponName)
  }

  return (
    <div className="border-t border-secondary pt-6">
      <h3 className="font-serif font-bold text-lg text-primary-dark mb-4">
        Canjear Cupón
      </h3>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Ingresa un cupón"
          name="coupon_name"
        />
        <button
          type="submit"
          className="bg-accent text-accent-text font-bold py-3 px-4 rounded-lg hover:bg-accent-dark transition-colors duration-300 whitespace-nowrap"
        >
          Canjear
        </button>
      </form>
      {coupon.message && (
        <p
          className={`mt-3 text-center text-sm font-medium ${
            !coupon.message.endsWith("no existe")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {coupon.message}
        </p>
      )}
    </div>
  )
}
