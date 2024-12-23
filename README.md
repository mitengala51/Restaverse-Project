Review Website Setup and Usage Guide

Welcome to the setup and usage documentation for the **Review Website**. This guide will walk you through the process of setting up both the frontend and backend, as well as provide an overview of the website’s features. 

Prerequisites

Before starting, ensure that you have the following installed on your local machine:

- Node.js (for both frontend and backend development)
- npm (for managing JavaScript packages)
- Access to a Google Business account for integrating Google login to fetch reviews.

Installation Instructions

1. Preparing the Development Environment

Start by opening **VS Code** and setting up two terminal windows:

1. Frontend Terminal: This terminal will be used for working with the frontend of the Review Website.
2. Backend Terminal: This terminal will be dedicated to managing the backend of the Review Website.

2. Navigating to Project Directories

- In the frontend terminal, change the directory to the `frontend` folder:
  ```bash
  cd /path/to/project/frontend
  ```
  
- In the backend terminal, change the directory to the `backend` folder:
  ```bash
  cd /path/to/project/backend
  ```

3. Installing Frontend Dependencies

In the frontend terminal, run the following command to install all necessary modules for the frontend:

```bash
npm install
```

This will download and install all the required dependencies listed in the `package.json` file for the frontend project.

4. Running the Frontend Development Server

Once the frontend dependencies are installed, start the frontend server by running:

```bash
npm run dev
```

The server will start, and the frontend will be available for local development.

5. Installing Backend Dependencies

Now, move to the backend terminal and install the required backend dependencies by running:

```bash
setup.bat
```

This will install all the necessary dependencies for the backend of the Review Website.

### 6. Starting the Backend Server

Once the backend dependencies are installed, start the backend server with the following command:

```bash
exc.bat
```

This will launch the backend, enabling the Review Website to function correctly.

7. Accessing the Website

After both frontend and backend servers are running, open your preferred web browser and visit the following address to access the Review Website:

```bash
http://localhost:3000
```

This will open the Review Website, where you can begin managing and viewing reviews.

---

Overview of the Review Website

The Review Website is designed for business owners to easily access and manage customer reviews. Here's a quick overview of the key features:

### Key Features:
- Google Login Integration: Business owners can log in securely using their Google Business account. The integration enables automatic retrieval of customer reviews from their Google My Business profile.
  
- Review Management: The website displays reviews in an organized dashboard. This includes:
  - Review ratings
  - Customer names
  - Dates of reviews
  - Review comments or feedback

How It Works:

1. Google Authentication: Business owners authenticate via Google login, allowing the website to fetch reviews linked to their business account.
2. Review Fetching: The backend uses mock APIs to replicate how the Google My Business Profile API functions. It fetches reviews associated with the authenticated account and presents them on the dashboard.
3. Review Display: Reviews are displayed in a clean, organized format that includes key details such as customer name, rating, comment, and the date of the review.
4. Replying to Reviews: Owners can respond directly to customer reviews to engage with customers and manage their online reputation.

---

## Conclusion

The Review Website provides business owners with an easy-to-use platform to manage their customer feedback. With the integration of Google login, all reviews associated with the business account are pulled automatically, eliminating manual data entry. The clean and intuitive design allows business owners to focus on improving their services based on customer feedback, ensuring they can respond effectively to reviews.

By setting up and using this Review Website, you are now equipped to monitor and enhance your business reputation with ease.
