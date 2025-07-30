import Heading from "@/components/UI/Heading"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading>Producto no encontrado</Heading>
      <p>
        Tal vez quieras volver a{" "}
        <Link href={"/admin/products?page=1"} className="text-green-400">
          Productos
        </Link>
      </p>
    </div>
  )
}
