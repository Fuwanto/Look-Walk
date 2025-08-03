import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-light p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-secondary p-8 text-center">
        <div className="mb-6">
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-serif font-bold text-primary-dark mb-4">
          Producto no encontrado
        </h1>

        <p className="text-secondary-text mb-6">
          Lo sentimos, no pudimos encontrar el producto que estás buscando.
        </p>

        <Link
          href="/admin/products?page=1"
          className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-text font-serif font-bold py-2 px-6 hover:bg-primary-dark transition-colors duration-300"
        >
          Volver a Productos
        </Link>
      </div>
    </div>
  )
}
