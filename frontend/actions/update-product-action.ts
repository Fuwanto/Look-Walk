"use server"

import {
  ErrorResponseSchema,
  Product,
  ProductFormSchema,
  SuccessResponseSchema,
} from "@/src/schemas"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function updateProduct(
  productId: Product["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const product = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
  })

  if (!product.success) {
    return {
      errors: product.error.issues.map((isuue) => isuue.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/products/${productId}`
  const req = await fetch(url, {
    method: "PUT",
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

  const success = SuccessResponseSchema.parse(json).message

  return {
    errors: [],
    success,
  }
}
