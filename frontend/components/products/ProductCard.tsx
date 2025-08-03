import { Product } from "@/src/schemas"
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="relative overflow-hidden aspect-[4/4]">
        <Image
          src={getImagePath(product.image)}
          alt={`Imagen de ${product.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay de revista - Visible solo en hover en desktop */}
        {isAvailable(product.stock) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-5 w-full">
              <AddProductButton product={product} />
            </div>
          </div>
        )}

        {/* Botón siempre visible en móviles */}
        {isAvailable(product.stock) && (
          <div className="absolute bottom-4 right-4 z-10 md:hidden">
            <AddProductButton product={product} mobile />
          </div>
        )}
      </div>

      {/* Indicador de agotado - estilo editorial */}
      {!isAvailable(product.stock) && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-primary-light text-primary-dark py-2 px-4 text-sm font-bold tracking-wider rounded-full shadow-sm">
            AGOTADO
          </span>
        </div>
      )}

      {/* Información del producto con mejor espaciado */}
      <div className="p-6 border-t border-secondary space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-primary-dark tracking-tight mb-1">
            {product.name}
          </h3>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {isAvailable(product.stock) && (
              <p className="text-xs text-secondary-text">
                {product.stock} disponibles
              </p>
            )}
          </div>

          <p className="text-xl font-bold text-accent">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </div>
  )
}
