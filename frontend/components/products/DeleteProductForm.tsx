import { Product } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteProductForm({
  productId,
  mobile = false,
}: {
  productId: Product["id"]
  mobile?: boolean
}) {
  const handleDeleteProduct = async () => {
    "use server"
    const url = `${process.env.API_URL}/products/${productId}`
    const req = await fetch(url, {
      method: "DELETE",
    })
    await req.json()
    revalidatePath("/admin/products")
  }
  return (
    <form action={handleDeleteProduct}>
      <button
        type="submit"
        aria-label="Eliminar"
        className={`${
          mobile
            ? "text-red-600 hover:text-red-800 text-sm"
            : "text-red-600 hover:text-red-800"
        } flex items-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={mobile ? "w-4 h-4" : "w-5 h-5"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m5 0H4"
          />
        </svg>
      </button>
    </form>
  )
}
