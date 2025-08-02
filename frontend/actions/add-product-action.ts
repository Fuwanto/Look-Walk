"use server"

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function addProduct(
  prevState: ActionStateType,
  formData: FormData
) {
  const product = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
  })

  if (!product.success) {
    return {
      errors: product.error.issues.map((isuue) => isuue.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/products`
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product.data),
  })

  const json = await req.json()

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
      success: "",
    }
  }

  revalidatePath("/admin/products")

  return {
    errors: [],
    success: "Producto creado correctamente",
  }
}
