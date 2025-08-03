import { formatCurrency } from "@/src/utils"

interface AmountProps {
  label: string
  amount: number
  discount?: boolean
  total?: boolean
}

export default function Amount({
  label,
  amount,
  discount,
  total,
}: AmountProps) {
  return (
    <div
      className={`flex justify-between ${
        total ? "pt-3 border-t border-secondary" : ""
      }`}
    >
      <dt
        className={`${discount ? "text-accent" : "text-secondary-text"} ${
          total ? "font-bold text-primary-dark" : ""
        }`}
      >
        {label}
      </dt>
      <dd
        className={`${discount ? "text-accent" : "text-primary-dark"} ${
          total ? "font-bold" : ""
        }`}
      >
        {discount && "-"} {formatCurrency(amount)}
      </dd>
    </div>
  )
}
