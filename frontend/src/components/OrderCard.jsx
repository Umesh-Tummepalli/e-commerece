import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { 
  Package, 
  Calendar, 
  CreditCard, 
  Truck, 
  MapPin,
  User
} from 'lucide-react'

const OrderCard = ({ order, product, showCustomerInfo = false }) => {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {product && (
            <Link to={`/product/${product._id}`} className="w-full sm:w-40 h-40 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={product?.images?.[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Link>
          )}
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                {product ? (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                    <p className="text-lg font-medium text-gray-800 mt-1">${product.price.toFixed(2)}</p>
                  </>
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900">Product ID: {order.prodId}</h2>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'delivered' 
                  ? 'bg-green-100 text-green-800' 
                  : order.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Package className="h-5 w-5 mr-2" />
                <span>Qty: {order.quantity}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CreditCard className="h-5 w-5 mr-2" />
                <span>{order.paymentMode}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Truck className="h-5 w-5 mr-2" />
                <span>Size: {order.prodSize}</span>
              </div>
            </div>

            {showCustomerInfo && order.user && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="flex items-center text-md font-medium text-gray-900 mb-2">
                  <User className="h-5 w-5 mr-2 text-gray-700" />
                  Customer
                </h3>
                <div className="text-gray-700">
                  <p className="font-medium">{order.user.name || `${order.user.firstName} ${order.user.lastName}`}</p>
                  <p>{order.user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">User ID: {order.user._id}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="flex items-center text-lg font-medium text-gray-900 mb-3">
            <MapPin className="h-5 w-5 mr-2 text-gray-700" />
            Delivery Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.city}, {order.address.state}</p>
              <p>{order.address.zipCode}</p>
            </div>
            <div>
              <p>Phone: {order.address.phone}</p>
              <p className="text-sm text-gray-500 mt-2">Order ID: {order._id}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderCard