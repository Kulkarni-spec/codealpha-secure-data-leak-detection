# # 🔐 CodeAlpha - Detecting Data Leaks Using SQL Injection

## Overview

This project is a cloud-based backend system designed to prevent SQL injection attacks and secure user data. It implements multiple layers of security including encryption, capability-based authentication, and attack detection.

---

## 🔒 Features

* SQL Injection Prevention using Prepared Statements
* AES-256 Encryption for secure password storage
* Capability-Based Authentication (extra security layer)
* SQL Injection Detection and Logging
* Cloud Deployment (Render + Railway MySQL)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL (Railway Cloud DB)
* Crypto (AES-256 encryption)
* Render (Deployment)

---

## 🌐 Live API

**Base URL:**
https://sql-injection-secure-app.onrender.com

---

## API Endpoints

### 🔹 Register

POST /auth/register

```json
{
  "username": "user",
  "password": "12345"
}
```

---

### 🔹 Login

POST /auth/login

```json
{
  "username": "user",
  "password": "12345",
  "capabilityCode": "generated_code"
}
```

---

## Security Layers

1. Prepared Statements → Prevent SQL Injection
2. AES-256 Encryption → Protect stored credentials
3. Capability Code → Additional authentication layer
4. Detection System → Logs suspicious activity

---

## Future Improvements

* Add frontend UI
* Implement rate limiting
* Add JWT authentication
* Build admin dashboard for logs

---

## 👨‍💻 Author

Chaitanya Kulkarni
