import { Product } from "@/src/schemas"
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils"
import Image from "next/image"
import Link from "next/link"
import DeleteProductForm from "./DeleteProductForm"

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary overflow-hidden">
      {/* Versión escritorio (tabla) */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-secondary">
          <thead className="bg-primary-light">
            <tr>
              <th
                scope="col"
                className="py-4 pl-6 pr-3 text-left font-serif font-bold text-primary-dark text-sm uppercase tracking-wider"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="py-4 px-3 text-left font-serif font-bold text-primary-dark text-sm uppercase tracking-wider"
              >
                Producto
              </th>
              <th
                scope="col"
                className="py-4 px-3 text-left font-serif font-bold text-primary-dark text-sm uppercase tracking-wider"
              >
                Precio
              </th>
              <th
                scope="col"
                className="py-4 px-3 text-left font-serif font-bold text-primary-dark text-sm uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="py-4 px-3 text-right font-serif font-bold text-primary-dark text-sm uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-primary-light/30 transition-colors"
              >
                <td className="py-4 pl-6 pr-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={getImagePath(product.image)}
                      alt={`Imagen de ${product.name}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </td>
                <td className="py-4 px-3 font-medium text-primary-dark">
                  {product.name}
                </td>
                <td className="py-4 px-3 text-primary-dark">
                  {formatCurrency(product.price)}
                </td>
                <td className="py-4 px-3">
                  {isAvailable(product.stock) ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {product.stock} unidades
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Agotados
                    </span>
                  )}
                </td>
                <td className="py-4 px-3 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-accent hover:text-primary-dark"
                    >
                      Editar
                    </Link>
                    <DeleteProductForm productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versión móvil (tarjetas) */}
      <div className="md:hidden space-y-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-secondary rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <Image
                src={getImagePath(product.image)}
                alt={`Imagen de ${product.name}`}
                width={100}
                height={100}
                className="rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-serif font-bold text-primary-dark text-lg">
                  {product.name}
                </h3>
                <p className="text-primary-dark font-medium">
                  {formatCurrency(product.price)}
                </p>
                <div className="mt-2">
                  {isAvailable(product.stock) ? (
                    <span className="text-sm text-green-700">
                      Stock: {product.stock}
                    </span>
                  ) : (
                    <span className="text-sm text-red-700">Agotados</span>
                  )}
                </div>
                <div className="mt-3 flex space-x-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm text-accent hover:text-primary-dark"
                  >
                    Editar
                  </Link>
                  <DeleteProductForm productId={product.id} mobile />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
