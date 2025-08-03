import Link from "next/link"

type PaginationProps = {
  page: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({
  page,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex justify-center py-10">
      <div className="flex items-center space-x-1">
        {page > 1 && (
          <Link
            href={`${baseUrl}?page=${page - 1}`}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary text-primary-dark hover:bg-primary-light transition-colors"
          >
            &laquo;
          </Link>
        )}

        {pages.map((currentPage) => (
          <Link
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              page === currentPage
                ? "bg-primary text-primary-text border-primary"
                : "border-secondary text-primary-dark hover:bg-primary-light"
            } transition-colors`}
            key={currentPage}
            href={`${baseUrl}?page=${currentPage}`}
          >
            {currentPage}
          </Link>
        ))}

        {page < totalPages && (
          <Link
            href={`${baseUrl}?page=${page + 1}`}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary text-primary-dark hover:bg-primary-light transition-colors"
          >
            &raquo;
          </Link>
        )}
      </div>
    </nav>
  )
}
