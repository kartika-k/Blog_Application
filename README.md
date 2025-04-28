# Blog_Application
```markdown
# BlogHub

BlogHub is a modern blogging platform where users can explore, share, and connect through creative content. This README provides instructions for setting up and running the application locally, along with an overview of the architecture and flow.

## Installation

To set up the BlogHub application locally, follow these steps:

1. Clone the repository:
   ```bash
   https://github.com/kartika-k/Blog_Application.git
   cd bloghub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/bloghub
     JWT_SECRET=your_jwt_secret_key
     ```
   - Modify values as needed for your environment

4. Set up the database:
   - Make sure MongoDB is installed and running on your system

## Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Start the backend server:
   ```bash
   npm run server
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
 ```
```
   ## Architecture Overview
   
   BlogHub follows a modern web application architecture with separate frontend and backend components:
   
   ### Frontend Architecture
   - Built with React.js using functional components and hooks
   - State management with Redux for global application state
   - React Router for client-side routing
   - Styling with CSS modules and some Tailwind CSS utilities
   - Responsive design for mobile and desktop views
   
   ### Backend Architecture
   - Node.js with Express.js for the API server
   - MongoDB database with Mongoose ODM for data modeling
   - JWT (JSON Web Token) for authentication
   - RESTful API endpoints with proper error handling
   - MVC (Model-View-Controller) pattern for organizing code
   
   ## Flow of the Application
   
   1. **User Authentication Flow**
      - User registers or logs in through the authentication pages
      - Backend validates credentials and issues a JWT token
      - Frontend stores the token for authenticated requests
      - Protected routes check for valid authentication
   
   2. **Content Creation Flow**
      - Admins can create new blog posts
      - Published posts become visible to all users
   
   3. **Content Consumption Flow**
      - Homepage displays trending and recent posts
   
   5. **Data Flow**
      - Frontend components request data via API calls
      - Backend controllers handle requests and query the database
      - Response data is formatted and returned to the frontend
      - Frontend renders the data in the appropriate components
   
   ## Technologies Used
   
   - **Frontend**: React.js, Redux, React Router, CSS Modules, Tailwind CSS
   - **Backend**: Node.js, Express.js, MongoDB, Mongoose
   - **Authentication**: JWT, bcrypt
   
   ## Contributing
   
   1. Fork the repository
   2. Create a feature branch (`git checkout -b feature/amazing-feature`)
   3. Commit your changes (`git commit -m 'Add some amazing feature'`)
   4. Push to the branch (`git push origin feature/amazing-feature`)
   5. Open a Pull Request

```

![image](https://github.com/user-attachments/assets/a7be98ff-a423-4d38-9cb7-dd5462abef78)

![image](https://github.com/user-attachments/assets/ca3cc2f6-3e4a-4fa7-aa1d-b571b726cb22)

# Home Page
![image](https://github.com/user-attachments/assets/3dec2e26-9800-4c63-86c8-d422d1524e44)

![image](https://github.com/user-attachments/assets/e795a35c-54ef-45b6-87e2-a4ad9b7f4436)
