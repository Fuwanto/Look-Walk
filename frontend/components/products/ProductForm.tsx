import { CategoriesResponseSchema, Product } from "@/src/schemas"
import UploadProductImage from "./UploadProductImage"

async function getCategories() {
  const url = `${process.env.API_URL}/categories`
  const req = await fetch(url)
  const json = await req.json()
  const categories = CategoriesResponseSchema.parse(json)

  return categories
}

export default async function ProductForm({ product }: { product?: Product }) {
  const categories = await getCategories()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block font-serif font-bold text-primary-dark mb-2"
          >
            Nombre Producto
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del producto"
            className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            name="name"
            defaultValue={product?.name}
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block font-serif font-bold text-primary-dark mb-2"
          >
            Precio
          </label>
          <input
            id="price"
            type="number"
            placeholder="Precio"
            className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            name="price"
            min={0}
            defaultValue={product?.price}
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block font-serif font-bold text-primary-dark mb-2"
          >
            Stock
          </label>
          <input
            id="stock"
            type="number"
            placeholder="Cantidad disponible"
            className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            name="stock"
            min={0}
            defaultValue={product?.stock}
          />
        </div>

        <div>
          <label
            htmlFor="categoryId"
            className="block font-serif font-bold text-primary-dark mb-2"
          >
            Categoría
          </label>
          <select
            id="categoryId"
            className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white appearance-none"
            name="categoryId"
            defaultValue={product?.categoryId}
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <UploadProductImage currentImage={product?.image} />
      </div>
    </div>
  )
}
