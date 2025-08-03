import ShoppingCart from "../../components/cart/ShoppingCart"
import MainNav from "../../components/UI/MainNav"
import ToastNotification from "../../components/UI/ToastNotification"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Carrito de compras - Estilo revista de moda */}
        <aside className="lg:w-[420px] xl:w-[480px] lg:min-h-screen lg:overflow-y-auto pt-8 pb-24 px-4 md:px-6 bg-primary-light border-t lg:border-t-0 lg:border-l border-secondary">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold tracking-tight text-primary-dark border-b border-secondary pb-3">
                  Tu Selección
                </h2>
              </div>
              <ShoppingCart />
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 lg:overflow-y-auto pt-8 pb-24 px-4 md:px-8 lg:px-12">
          {children}
        </div>
      </main>

      <ToastNotification />
    </div>
  )
}
