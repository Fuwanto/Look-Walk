import AdminNav from "@/components/UI/AdminNav"
import ToastNotification from "@/components/UI/ToastNotification"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light">
      <AdminNav />

      <div className="flex-1 container mx-auto py-8 px-4 md:px-8 lg:py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl mx-auto border border-secondary">
          <div className="p-6 md:p-8 lg:p-10">{children}</div>
        </div>
      </div>

      <ToastNotification />
    </div>
  )
}
