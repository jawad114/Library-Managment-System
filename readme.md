# Library Management System API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

### Register a User

- **Endpoint:** `POST /users/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "contact_number": "1234567890",
    "password": "password123"
  }
  ```
- **Response:** Returns user details and JWT token.

### Login a User

- **Endpoint:** `POST /users/login`
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns user details and JWT token.

## User Management

### Update User Details

- **Endpoint:** `PUT /users/:id`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Request Body (example):**
  ```json
  {
    "name": "John Doe Updated",
    "contact_number": "0987654321"
  }
  ```
- **Response:** Returns updated user details.

### Delete a User

- **Endpoint:** `DELETE /users/:id`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:** Returns a message confirming user deletion.

### View Users

- **Endpoint:** `GET /users`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:** Returns a list of all registered users (Admin only).

## Book Management

### Add a Book

- **Endpoint:** `POST /books`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Request Body:**
  ```json
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "publication_year": 1949,
    "borrowed": false
  }
  ```
- **Response:** Returns the added book details.

### Update a Book

- **Endpoint:** `PUT /books/:id`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Request Body (example):**
  ```json
  {
    "title": "Animal Farm",
    "author": "George Orwell",
    "genre": "Political Satire",
    "publication_year": 1945
  }
  ```
- **Response:** Returns updated book details.

### Delete a Book

- **Endpoint:** `DELETE /books/:id`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:** Returns a message confirming book deletion.

### View Books

- **Endpoint:** `GET /books`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Query Parameters (optional):** `title`, `author`, `genre`, `page`, `limit`
- **Response:** Returns a list of all books with pagination and search filters.

## Borrowing and Returning Books

### Borrow a Book

- **Endpoint:** `POST /books/borrow`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Request Body:**
  ```json
  {
    "bookId": "60c72b4f9b1e8b2d88f7c21f"
  }
  ```
- **Response:** Returns a message confirming the book is borrowed.

### Return a Book

- **Endpoint:** `POST /books/return`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Request Body:**
  ```json
  {
    "bookId": "60c72b4f9b1e8b2d88f7c21f"
  }
  ```
- **Response:** Returns a message confirming the book is returned.

### View Borrowed Books

- **Endpoint:** `GET /books/borrowed/:userId`
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Response:** Returns a list of books currently borrowed by the user.

## Error Responses

- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** Missing or invalid authentication token.
- **403 Forbidden:** Access denied due to insufficient permissions.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Server encountered an error.

---
