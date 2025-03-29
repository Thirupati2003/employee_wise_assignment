# EmployWise Frontend Assignment

## 🚀 Project Overview

This is a basic React-based user management application built using Vite. It integrates with the Reqres API to perform authentication, display a paginated list of users, and allow editing and deleting users.

## 🛠️ Features

✅ **Authentication Screen**  
- User can log in using credentials.  
- Token is stored upon successful login.  

✅ **User List**  
- Displays a paginated list of users.  
- Shows user details (first name, last name, and avatar).  

✅ **User Management**  
- Edit: Update user details (first name, last name, and email).  
- Delete: Remove user from the list.  
- Shows success or error messages after operations.  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)  
- **HTTP Client:** Axios  
- **UI Styling:** Basic CSS  
- **Routing:** React Router  

---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd employwise-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the app in your browser:
```
http://localhost:5173
```

---

## 🔥 API Endpoints

- **Authentication:** `POST /api/login`  
  - Email: `eve.holt@reqres.in`  
  - Password: `cityslicka`  
- **User List:** `GET /api/users?page=1`  
- **Update User:** `PUT /api/users/{id}`  
- **Delete User:** `DELETE /api/users/{id}`  

---

## 🔥 Assumptions & Considerations
- The app handles basic form validation on login and edit screens.  
- Token is persisted in local storage.  
- API errors are displayed using basic alert messages.  

---

## 📦 Deployment
To deploy the app:
- Build the production version:
```bash
npm run build
```
- Use platforms like [Netlify](https://www.netlify.com), [Vercel](https://vercel.com), or [Render](https://render.com) for free hosting.

---

## 🛠️ Usage Instructions
- Login with the provided credentials.  
- View and navigate through the paginated user list.  
- Edit or delete users as needed.  

---

✅ **Happy Coding!** 🚀