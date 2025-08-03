import TransactionFilter from "@/components/transactions/TransactionFilter"
import Heading from "@/components/UI/Heading"
import { getSalesByDate } from "@/src/api"
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query"
import { format } from "date-fns"

export default async function SalesPage() {
  const queryClient = new QueryClient()

  const today = new Date()
  const formattedDate = format(today, "yyyy-MM-dd")

  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Heading>Ventas</Heading>
        <p className="text-lg text-secondary-text mt-2 max-w-3xl">
          En esta sección podrás ver las ventas, utiliza el calendario para
          filtrar por fechas
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </div>
  )
}
