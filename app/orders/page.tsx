'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFilter,
  faEye,
  faMapMarkerAlt,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import OrderDetailsModal from '@/components/OrderDetailsModal'

const orders = [
  {
    id: 'ORD-2845',
    trackingNumber: 'TRK-89234567',
    customer: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+234 801 234 5678',
      address: '123 Lagos Street, Victoria Island, Lagos',
    },
    deliveryPartner: {
      name: 'Mike Wilson',
      phone: '+234 802 345 6789',
      vehicle: 'Motorcycle - ABC 123 XY',
    },
    items: [
      { name: 'Electronics Package', quantity: 2, price: 7500 },
      { name: 'Documents Envelope', quantity: 1, price: 500 },
    ],
    totalAmount: 15500,
    status: 'In Transit',
    pickupLocation: 'Ikeja, Lagos',
    deliveryLocation: 'Victoria Island, Lagos',
    estimatedDelivery: '2024-01-15 14:30',
    orderDate: '2024-01-15 10:15',
    paymentMethod: 'Wallet',
    deliveryFee: 2500,
  },
  {
    id: 'ORD-2844',
    trackingNumber: 'TRK-89234566',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+234 803 456 7890',
      address: '45 Allen Avenue, Ikeja, Lagos',
    },
    deliveryPartner: {
      name: 'David Brown',
      phone: '+234 804 567 8901',
      vehicle: 'Bike - XYZ 456 AB',
    },
    items: [
      { name: 'Food Delivery', quantity: 3, price: 5700 },
    ],
    totalAmount: 8200,
    status: 'Delivered',
    pickupLocation: 'Lekki Phase 1, Lagos',
    deliveryLocation: 'Ikeja, Lagos',
    estimatedDelivery: '2024-01-15 12:00',
    orderDate: '2024-01-15 09:30',
    paymentMethod: 'Card',
    deliveryFee: 2500,
  },
  {
    id: 'ORD-2843',
    trackingNumber: 'TRK-89234565',
    customer: {
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      phone: '+234 805 678 9012',
      address: '78 Admiralty Way, Lekki, Lagos',
    },
    deliveryPartner: {
      name: 'Sarah Adams',
      phone: '+234 806 789 0123',
      vehicle: 'Van - DEF 789 CD',
    },
    items: [
      { name: 'Furniture Package', quantity: 1, price: 19500 },
    ],
    totalAmount: 22000,
    status: 'Pending',
    pickupLocation: 'Surulere, Lagos',
    deliveryLocation: 'Lekki Phase 2, Lagos',
    estimatedDelivery: '2024-01-15 16:00',
    orderDate: '2024-01-15 08:45',
    paymentMethod: 'Cash',
    deliveryFee: 2500,
  },
]

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all delivery orders</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 w-fit">
          <FontAwesomeIcon icon={faDownload} />
          Export Orders
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <input
                type="text"
                placeholder="Search by order ID, tracking number, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Partner
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.trackingNumber}</div>
                      <div className="text-xs text-gray-400 mt-1">{order.orderDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-xs text-gray-500">{order.customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.deliveryPartner.name}</div>
                      <div className="text-xs text-gray-500">{order.deliveryPartner.vehicle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary w-3 h-3 mt-1" />
                      <div>
                        <div className="text-xs text-gray-900">{order.pickupLocation}</div>
                        <div className="text-xs text-gray-400">↓</div>
                        <div className="text-xs text-gray-900">{order.deliveryLocation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">₦{order.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faEye} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}
