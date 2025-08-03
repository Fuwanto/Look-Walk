import ProductCard from "@/components/products/ProductCard"
import { CategoryWithProductsResponseSchema } from "@/src/schemas"
import { redirect } from "next/navigation"

type Params = Promise<{ categoryId: string }>

async function getProducts(categoryId: string) {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
  const req = await fetch(url, {
    next: {
      tags: ["products-by-category"],
    },
  })
  const json = await req.json()
  if (!req.ok) {
    redirect("/404")
  }
  return CategoryWithProductsResponseSchema.parse(json)
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params
  const category = await getProducts(categoryId)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark tracking-tight mb-3">
          {category.name}
        </h1>
        <p className="text-secondary-text max-w-2xl mx-auto">
          Descubre nuestra colección exclusiva inspirada en las últimas
          tendencias de la pasarela
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
