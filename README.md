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
