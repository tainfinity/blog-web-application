# **Blog Web Application**

---

## **Table of Contents**

1. [Project Description](#project-description)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
   
---

## **Project Description**

The Blog Web Application is a dynamic and responsive blog platform that allows users to manage their blog posts effectively. Users can create new blog posts with titles, content, categories, and optional image uploads. The app is built with modern design principles using Bootstrap and is fully responsive. It supports CRUD (Create, Read, Update, Delete) operations and has image upload capabilities with file handling managed by Multer.

---

## **Key Features**

- **Create New Posts**: Users can create blog posts with titles, content, categories, and images.
- **Edit and Delete Posts**: Full CRUD operations for managing posts.
- **View Posts**: Users can view posts on the home page with images and summaries.
- **Image Upload**: Upload images for posts using Multer, with images displayed as thumbnails or full size.
- **Responsive Design**: Uses Bootstrap for a modern, responsive layout.
- **Rich Text Editing**: Quill.js provides a rich-text editor for formatting post content.

---

## **Tech Stack**

- **Node.js**: Backend runtime for server-side logic.
- **Express.js**: Web framework used for routing and middleware.
- **EJS**: Templating engine for rendering dynamic HTML content.
- **Multer**: Middleware for handling file uploads.
- **Bootstrap**: CSS framework for responsive design and UI components.
- **Quill.js**: Rich-text editor for writing blog content.
- **HTML/CSS/JavaScript**: Frontend technologies for UI and client-side functionality.

---

## **Installation**

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/blog-web-app.git
   cd blog-web-app
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then, run the following command to install the required packages:
   ```
   npm install
   ```

3. **Create the uploads directory:**:
  ```
  mkdir public/uploads
  ```

4. **Run the application**:
   Once everything is set up, start the server by running:
   ```
   node app.js
   ```
The application will be running on <http://localhost:3000>.


