"use client"

import { addProduct } from "@/actions/add-product-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [state, dispatch] = useActionState(addProduct, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error))
    }
    if (state.success) {
      toast.success(state.success)
      router.push("/admin/products")
    }
  }, [state])

  return (
    <form action={dispatch} className="space-y-8">
      {children}
      <div className="flex justify-end">
        <input
          type="submit"
          className="rounded-md bg-accent text-accent-text font-serif font-bold py-3 px-8 cursor-pointer hover:bg-primary-dark transition-colors duration-300"
          value="Agregar Producto"
        />
      </div>
    </form>
  )
}
