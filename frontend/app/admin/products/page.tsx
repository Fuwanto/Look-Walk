import ProductsTable from "@/components/products/ProductsTable"
import Heading from "@/components/UI/Heading"
import Pagination from "@/components/UI/Pagination"
import { ProductsResponseSchema } from "@/src/schemas"
import { isValidPage } from "@/src/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getProducts(take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`
  const req = await fetch(url)
  const json = await req.json()
  const data = ProductsResponseSchema.parse(json)

  return {
    products: data.products,
    total: data.total,
  }
}

type SearchParams = Promise<{ page: string }>

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { page } = await searchParams
  if (!isValidPage(+page)) redirect("/admin/products?page=1")

  const productsPerPage = 10
  const skip = (+page - 1) * productsPerPage

  const { products, total } = await getProducts(productsPerPage, skip)

  const totalPages = Math.ceil(total / productsPerPage)
  if (+page > totalPages) redirect("/admin/products?page=1")

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <Heading>Administrar productos</Heading>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-accent text-accent-text font-serif font-bold py-2 px-6 hover:bg-primary-dark transition-colors duration-300 text-center"
        >
          Nuevo Producto
        </Link>
      </div>

      <ProductsTable products={products} />

      <Pagination
        page={+page}
        totalPages={totalPages}
        baseUrl="/admin/products"
      />
    </div>
  )
}
