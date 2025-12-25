'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faShoppingBag,
  faUsers,
  faTruck,
  faWallet,
  faChartLine,
  faCog,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const menuItems = [
  { name: 'Dashboard', icon: faHome, path: '/dashboard' },
  { name: 'Orders', icon: faShoppingBag, path: '/orders' },
  { name: 'Customers', icon: faUsers, path: '/customers' },
  { name: 'Delivery Partners', icon: faTruck, path: '/delivery-partners' },
  { name: 'Transactions', icon: faWallet, path: '/transactions' },
  { name: 'Analytics', icon: faChartLine, path: '/analytics' },
  { name: 'Settings', icon: faCog, path: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-3 right-4 z-50 bg-primary text-white p-2.5 rounded-lg shadow-lg"
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-dark text-white
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-dark-lighter">
            <h1 className="text-2xl font-bold text-primary">SNAP</h1>
            <p className="text-sm text-gray-dark mt-1">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${
                          isActive
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-dark hover:bg-dark-lighter hover:text-white'
                        }
                      `}
                    >
                      <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Admin Info */}
          <div className="p-4 border-t border-dark-lighter">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-dark">admin@snap.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
