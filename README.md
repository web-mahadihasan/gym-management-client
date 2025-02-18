# 🏋️ Gym Class Scheduling and Membership Management System

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Live Demo](https://img.shields.io/badge/demo-live-blue)](https://gym-management-client-bd.vercel.app/)

## 📌 Introduction

The **Gym Class Scheduling and Membership Management System** is a web-based application designed to streamline gym operations, including class scheduling, membership management, and role-based access control. It provides structured workflows for **Admins**, **Trainers**, and **Trainees**, ensuring seamless class management and booking processes.

---

## 📖 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Business Rules](#business-rules)
- [Error Handling](#error-handling)
- [API Documentation](#api-documentation)
- [Contributors](#contributors)
- [License](#license)

---

## ✨ Features

✅ **Role-Based Access Control**: Admins manage trainers and class schedules, trainers conduct classes, and trainees book available slots.  
✅ **Class Scheduling**: Admins can schedule a maximum of **5 classes per day**, each lasting **2 hours**.  
✅ **Booking System**: Trainees can book available class slots (maximum **10 trainees per schedule**).  
✅ **Authentication & Authorization**: JWT-based secure authentication for different roles.  
✅ **Error Handling**: Proper error responses for validation, unauthorized access, and business rule enforcement.  

---

## 🛠️ Technology Stack

| Technology       | Description                               |
|-----------------|-------------------------------------------|
| **Frontend**    | React, Tailwind CSS                      |
| **Backend**     | TypeScript/Python                        |
| **Framework**   | Express.js/Django                        |
| **Database**    | MongoDB/PostgreSQL                       |
| **ORM/ODM**     | Prisma/Mongoose                          |
| **Authentication** | JWT (JSON Web Tokens)               |
| **Architecture** | Modular Pattern (Priority) / MVC        |

---

## 🏗️ System Architecture

Below is a high-level relational diagram of the system:

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email
        string password
        string role "Admin | Trainer | Trainee"
    }
    
    TRAINERS {
        int id PK
        string name
        string specialty
    }
    
    CLASSES {
        int id PK
        string date
        string time
        int trainer_id FK
        int max_capacity
    }
    
    BOOKINGS {
        int id PK
        int trainee_id FK
        int class_id FK
    }

    USERS ||--o{ BOOKINGS : "makes"
    BOOKINGS }o--|| CLASSES : "belongs_to"
    CLASSES }o--|| TRAINERS : "conducted_by"


## 📥 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/web-mahadihasan/gym-management-client.git
cd gym-management-client
```

### 2️⃣ Install Backend Dependencies
For **Express.js (Node.js + TypeScript)**:
```sh
cd server
npm install
```

For **Django (Python)**:
```sh
cd server
pip install -r requirements.txt
```

### 3️⃣ Install Frontend Dependencies
```sh
cd client
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file and add the required configurations:

```plaintext
DATABASE_URL=mongodb+srv://your_database
JWT_SECRET=your_secret_key
PORT=5000
```

### 5️⃣ Run the Server
For **Express.js**:
```sh
npm run dev
```
For **Django**:
```sh
python manage.py runserver
```

### 6️⃣ Run the Client
```sh
cd client
npm run dev
```

---

## 🚀 Usage

### 🛠️ Admin Panel
- Create and manage trainers.
- Schedule classes and assign trainers.
- View and manage class schedules.

### 🏋️ Trainer Panel
- View assigned class schedules.
- Conduct gym classes.

### 👤 Trainee Panel
- Create and manage personal profiles.
- Browse available gym class schedules.
- Book classes if slots are available (**max 10 trainees per class**).
- Cancel bookings if needed.

---

## 📏 Business Rules

✔️ **Class Scheduling:**
- Maximum **5 classes per day**.
- Each class **lasts for 2 hours**.
- Each class can have **up to 10 trainees**.

✔️ **Booking System:**
- Trainees can book available schedules.
- A trainee **cannot book multiple classes** at the same time.
- Bookings can be **canceled** if needed.

✔️ **Authentication & Authorization:**
- Users must be **logged in** via JWT to perform actions.
- **Admins** manage class schedules.
- **Trainers** can view assigned schedules only.
- **Trainees** can only book or cancel their own schedules.

---

## ⚠️ Error Handling

- **Unauthorized Access:** `"Unauthorized access"` (401)
- **Validation Errors:** `"Invalid email format"` (400)
- **Class Booking Limit:** `"This class is full"` (403)
- **Schedule Limit:** `"Cannot create more than 5 schedules per day"` (400)

### Example Error Response:
```json
{
    "status": 400,
    "message": "Cannot create more than 5 schedules per day"
}
```

---

## 📌 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | User login (JWT) |
| `GET` | `/users/me` | Get logged-in user details |
| `POST` | `/schedules` | Admin creates a class schedule |
| `GET` | `/schedules` | Get all class schedules |
| `POST` | `/bookings` | Trainee books a class |
| `DELETE` | `/bookings/:id` | Trainee cancels a booking |

---

## 👥 Contributors

- [Mahadi Hasan](https://github.com/web-mahadihasan) - **Lead Developer**
- [Your Name] - **Backend Developer**
- [Your Name] - **Frontend Developer**

Feel free to contribute! Fork the repository and submit a PR. 🚀

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🔗 Links

- **GitHub Repo**: [gym-management-client](https://github.com/web-mahadihasan/gym-management-client)
- **Live Demo**: [gym-management-client-bd.vercel.app](https://gym-management-client-bd.vercel.app/)
```

