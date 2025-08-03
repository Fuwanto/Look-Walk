import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/UI/Heading"
import Link from "next/link"

export default function NewProductPage() {
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
          <span className="text-primary-dark">Crear</span>{" "}
          <span className="text-accent">Nuevo Producto</span>
        </Heading>

        <div className="mt-8">
          <AddProductForm>
            <ProductForm />
          </AddProductForm>
        </div>
      </div>
    </div>
  )
}
