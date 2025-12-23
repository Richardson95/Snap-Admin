'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFilter,
  faEdit,
  faTrash,
  faWallet,
  faEye,
  faUserPlus,
  faBan,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const customers = [
  {
    id: 'CUS-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+234 801 234 5678',
    walletBalance: 15000,
    totalOrders: 45,
    joinDate: '2023-05-15',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=FF3333&color=fff',
  },
  {
    id: 'CUS-002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+234 803 456 7890',
    walletBalance: 8500,
    totalOrders: 32,
    joinDate: '2023-06-20',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=FF3333&color=fff',
  },
  {
    id: 'CUS-003',
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    phone: '+234 805 678 9012',
    walletBalance: 22000,
    totalOrders: 67,
    joinDate: '2023-03-10',
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=FF3333&color=fff',
  },
  {
    id: 'CUS-004',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '+234 806 789 0123',
    walletBalance: 500,
    totalOrders: 12,
    joinDate: '2023-08-05',
    status: 'Suspended',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=FF3333&color=fff',
  },
]

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showFundModal, setShowFundModal] = useState(false)
  const [fundAmount, setFundAmount] = useState('')
  const [customerList, setCustomerList] = useState(customers)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState<any>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCustomerData, setNewCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const filteredCustomers = customerList.filter((customer) => {
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleFundWallet = () => {
    console.log(`Funding ${selectedCustomer?.name} with ₦${fundAmount}`)
    setShowFundModal(false)
    setFundAmount('')
    setSelectedCustomer(null)
  }

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setEditFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    setCustomerList(customerList.map(c =>
      c.id === selectedCustomer.id
        ? { ...c, ...editFormData }
        : c
    ))
    setShowEditModal(false)
    setSelectedCustomer(null)
    setEditFormData({})
  }

  const handleToggleSuspend = (customer: any) => {
    const newStatus = customer.status === 'Active' ? 'Suspended' : 'Active'
    setCustomerList(customerList.map(c =>
      c.id === customer.id
        ? { ...c, status: newStatus }
        : c
    ))
  }

  const handleDeleteCustomer = (customer: any) => {
    setCustomerToDelete(customer)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (customerToDelete) {
      setCustomerList(customerList.filter(c => c.id !== customerToDelete.id))
      setShowDeleteModal(false)
      setCustomerToDelete(null)
    }
  }

  const handleAddCustomer = () => {
    const newCustomer = {
      id: `CUS-${String(customerList.length + 1).padStart(3, '0')}`,
      name: newCustomerData.name,
      email: newCustomerData.email,
      phone: newCustomerData.phone,
      walletBalance: 0,
      totalOrders: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCustomerData.name)}&background=FF3333&color=fff`,
    }
    setCustomerList([...customerList, newCustomer])
    setShowAddModal(false)
    setNewCustomerData({ name: '', email: '', phone: '' })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers Management</h1>
          <p className="text-gray-600 mt-1">Manage customer accounts and wallets</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 w-fit"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Add New Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{customerList.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Active Customers</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {customerList.filter((c) => c.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Suspended</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {customerList.filter((c) => c.status === 'Suspended').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Total Wallet Balance</p>
          <p className="text-2xl font-bold text-primary mt-1">
            ₦{customerList.reduce((sum, c) => sum + c.walletBalance, 0).toLocaleString()}
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
                placeholder="Search by name, email, or customer ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>All</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet Balance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.avatar}
                        alt={customer.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-primary">
                      ₦{customer.walletBalance.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{customer.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{customer.joinDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setShowFundModal(true)
                        }}
                        className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
                        title="Fund Wallet"
                      >
                        <FontAwesomeIcon icon={faWallet} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditCustomer(customer)}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Customer"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleSuspend(customer)}
                        className="text-yellow-600 hover:text-yellow-800 p-2 hover:bg-yellow-50 rounded transition-colors"
                        title={customer.status === 'Active' ? 'Suspend' : 'Activate'}
                      >
                        <FontAwesomeIcon icon={faBan} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                        title="Delete Customer"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Wallet Modal */}
      {showFundModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fund Customer Wallet</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="font-medium text-primary">
                  ₦{selectedCustomer.walletBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Add
                </label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleFundWallet}
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Fund Wallet
                </button>
                <button
                  onClick={() => {
                    setShowFundModal(false)
                    setSelectedCustomer(null)
                    setFundAmount('')
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Customer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedCustomer(null)
                    setEditFormData({})
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && customerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Customer</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete <strong>{customerToDelete.name}</strong>?
              </p>
              <p className="text-sm text-gray-500">
                This action cannot be undone. All customer data and order history will be permanently removed.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Customer
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setCustomerToDelete(null)
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Customer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={newCustomerData.name}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newCustomerData.email}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={newCustomerData.phone}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddCustomer}
                  disabled={!newCustomerData.name || !newCustomerData.email || !newCustomerData.phone}
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Customer
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setNewCustomerData({ name: '', email: '', phone: '' })
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
