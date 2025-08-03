"use client"

import { updateProduct } from "@/actions/update-product-action"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const updateProductWithId = updateProduct.bind(null, +id)
  const [state, dispatch] = useActionState(updateProductWithId, {
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
          value="Guardar Cambios"
        />
      </div>
    </form>
  )
}
