# 🎵 Spotify Backend Clone

A robust, scalable RESTful API built with **Node.js**, **Express**, and **MongoDB**. This project serves as a comprehensive backend for a music streaming platform, featuring secure authentication, role-based access control, and efficient music cataloging.

---

## 🚀 Features

* **User Authentication:** Secure `register` and `login` using **JWT** and **bcryptjs**.
* **Role-Based Access Control (RBAC):**
    * **User Middleware:** Protects streaming and playback routes.
    * **Artist Middleware:** Protects administrative routes (creating songs and albums).
* **Music Management:**
    * Dynamically create tracks and link them to albums.
    * Fetch individual track metadata or the entire library.
* **Relational Data Modeling:** Complex schema design using **Mongoose** to map relationships between Users, Artists, Songs, and Albums.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose ODM
* **Security:** `jsonwebtoken` (JWT) & `bcryptjs`
* **API Testing:** Postman

---

## 📂 Project Structure

```text
spotify-backend/
├── src/
│   ├── controllers/    # Request handling logic
│   ├── models/         # Mongoose schemas (User, Song, Album)
│   ├── middlewares/    # Auth and Role verification
│   ├── routes/         # API endpoint definitions
│   ├── db/             # Database connection setup
│   └── app.js          # Main application entry
├── .env                # Environment variables (not tracked)
└── server.js           # Server initialization 
```
## ⚙️ Installation & Setup
Follow these steps to get the project running locally on your machine:

### 1. Clone the repository
``` text
git clone [https://github.com/SudeepNaik17/spotify-backend.git](https://github.com/SudeepNaik17/spotify-backend.git)
cd spotify-backend
```
### 2. Install dependencies
``` text
npm install
```
### 3. Set up Environment Variables
Create a file named .env in the root directory and add your specific credentials:

### Code snippet
``` text
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
### 4. Run the server
For Development (auto-reload with nodemon):
```text
npm run dev
```
### Production Mode:
```text
npm start
```
