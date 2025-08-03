import Link from "next/link"
import Logo from "@/components/UI/Logo"

export default function AdminNav() {
  return (
    <header className="bg-primary px-6 py-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />

        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <Link
            href="/admin/products"
            className="text-primary-text hover:text-accent transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-primary-dark"
          >
            Productos
          </Link>

          <Link
            href="/admin/sales"
            className="text-primary-text hover:text-accent transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-primary-dark"
          >
            Ventas
          </Link>

          <Link
            href="/"
            className="bg-accent text-accent-text font-bold py-2 px-6 rounded-lg hover:bg-accent-dark transition-colors duration-300 flex items-center gap-2"
          >
            <span>Tienda</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
