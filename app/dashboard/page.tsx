'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingBag,
  faUsers,
  faTruck,
  faMoneyBill,
  faArrowUp,
  faArrowDown,
  faEllipsisV,
  faDownload,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const stats = [
  {
    title: 'Total Orders',
    value: '2,845',
    change: '+12.5%',
    isPositive: true,
    icon: faShoppingBag,
    color: 'bg-blue-500',
  },
  {
    title: 'Total Revenue',
    value: '₦8,450,000',
    change: '+23.8%',
    isPositive: true,
    icon: faMoneyBill,
    color: 'bg-green-500',
  },
  {
    title: 'Active Customers',
    value: '1,247',
    change: '+8.2%',
    isPositive: true,
    icon: faUsers,
    color: 'bg-purple-500',
  },
  {
    title: 'Delivery Partners',
    value: '183',
    change: '-2.4%',
    isPositive: false,
    icon: faTruck,
    color: 'bg-primary',
  },
]

const revenueData = [
  { name: 'Jan', revenue: 450000, orders: 234 },
  { name: 'Feb', revenue: 520000, orders: 289 },
  { name: 'Mar', revenue: 680000, orders: 356 },
  { name: 'Apr', revenue: 590000, orders: 312 },
  { name: 'May', revenue: 750000, orders: 401 },
  { name: 'Jun', revenue: 890000, orders: 478 },
]

const orderStatusData = [
  { name: 'Pending', value: 125, color: '#FFA500' },
  { name: 'In Transit', value: 234, color: '#4169E1' },
  { name: 'Delivered', value: 1856, color: '#32CD32' },
  { name: 'Cancelled', value: 89, color: '#FF3333' },
]

const recentOrders = [
  {
    id: 'ORD-2845',
    customer: 'John Doe',
    amount: '₦15,500',
    status: 'Delivered',
    time: '2 mins ago',
  },
  {
    id: 'ORD-2844',
    customer: 'Jane Smith',
    amount: '₦8,200',
    status: 'In Transit',
    time: '15 mins ago',
  },
  {
    id: 'ORD-2843',
    customer: 'Mike Johnson',
    amount: '₦22,000',
    status: 'Pending',
    time: '1 hour ago',
  },
  {
    id: 'ORD-2842',
    customer: 'Sarah Williams',
    amount: '₦12,750',
    status: 'Delivered',
    time: '2 hours ago',
  },
]

export default function Dashboard() {
  const [revenueMenuOpen, setRevenueMenuOpen] = useState(false)
  const [orderMenuOpen, setOrderMenuOpen] = useState(false)

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleExportData = (chartName: string) => {
    // TODO: Implement CSV export with backend API
    setRevenueMenuOpen(false)
    setOrderMenuOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs font-medium uppercase">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-800 mt-1.5">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-1.5">
                  <FontAwesomeIcon
                    icon={stat.isPositive ? faArrowUp : faArrowDown}
                    className={`w-2.5 h-2.5 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      stat.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} w-11 h-11 rounded-lg flex items-center justify-center`}>
                <FontAwesomeIcon icon={stat.icon} className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800">Revenue Overview</h2>
            <div className="relative">
              <button
                onClick={() => setRevenueMenuOpen(!revenueMenuOpen)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faEllipsisV} className="w-4 h-4" />
              </button>
              {revenueMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setRevenueMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-20">
                    <button
                      onClick={() => handleExportData('Revenue Overview')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700 text-sm"
                    >
                      <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
                      Export Data
                    </button>
                    <button
                      onClick={handleRefresh}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700 text-sm"
                    >
                      <FontAwesomeIcon icon={faRefresh} className="w-3.5 h-3.5" />
                      Refresh
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF3333"
                strokeWidth={3}
                dot={{ fill: '#FF3333', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800">Order Status</h2>
            <div className="relative">
              <button
                onClick={() => setOrderMenuOpen(!orderMenuOpen)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faEllipsisV} className="w-4 h-4" />
              </button>
              {orderMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOrderMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-20">
                    <button
                      onClick={() => handleExportData('Order Status')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700 text-sm"
                    >
                      <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
                      Export Data
                    </button>
                    <button
                      onClick={handleRefresh}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700 text-sm"
                    >
                      <FontAwesomeIcon icon={faRefresh} className="w-3.5 h-3.5" />
                      Refresh
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{order.customer}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
