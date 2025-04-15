
# 💸 Paytm Wallet Clone

A secure and responsive wallet application that enables users to sign up, sign in, and manage their wallet balance. Built with the MERN stack, this project simulates basic Paytm-like functionality including user authentication, balance viewing, and account management.

## 🔗 Live Demo

👉 [Visit the App](https://paytm-frontend-ah2z.onrender.com/)

---

## 🔧 Tech Stack

### 🖥️ Frontend
- ReactJS
- TailwindCSS
- Axios
- React Router DOM

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens)
- bcrypt
- Zod

---

## 🚀 Features

- ✅ User Signup & Login with JWT Authentication
- 🔐 Secure password hashing with bcrypt
- 🧠 Form validation with Zod
- 💼 Wallet balance management
- 🔄 Protected user info endpoint (`/me`)
- 📱 Fully responsive frontend

---

## 📁 Folder Structure

```
paytm-clone/
├── client/        # React frontend
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── server/        # Express backend
│   ├── routes/
│   ├── db.js
│   ├── middleware.js
│   └── config.js
```

---

## 🛠️ Installation

### Clone the Repo

```bash
git clone https://github.com/yourusername/paytm-clone.git
cd paytm-clone
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file or update `config.js` with:

```
JWT_SECRET=your_jwt_secret
MONGODB_URL=your_mongodb_url
```

Start Backend:

```bash
node index.js
```

### Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## 📸 UI Preview

### 🔐 Sign In
![image](https://github.com/user-attachments/assets/c963666d-4c88-4507-aead-3569d8ce5255)

### 📝 Sign Up
![image](https://github.com/user-attachments/assets/00f4409c-d1a1-4645-8515-237568d9406f)


### 📊 Dashboard
![image](https://github.com/user-attachments/assets/608167d2-0cf2-4729-868a-b2432202a62d)


### 💸 Send Money
![image](https://github.com/user-attachments/assets/b17e32bf-23ca-4ef3-b106-ba4f3890a0a4)


---

## 🤝 Contributor

- [Rohit Nunnaguppala](https://github.com/yourusername)

---

## 📝 License

This project is licensed under the MIT License.
