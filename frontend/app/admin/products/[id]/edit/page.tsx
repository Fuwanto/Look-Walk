import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/UI/Heading"
import { ProductSchema } from "@/src/schemas"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProduct(id: string) {
  const url = `${process.env.API_URL}/products/${id}`
  const req = await fetch(url)
  const json = await req.json()

  if (!req.ok) notFound()

  const product = ProductSchema.parse(json)

  return product
}

type Params = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params
  const product = await getProduct(id)
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/admin/products?page=1"
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-text font-serif font-bold py-2 px-6 hover:bg-primary-dark transition-colors duration-300"
        >
          Volver al listado
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-secondary p-6 md:p-8">
        <Heading>
          Editar Producto: <span className="text-accent">{product.name}</span>
        </Heading>

        <div className="mt-8">
          <EditProductForm>
            <ProductForm product={product} />
          </EditProductForm>
        </div>
      </div>
    </div>
  )
}
