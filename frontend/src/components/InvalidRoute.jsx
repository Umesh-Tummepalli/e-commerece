import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';

const InvalidRoute = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-black"
    >
      <div className="max-w-md w-full text-center">
        {/* Animated icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle className="w-20 h-20 text-yellow-500" strokeWidth={1.5} />
        </motion.div>

        {/* Main text */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          404 - Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg mb-8 text-gray-700"
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Home button with animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-black rounded-lg font-medium transition-all hover:bg-black hover:text-white"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InvalidRoute;