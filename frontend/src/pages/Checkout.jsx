import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
  HandCoins,
  Loader2,
  CheckCircle,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Checkout = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("address"); // 'address' or 'payment'

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const res = await axios.get("http://localhost:4000/orders/price", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setTotalPrice(res.data.totalPrice);
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || err.message);
        console.log(err?.response?.data?.message || err.message);
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalPrice();
  }, []);

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  const onSubmitAddress = (data) => {
    console.log("Address submitted:", data);
    setActiveTab("payment");
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPayment) return;

    setLoading(true);
    const addressObj = watch();
    try {
      const res = await axios.post(
        `http://localhost:4000/orders/payment/${selectedPayment}`,
        {
          address: addressObj,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/orders");
      }, 3000);
    } catch (err) {
      setError("Payment failed. Please try again.");
      toast.error(err?.response?.data?.message || err.message);
      console.log(err?.response?.data?.message || err.message);
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <HandCoins className="w-5 h-5" />,
    },
    {
      id: "stripe",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
    },
    { id: "razorpay", name: "Razorpay", icon: <Wallet className="w-5 h-5" /> },
  ];

  if (loading && !totalPrice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-black animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-bold text-black mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <div className="text-center p-6 max-w-md">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>
          <p className="text-black font-medium">
            Amount Paid:{" "}
            <span className="font-bold">₹{totalPrice?.toFixed(2)}</span>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          <div
            className={`flex flex-col items-center cursor-pointer ${
              activeTab === "address" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("address")}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                activeTab === "address" ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Address</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              activeTab === "payment" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => activeTab === "payment" && setActiveTab("payment")}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                activeTab === "payment" ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black">Checkout</h2>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-black">
                  ₹{totalPrice?.toFixed(2)}
                </p>
              </div>
            </div>

            {activeTab === "address" ? (
              <form onSubmit={handleSubmit(onSubmitAddress)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city", { required: "City is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      {...register("state", { required: "State is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      {...register("zipCode", {
                        required: "ZIP code is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Please enter a valid 6-digit ZIP code",
                        },
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-black focus:border-black ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-lg font-medium text-white bg-black hover:bg-gray-800 flex items-center justify-center"
                >
                  Continue to Payment
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Select Payment Method
                  </h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? "border-black bg-black/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handlePaymentSelection(method.id)}
                      >
                        <div className="mr-3 text-black">{method.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-black">
                            {method.name}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPayment === method.id
                              ? "border-black bg-black"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPayment === method.id && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("address")}
                    className="flex-1 py-3 px-4 rounded-lg font-medium text-black border border-black hover:bg-gray-50"
                  >
                    Back to Address
                  </motion.button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedPayment || loading}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white ${
                      !selectedPayment
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                    } flex items-center justify-center`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Complete Payment"
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
