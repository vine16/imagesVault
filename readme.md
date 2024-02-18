# Image Upload Application

## Overview

This application allows users to upload, view, and manage images. It includes features for user registration, login, and authentication.

## Built With

Express.js
EJS templating engine
Express-ejs-layouts
dotenv
Cookie-parser
Multer (for file uploads)

## Routes

GET /: Displays a list of uploaded images (requires authentication).
GET /new: Displays a form for adding a new image (requires authentication).
POST /: Handles image uploads (requires authentication).
GET /register: Displays the registration form.
POST /register: Handles user registration.
GET /login: Displays the login form.
POST /login: Handles user login.
GET /logout: Logs the user out.

## Installation

Run npm install to install dependencies.
Create a .env file and add your environment variables (e.g., database connection details).

## Running the Application

Run npm start to start the development server.
Access the application at http://localhost:3000.

## Key Features

Image upload with validation
User registration and login
Authentication middleware
EJS templating for views
Layouts for consistent design
Environment variables for configuration

## Additional Notes

The application uses middleware for file uploads, validation, authentication, and cookie parsing.
It follows a modular structure with separate controllers for images and users.
The views are rendered using EJS templates.
Environment variables are used to store sensitive information.
