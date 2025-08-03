"use client"

import { useState } from "react"
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api"
import TransactionSummary from "./TransactionSummary"
import { formatCurrency } from "@/src/utils"
import dynamic from "next/dynamic"

const Calendar = dynamic(() => import("react-calendar"), { ssr: false })

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece] // de la doc oficial

export default function TransactionFilter() {
  const [date, setDate] = useState<Value>(new Date())
  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd")

  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  })

  const total =
    data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
      {/* Panel izquierdo: Calendario y total del día */}
      <div className="lg:sticky lg:top-8 bg-white rounded-xl shadow-sm border border-secondary p-6">
        <div className="mb-4">
          <label className="font-serif font-bold text-primary-dark mb-2 block">
            Seleccionar fecha
          </label>

          <div className="max-w-full overflow-hidden">
            <Calendar
              value={date}
              onChange={setDate}
              className="rounded-lg border border-secondary p-2 w-full"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-light rounded-lg">
          <p className="text-lg font-serif font-bold text-primary-dark">
            Total del día:{" "}
            <span className="font-normal">{formatCurrency(total)}</span>
          </p>
        </div>
      </div>

      {/* Panel derecho: Lista de transacciones */}
      <div>
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent"></div>
              <p className="text-lg text-secondary-text">Cargando ventas...</p>
            </div>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-secondary p-8 text-center">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-primary-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-xl font-serif text-primary-dark">
              No hay ventas en esta fecha
            </p>
            <p className="text-secondary-text mt-2">
              Selecciona otra fecha o intenta más tarde
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="space-y-6">
            {data.map((transaction) => (
              <TransactionSummary
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
