# Secure File Transfer System (MERN + AWS S3 + Encryption)

## 📌 Project Overview
The **Secure File Transfer System** is a web application that allows users to securely upload, share, and manage files with encryption. It leverages **AES-256** for file encryption, **RSA** for key management, and **AWS S3** for cloud storage.

## 🛠️ Tech Stack
### **Frontend:**
- React.js (JSX)
- Tailwind CSS
- React Router
- Axios

### **Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- AWS S3 for file storage
- Multer for file uploads
- dotenv for environment variables

### **Security Features:**
- AES-256 for file encryption
- RSA for key exchange
- Multi-Factor Authentication (MFA)
- Role-Based Access Control (RBAC)
- HTTPS & HSTS
- Input validation to prevent XSS & SQL Injection

---
### Screenshots: 


## 🚀 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/secure-file-transfer-system.git
cd secure-file-transfer-system
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
```

#### **Create a `.env` file in `backend/`**
```env
MONGO_URI=mongodb+srv://your-mongo-url
PORT=5000
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
```

#### **Run the backend**
```sh
npm run dev
```

### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install
npm run dev
```

---

## 📌 Features
✅ **User Authentication** (JWT, bcrypt, MFA)  
✅ **File Encryption & Secure Uploads** (AES-256, RSA, AWS S3)  
✅ **Role-Based Access Control (RBAC)**  
✅ **Audit Logging & File Access Tracking**  
✅ **Secure File Sharing with Expiring Links**  

---

## 🔥 API Endpoints
### **Auth Routes**
| Method | Endpoint         | Description         |
|--------|----------------|---------------------|
| POST   | `/api/auth/register` | User Registration |
| POST   | `/api/auth/login`    | User Login        |
| POST   | `/api/auth/enable-mfa` | Enable MFA      |
| POST   | `/api/auth/verify-mfa` | Verify MFA OTP |

### **File Routes**
| Method | Endpoint           | Description         |
|--------|-------------------|---------------------|
| POST   | `/api/files/upload` | Upload a File (Encrypted) |
| GET    | `/api/files/download` | Download a File (Decrypted) |

---

### 🎯 Future Enhancements
- **AI-driven threat detection** 🔥
- **Advanced reporting dashboard** 📊
- **Cross-platform mobile app** 📱

---

### **🙌 Contributing**
Pull requests are welcome! Feel free to open an issue for any feature requests or bug reports. 😃

