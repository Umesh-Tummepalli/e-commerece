
# 🛍️ Full-Stack E-Commerce Application

A modern, responsive full-stack E-Commerce web application built with **React**, **Express**, **MongoDB**, and **Cloudinary**, featuring complete **user** and **admin** panels.

## ✨ Features

### 👤 User Panel
- 🔐 User Authentication (JWT + Bcrypt)
- 🛒 Shopping Cart functionality
- 🔎 Product Search
- 🧰 Product Filtering (by category, etc.)
- 🔃 Product Sorting (Price: Low to High / High to Low)
- 📱 Fully Responsive UI

### 🛠️ Admin Panel
- 👤 Admin Authentication
- 📦 Upload new products (with images via Multer + Cloudinary)
- ❌ Delete existing products
- ❓ View user-submitted queries on a dedicated Query Page

---

## 🗂️ Project Structure

```

e-commerce-app/
│
├── frontend/         # React-based frontend
│   └── ...           # All client-side code
│
├── backend/          # Express-based backend
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Route handlers
│   └── ...           # Middleware, config, etc.

````

---

## 🧰 Tech Stack

### Frontend
- **React**
- **React Router**
- **Axios**
- **Context API**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for secure authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Cloudinary** for image storage

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or MongoDB Atlas)

### Clone the Repo

```bash
git clone https://github.com/your-username/e-commerce-app.git
cd e-commerce-app
````

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### Setup Environment Variables

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD="123456"
```

### Run the App

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd frontend
npm start
```

---

## 📷 Image Handling

* File uploads are handled using **Multer**
* Uploaded images are stored in **Cloudinary**

---

## 🛡️ Authentication

* **JWT tokens** are used for session management.
* **Bcrypt** is used for secure password storage and comparison.

---

## 📩 Query Page

* Users can submit queries via the UI.
* Admin can view these on a dedicated dashboard page.

---

## 📌 To Do / Future Improvements

* ✅ Pagination
* ✅ Product Reviews & Ratings
* ⏳ Payment Gateway Integration (e.g., Stripe, Razorpay)
* ⏳ Email Notifications

---

## 🤝 Contributions

Feel free to fork this repo and submit pull requests! Feedback and improvements are always welcome.

---


## 👨‍💻 Author

**Umesh Tummepalli**
[LinkedIn](https://www.linkedin.com/in/umesh-tummepalli-924362333)
