# **Assignment Management System**

## **Overview**
The Assignment Management System is a web application designed to facilitate assignment tracking and management. It provides a seamless interface for admins to manage assignments and users to submit their tasks. The application is built with a focus on modularity, security, and scalability.

## **Features**
### Admin:
- Register and login securely using JWT-based authentication.
- View all submitted assignments.
- Accept or reject assignments based on review.
  
### User:
- Submit assignments for review.
- View the status of assignments (accepted/rejected).

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **API Testing**: Postman
- **Environment Management**: dotenv

---

## **Installation and Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/assignment-management-system.git
   cd assignment-management-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The application will run on `http://localhost:5000`.

---

## **API Documentation**

### **Authentication**
#### **Admin Registration**
- **Endpoint**: `POST /api/admins/register`
- **Request Body**:
  ```json
  {
      "name": "Admin Name",
      "email": "admin@example.com",
      "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Admin registered successfully."
  }
  ```

#### **Admin Login**
- **Endpoint**: `POST /api/admins/login`
- **Request Body**:
  ```json
  {
      "email": "admin@example.com",
      "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
      "token": "JWT_TOKEN_HERE"
  }
  ```

### **Assignment Management**
#### **View All Assignments**
- **Endpoint**: `GET /api/admins/assignments`
- **Headers**:
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN"
  }
  ```
- **Response**:
  ```json
  [
      {
          "_id": "assignment_id",
          "user": "User Name",
          "task": "Task Description",
          "status": "pending"
      }
  ]
  ```

#### **Accept Assignment**
- **Endpoint**: `POST /api/admins/assignments/:id/accept`
- **Headers**:
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Assignment accepted."
  }
  ```

#### **Reject Assignment**
- **Endpoint**: `POST /api/admins/assignments/:id/reject`
- **Headers**:
  ```json
  {
      "Authorization": "Bearer JWT_TOKEN"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Assignment rejected."
  }
  ```

### **User Submission**
#### **Submit Assignment**
- **Endpoint**: `POST /api/users/assignments`
- **Request Body**:
  ```json
  {
      "task": "Task Description"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Assignment submitted successfully."
  }
  ```

---

