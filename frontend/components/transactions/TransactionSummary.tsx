import { Transaction } from "@/src/schemas"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"

export default function TransactionSummary({
  transaction,
}: {
  transaction: Transaction
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary overflow-hidden">
      {/* Encabezado de la transacción */}
      <div className="bg-primary text-primary-text p-4 flex justify-between items-center">
        <div>
          <p className="font-mono text-sm opacity-80">ID: {transaction.id}</p>
        </div>
        <div className="bg-accent rounded-full px-3 py-1 text-sm font-bold">
          {formatCurrency(+transaction.total)}
        </div>
      </div>

      {/* Lista de productos */}
      <ul className="divide-y divide-secondary">
        {transaction.contents.map((item) => (
          <li key={item.id} className="p-4">
            <div className="flex gap-4">
              {/* Imagen del producto */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={getImagePath(item.product.image)}
                  alt={`Imagen de producto ${item.product.name}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Detalles del producto */}
              <div className="flex-1">
                <h3 className="font-serif font-bold text-lg text-primary-dark">
                  {item.product.name}
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-secondary-text">
                      Precio unitario
                    </p>
                    <p className="font-medium text-primary-dark">
                      {formatCurrency(+item.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-text">Cantidad</p>
                    <p className="font-medium text-primary-dark">
                      {item.quantity}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-secondary-text">Subtotal</p>
                    <p className="font-medium text-primary-dark">
                      {formatCurrency(+item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Cupones y descuentos */}
      {transaction.coupon && transaction.discount && (
        <div className="p-4 border-t border-secondary">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-secondary-text">Cupón utilizado</p>
              <p className="font-medium text-primary-dark">
                {transaction.coupon}
              </p>
            </div>
            <div>
              <p className="text-sm text-secondary-text">Descuento</p>
              <p className="font-medium text-red-600">
                -{formatCurrency(+transaction.discount)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
