import { submitOrder } from "@/actions/submit-order-action"
import { useActionState, useEffect } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {
  const total = useStore((state) => state.total)
  const coupon = useStore((state) => state.coupon.name)
  const contents = useStore((state) => state.contents)
  const clearOrder = useStore((state) => state.clearOrder)
  const order = {
    total,
    coupon,
    contents,
  }

  const submitOrderWithDate = submitOrder.bind(null, order)
  const [state, dispatch] = useActionState(submitOrderWithDate, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error))
    }
    if (state.success) {
      toast.success(state.success)
      clearOrder()
    }
  }, [state])

  return (
    <form action={dispatch} className="mt-6">
      <button
        type="submit"
        className="w-full bg-primary text-primary-text font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <span>Confirmar Compra</span>
      </button>
    </form>
  )
}
