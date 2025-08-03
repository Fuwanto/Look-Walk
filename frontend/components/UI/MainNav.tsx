import { CategoriesResponseSchema } from "@/src/schemas"
import Logo from "./Logo"
import Link from "next/link"

async function getCategories() {
  const url = `${process.env.API_URL}/categories`
  const req = await fetch(url)
  const json = await req.json()
  return CategoriesResponseSchema.parse(json)
}

export default async function MainNav() {
  const categories = await getCategories()

  return (
    <header className="bg-primary px-4 py-5 md:px-8 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />

        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="text-primary-text hover:text-accent transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-primary-dark"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href={"/admin/sales"}
            className="bg-accent text-accent-text font-bold py-2 px-6 rounded-lg hover:bg-accent-dark transition-colors duration-300 flex items-center gap-2"
          >
            <span>Panel Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
