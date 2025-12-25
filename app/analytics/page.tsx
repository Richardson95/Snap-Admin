'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatCurrency, formatNumber } from '@/utils/formatters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faDownload,
  faChartLine,
  faShoppingBag,
  faUsers,
  faTruck,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

const monthlyData = [
  { month: 'Jan', revenue: 450000, orders: 234, customers: 180 },
  { month: 'Feb', revenue: 520000, orders: 289, customers: 215 },
  { month: 'Mar', revenue: 680000, orders: 356, customers: 278 },
  { month: 'Apr', revenue: 590000, orders: 312, customers: 245 },
  { month: 'May', revenue: 750000, orders: 401, customers: 312 },
  { month: 'Jun', revenue: 890000, orders: 478, customers: 389 },
  { month: 'Jul', revenue: 820000, orders: 445, customers: 356 },
  { month: 'Aug', revenue: 950000, orders: 512, customers: 423 },
]

const categoryData = [
  { name: 'Food Delivery', value: 35, color: '#FF3333' },
  { name: 'Parcel', value: 28, color: '#4169E1' },
  { name: 'Documents', value: 18, color: '#32CD32' },
  { name: 'Electronics', value: 12, color: '#FFA500' },
  { name: 'Others', value: 7, color: '#9E9E9E' },
]

const performanceData = [
  { day: 'Mon', deliveries: 45, avgTime: 32 },
  { day: 'Tue', deliveries: 52, avgTime: 28 },
  { day: 'Wed', deliveries: 48, avgTime: 30 },
  { day: 'Thu', deliveries: 61, avgTime: 25 },
  { day: 'Fri', deliveries: 55, avgTime: 27 },
  { day: 'Sat', deliveries: 70, avgTime: 35 },
  { day: 'Sun', deliveries: 38, avgTime: 40 },
]

const topRoutes = [
  { route: 'Ikeja → VI', orders: 156, revenue: 780000 },
  { route: 'Lekki → Ikeja', orders: 134, revenue: 670000 },
  { route: 'VI → Lekki', orders: 128, revenue: 640000 },
  { route: 'Surulere → Ikeja', orders: 98, revenue: 490000 },
  { route: 'Yaba → VI', orders: 87, revenue: 435000 },
]

export default function Analytics() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState('30days')

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </button>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Detailed insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
            <FontAwesomeIcon icon={faDownload} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-2">{formatCurrency(5650000)}</h3>
              <p className="text-blue-100 text-sm mt-2">+18.2% from last period</p>
            </div>
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Orders</p>
              <h3 className="text-3xl font-bold mt-2">{formatNumber(3021)}</h3>
              <p className="text-green-100 text-sm mt-2">+12.5% from last period</p>
            </div>
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faShoppingBag} className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">New Customers</p>
              <h3 className="text-3xl font-bold mt-2">{formatNumber(856)}</h3>
              <p className="text-purple-100 text-sm mt-2">+24.3% from last period</p>
            </div>
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Avg. Delivery Time</p>
              <h3 className="text-3xl font-bold mt-2">28 min</h3>
              <p className="text-red-100 text-sm mt-2">-5.2% from last period</p>
            </div>
            <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faTruck} className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Orders Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue & Orders Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF3333" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF3333" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip
              formatter={(value: any, name: any) => {
                if (name === 'revenue') return [formatCurrency(value), 'Revenue']
                if (name === 'orders') return [formatNumber(value), 'Orders']
                if (name === 'customers') return [formatNumber(value), 'Customers']
                return [value, name]
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF3333"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                formatter={(value: any, name: any) => {
                  if (name === 'deliveries') return [formatNumber(value), 'Deliveries']
                  if (name === 'avgTime') return [value + ' min', 'Avg Time']
                  return [value, name]
                }}
              />
              <Legend />
              <Bar dataKey="deliveries" fill="#FF3333" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Routes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Top Delivery Routes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Revenue/Order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topRoutes.map((route, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{route.route}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatNumber(route.orders)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-primary">
                      {formatCurrency(route.revenue)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {formatCurrency(Math.round(route.revenue / route.orders))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
