'use client'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4 lg:px-6">
        <div className="flex-1 pr-14 lg:pr-0">
          <h2 className="text-lg font-semibold text-gray-800">SNAP Admin Panel</h2>
        </div>
      </div>
    </header>
  )
}
