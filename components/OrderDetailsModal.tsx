'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUser,
  faTruck,
  faPhone,
  faEnvelope,
  faHome,
  faClock,
  faMoneyBill,
  faCreditCard,
  faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons'

interface OrderDetailsModalProps {
  order: any
  onClose: () => void
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  const getStatusSteps = () => {
    const steps = ['Order Placed', 'Picked Up', 'In Transit', 'Delivered']
    const currentStep = order.status === 'Pending' ? 0 : order.status === 'In Transit' ? 2 : 3
    return { steps, currentStep }
  }

  const { steps, currentStep } = getStatusSteps()

  const handleUpdateStatus = () => {
    // TODO: Integrate with backend to update order status
  }

  const handleContactCustomer = () => {
    // TODO: Integrate with email/SMS services
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div key={order.id} className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
            <p className="text-gray-600 mt-1">
              {order.id} • {order.trackingNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status Timeline */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      index <= currentStep
                        ? 'bg-primary text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p
                    className={`text-xs mt-2 text-center ${
                      index <= currentStep ? 'text-gray-800 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-full mt-5 absolute ${
                        index < currentStep ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      style={{ top: '20px', left: '50%', zIndex: -1 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Delivery Tracking</h3>
            <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative">
              {/* Static Map Placeholder - Replace with actual live tracking */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faMapMarkedAlt} className="text-primary w-16 h-16" />
                  </div>
                  <p className="text-gray-600 font-medium">Live Tracking Map</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.pickupLocation} → {order.deliveryLocation}
                  </p>
                  <div className="mt-4 px-4 py-2 bg-primary text-white rounded-lg inline-block text-sm">
                    View Full Map
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Partner Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faUser} className="text-primary" />
                <h3 className="font-semibold text-gray-800">Customer Information</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{order.customer.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400 w-4" />
                  <p className="text-sm text-gray-900">{order.customer.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 w-4" />
                  <p className="text-sm text-gray-900">{order.customer.email}</p>
                </div>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faHome} className="text-gray-400 w-4 mt-1" />
                  <p className="text-sm text-gray-900">{order.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Delivery Partner Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faTruck} className="text-primary" />
                <h3 className="font-semibold text-gray-800">Delivery Partner</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{order.deliveryPartner.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400 w-4" />
                  <p className="text-sm text-gray-900">{order.deliveryPartner.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="text-sm text-gray-900">{order.deliveryPartner.vehicle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">₦{item.price.toLocaleString()}</p>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">Delivery Fee</p>
                  <p className="text-gray-900">₦{order.deliveryFee.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">Total Amount</p>
                  <p className="font-bold text-primary text-xl">₦{order.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                <p className="text-sm text-gray-600">Order Date</p>
              </div>
              <p className="font-medium text-gray-900">{order.orderDate}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                <p className="text-sm text-gray-600">Estimated Delivery</p>
              </div>
              <p className="font-medium text-gray-900">{order.estimatedDelivery}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={order.paymentMethod === 'Cash' ? faMoneyBill : faCreditCard} className="text-gray-400" />
                <p className="text-sm text-gray-600">Payment Method</p>
              </div>
              <p className="font-medium text-gray-900">{order.paymentMethod}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleUpdateStatus}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Update Status
            </button>
            <button
              onClick={handleContactCustomer}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Contact Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
