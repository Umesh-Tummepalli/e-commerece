import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, LoaderCircle } from "lucide-react";

// --- Custom Hook for Form Management ---
// This hook encapsulates form state, validation, and submission logic.
const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e, callback) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      callback(formData);
      setIsSubmitting(false);
    }
  }, [formData, validate]);

  return { formData, errors, isSubmitting, handleChange, handleSubmit };
};

// --- Reusable Input Field Component ---
const InputField = ({ id, label, type, name, value, onChange, error, icon, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-500 mb-2">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 border transition-all
          ${error ? "border-red-500 ring-1 ring-red-500" : "border-gray-100"}
          focus:outline-none focus:ring-2 focus:ring-black`}
        placeholder={placeholder}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mt-2 text-xs text-red-600"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// --- Login Form Component ---
const LoginForm = ({ onSubmit, onChange, formData, errors, isSubmitting }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-bold mb-2 text-black">Welcome Back!</h2>
    <p className="text-gray-500 mb-6">Please enter your details to sign in.</p>
    <form onSubmit={onSubmit} noValidate>
      <InputField
        id="login-email"
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        icon={<Mail size={20} />}
        placeholder="your@email.com"
      />
      <InputField
        id="login-password"
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        error={errors.password}
        icon={<Lock size={20} />}
        placeholder="••••••••"
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-50 shadow-md"
        disabled={isSubmitting}
      >
        Sign In
      </button>
    </form>
  </motion.div>
);

// --- Registration Form Component ---
const RegisterForm = ({ onSubmit, onChange, formData, errors, isSubmitting }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-2xl font-bold mb-2 text-black">Create an Account</h2>
    <p className="text-gray-500 mb-6">Let's get you started!</p>
    <form onSubmit={onSubmit} noValidate>
      <InputField
        id="register-name"
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        error={errors.name}
        icon={<User size={20} />}
        placeholder="John Doe"
      />
      <InputField
        id="register-email"
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        icon={<Mail size={20} />}
        placeholder="your@email.com"
      />
      <InputField
        id="register-password"
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        error={errors.password}
        icon={<Lock size={20} />}
        placeholder="Minimum 8 characters"
      />
      <InputField
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        icon={<Lock size={20} />}
        placeholder="••••••••"
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-50 shadow-md mt-2"
        disabled={isSubmitting}
      >
        Create Account
      </button>
    </form>
  </motion.div>
);

// --- Main Auth Component ---
const AuthForms = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  // --- Login Form Logic ---
  const validateLogin = (data) => {
    const errors = {};
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Please enter a valid email address";
    if (!data.password) errors.password = "Password is required";
    return errors;
  };
  





// --- Login Form Logic ---


  const handleLoginSubmitCallback = (data) => {
    console.log("Login data:", data);
    
  };

  const loginForm = useForm({ email: "", password: "" }, validateLogin);
  


    
  // --- Register Form Logic ---
  const validateRegister = (data) => {
    const errors = {};
    if (data.name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Please enter a valid email address";
    if (data.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };
  const handleRegisterSubmitCallback = (data) => {
    console.log("Register data:", data);
    // After successful registration, switch to the login view
    setIsLoginView(true);
  };
  

  const registerForm = useForm({ name: "", email: "", password: "", confirmPassword: "" }, validateRegister);

  const TABS = [{ id: "login", label: "Sign In" }, { id: "register", label: "Register" }];
  const isSubmitting = loginForm.isSubmitting || registerForm.isSubmitting;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Toggle Buttons */}
          <div className="p-2 bg-gray-100 rounded-t-2xl">
            <div className="relative flex items-center justify-center bg-gray-200 p-1 rounded-full">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setIsLoginView(tab.id === "login")}
                  className={`relative z-10 flex-1 py-2 px-4 text-center text-sm font-medium focus:outline-none transition-colors rounded-full
                    ${(isLoginView && tab.id === 'login') || (!isLoginView && tab.id === 'register') ? "text-white" : "text-black"}`}
                >
                  {tab.label}
                </button>
              ))}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 z-0 h-full w-1/2 bg-black rounded-full"
                style={{
                  left: isLoginView ? "0%" : "50%",
                }}
              />
            </div>
          </div>

          {/* Forms Container */}
          <div className="p-8 relative min-h-[490px]">
            <AnimatePresence>
              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20"
                  aria-live="polite"
                >
                  <div className="text-center">
                    <LoaderCircle className="w-10 h-10 text-black animate-spin mx-auto mb-4" />
                    <p className="text-black font-medium">
                      {isLoginView ? "Signing you in..." : "Creating your account..."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isLoginView ? (
                <LoginForm
                  key="login"
                  onSubmit={(e) => loginForm.handleSubmit(e, handleLoginSubmitCallback)}
                  onChange={loginForm.handleChange}
                  formData={loginForm.formData}
                  errors={loginForm.errors}
                  isSubmitting={loginForm.isSubmitting}
                />
              ) : (
                <RegisterForm
                  key="register"
                  onSubmit={(e) => registerForm.handleSubmit(e, handleRegisterSubmitCallback)}
                  onChange={registerForm.handleChange}
                  formData={registerForm.formData}
                  errors={registerForm.errors}
                  isSubmitting={registerForm.isSubmitting}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// The main App component to render our AuthForms
export default function App() {
  return <AuthForms />;
}
