export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark border-b-2 border-accent pb-2">
      {children}
    </h1>
  )
}
