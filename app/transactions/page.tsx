'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatCurrency } from '@/utils/formatters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFilter,
  faDownload,
  faArrowUp,
  faArrowDown,
  faWallet,
  faCreditCard,
  faMoneyBill,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

const transactions = [
  {
    id: 'TXN-8945',
    type: 'Payment',
    customer: 'John Doe',
    amount: 15500,
    method: 'Wallet',
    status: 'Completed',
    date: '2024-01-15 14:23',
    orderId: 'ORD-2845',
  },
  {
    id: 'TXN-8944',
    type: 'Refund',
    customer: 'Jane Smith',
    amount: 8200,
    method: 'Card',
    status: 'Completed',
    date: '2024-01-15 13:45',
    orderId: 'ORD-2844',
  },
  {
    id: 'TXN-8943',
    type: 'Wallet Funding',
    customer: 'Mike Johnson',
    amount: 50000,
    method: 'Bank Transfer',
    status: 'Pending',
    date: '2024-01-15 12:30',
    orderId: '-',
  },
  {
    id: 'TXN-8942',
    type: 'Payment',
    customer: 'Sarah Williams',
    amount: 22000,
    method: 'Cash',
    status: 'Completed',
    date: '2024-01-15 11:15',
    orderId: 'ORD-2843',
  },
  {
    id: 'TXN-8941',
    type: 'Wallet Funding',
    customer: 'David Lee',
    amount: 100000,
    method: 'Card',
    status: 'Completed',
    date: '2024-01-15 10:00',
    orderId: '-',
  },
  {
    id: 'TXN-8940',
    type: 'Payment',
    customer: 'Emma Wilson',
    amount: 12500,
    method: 'Wallet',
    status: 'Failed',
    date: '2024-01-15 09:30',
    orderId: 'ORD-2842',
  },
]

export default function Transactions() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredTransactions = transactions.filter((txn) => {
    const matchesType = filterType === 'All' || txn.type === filterType
    const matchesStatus = filterStatus === 'All' || txn.status === filterStatus
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    if (type === 'Refund') return faArrowDown
    if (type === 'Wallet Funding') return faWallet
    return faArrowUp
  }

  const getMethodIcon = (method: string) => {
    if (method === 'Cash') return faMoneyBill
    if (method === 'Card' || method === 'Bank Transfer') return faCreditCard
    return faWallet
  }

  const totalCompleted = transactions
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalPending = transactions
    .filter((t) => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0)

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
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-600 mt-1">Monitor all financial transactions</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 w-fit">
          <FontAwesomeIcon icon={faDownload} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {formatCurrency(totalCompleted)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {formatCurrency(totalPending)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Failed Transactions</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {transactions.filter((t) => t.status === 'Failed').length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <input
                type="text"
                placeholder="Search by transaction ID, customer, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>All</option>
              <option>Payment</option>
              <option>Refund</option>
              <option>Wallet Funding</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{txn.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={getTypeIcon(txn.type)}
                        className={`w-4 h-4 ${
                          txn.type === 'Refund' ? 'text-red-500' : 'text-green-500'
                        }`}
                      />
                      <span className="text-sm text-gray-900">{txn.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{txn.customer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        txn.type === 'Refund' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {txn.type === 'Refund' ? '-' : '+'}{formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={getMethodIcon(txn.method)} className="text-gray-400 w-4 h-4" />
                      <span className="text-sm text-gray-900">{txn.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{txn.orderId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        txn.status
                      )}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
