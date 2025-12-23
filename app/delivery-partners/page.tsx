'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFilter,
  faEdit,
  faTrash,
  faStar,
  faMotorcycle,
  faTruck,
  faBicycle,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const deliveryPartners = [
  {
    id: 'DRV-001',
    name: 'Mike Wilson',
    email: 'mike.w@snap.com',
    phone: '+234 802 345 6789',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'ABC 123 XY',
    rating: 4.8,
    totalDeliveries: 245,
    activeDeliveries: 3,
    earnings: 450000,
    status: 'Active',
    joinDate: '2023-04-10',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=FF3333&color=fff',
  },
  {
    id: 'DRV-002',
    name: 'David Brown',
    email: 'david.b@snap.com',
    phone: '+234 804 567 8901',
    vehicleType: 'Bike',
    vehicleNumber: 'XYZ 456 AB',
    rating: 4.5,
    totalDeliveries: 189,
    activeDeliveries: 2,
    earnings: 320000,
    status: 'Active',
    joinDate: '2023-05-22',
    avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=FF3333&color=fff',
  },
  {
    id: 'DRV-003',
    name: 'Sarah Adams',
    email: 'sarah.a@snap.com',
    phone: '+234 806 789 0123',
    vehicleType: 'Van',
    vehicleNumber: 'DEF 789 CD',
    rating: 4.9,
    totalDeliveries: 312,
    activeDeliveries: 5,
    earnings: 580000,
    status: 'Active',
    joinDate: '2023-02-15',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Adams&background=FF3333&color=fff',
  },
  {
    id: 'DRV-004',
    name: 'James Lee',
    email: 'james.l@snap.com',
    phone: '+234 808 901 2345',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'GHI 012 EF',
    rating: 3.8,
    totalDeliveries: 67,
    activeDeliveries: 0,
    earnings: 125000,
    status: 'Inactive',
    joinDate: '2023-09-01',
    avatar: 'https://ui-avatars.com/api/?name=James+Lee&background=FF3333&color=fff',
  },
]

export default function DeliveryPartners() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [partnerList, setPartnerList] = useState(deliveryPartners)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<any>(null)
  const [partnerToDelete, setPartnerToDelete] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'Motorcycle',
    vehicleNumber: '',
  })

  const filteredPartners = partnerList.filter((partner) => {
    const matchesStatus = filterStatus === 'All' || partner.status === filterStatus
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'Motorcycle':
        return faMotorcycle
      case 'Van':
        return faTruck
      case 'Bike':
        return faBicycle
      default:
        return faMotorcycle
    }
  }

  const handleAddPartner = () => {
    const newPartner = {
      id: `DRV-${String(partnerList.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicleType: formData.vehicleType,
      vehicleNumber: formData.vehicleNumber,
      rating: 0,
      totalDeliveries: 0,
      activeDeliveries: 0,
      earnings: 0,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=FF3333&color=fff`,
    }
    setPartnerList([...partnerList, newPartner])
    setShowAddModal(false)
    setFormData({ name: '', email: '', phone: '', vehicleType: 'Motorcycle', vehicleNumber: '' })
  }

  const handleEditPartner = (partner: any) => {
    setSelectedPartner(partner)
    setFormData({
      name: partner.name,
      email: partner.email,
      phone: partner.phone,
      vehicleType: partner.vehicleType,
      vehicleNumber: partner.vehicleNumber,
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    setPartnerList(partnerList.map(p =>
      p.id === selectedPartner.id
        ? { ...p, ...formData }
        : p
    ))
    setShowEditModal(false)
    setSelectedPartner(null)
    setFormData({ name: '', email: '', phone: '', vehicleType: 'Motorcycle', vehicleNumber: '' })
  }

  const handleToggleStatus = (partner: any) => {
    const newStatus = partner.status === 'Active' ? 'Inactive' : 'Active'
    setPartnerList(partnerList.map(p =>
      p.id === partner.id
        ? { ...p, status: newStatus }
        : p
    ))
  }

  const handleDeletePartner = (partner: any) => {
    setPartnerToDelete(partner)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (partnerToDelete) {
      setPartnerList(partnerList.filter(p => p.id !== partnerToDelete.id))
      setShowDeleteModal(false)
      setPartnerToDelete(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Delivery Partners</h1>
          <p className="text-gray-600 mt-1">Manage delivery partners and their performance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 w-fit"
        >
          <FontAwesomeIcon icon={faMotorcycle} />
          Add New Partner
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Total Partners</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{partnerList.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Active Partners</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {partnerList.filter((p) => p.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Active Deliveries</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {partnerList.reduce((sum, p) => sum + p.activeDeliveries, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Total Earnings</p>
          <p className="text-2xl font-bold text-primary mt-1">
            ₦{partnerList.reduce((sum, p) => sum + p.earnings, 0).toLocaleString()}
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
                placeholder="Search by name, email, or partner ID..."
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
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={partner.avatar}
                  alt={partner.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{partner.name}</h3>
                  <p className="text-sm text-gray-500">{partner.id}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">{partner.rating}</span>
                    <span className="text-xs text-gray-500">({partner.totalDeliveries} deliveries)</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  partner.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {partner.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={getVehicleIcon(partner.vehicleType)} className="text-primary w-4 h-4" />
                <span className="text-gray-700">{partner.vehicleType} - {partner.vehicleNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Active Deliveries</p>
                  <p className="text-lg font-bold text-gray-800">{partner.activeDeliveries}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Earnings</p>
                  <p className="text-lg font-bold text-primary">₦{partner.earnings.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-700">{partner.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Join Date</p>
                  <p className="text-sm text-gray-700">{partner.joinDate}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEditPartner(partner)}
                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleToggleStatus(partner)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                {partner.status === 'Active' ? (
                  <>
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Activate
                  </>
                )}
              </button>
              <button
                onClick={() => handleDeletePartner(partner)}
                className="px-4 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Partner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter partner name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type *
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Bike">Bike</option>
                  <option value="Van">Van</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  placeholder="Enter vehicle number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddPartner}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.vehicleNumber}
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Partner
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setFormData({ name: '', email: '', phone: '', vehicleType: 'Motorcycle', vehicleNumber: '' })
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

      {/* Edit Partner Modal */}
      {showEditModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Partner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Bike">Bike</option>
                  <option value="Van">Van</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
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
                    setSelectedPartner(null)
                    setFormData({ name: '', email: '', phone: '', vehicleType: 'Motorcycle', vehicleNumber: '' })
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
      {showDeleteModal && partnerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Partner</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete <strong>{partnerToDelete.name}</strong>?
              </p>
              <p className="text-sm text-gray-500">
                This action cannot be undone. All partner data and delivery history will be permanently removed.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Partner
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setPartnerToDelete(null)
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
