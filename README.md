# React + Vite

### Project Name - Entertainment App
This repository contains the frontend codebase for Entertainment App, which is a web application focused on providing a user-friendly experience for browsing, searching, and bookmarking movies and TV shows. The frontend is built using React and includes various features and components to enhance the user experience.


## Description
Entertainment App is designed to be a comprehensive media collection platform where users can explore, search, bookmark, and receive personalized recommendations for movies and TV shows. The frontend plays a crucial role in delivering these functionalities through intuitive user interfaces and seamless interactions.

## Features
# User Authentication:
Allows users to sign up, log in, and log out to access personalized features like bookmarking and recommendations.
# Explore Page:
Provides a curated collection of movies and TV shows fetched from an API, with options to filter and sort by various criteria.
# Search Functionality:
Enables users to search for specific movies, TV shows, or other media content using a search bar, with paginated search results for easy navigation.
# Bookmarking:
Authenticated users can bookmark their favorite media items, which are stored and linked to their profiles for easy access.
# Details Page:
Displays detailed information about each media item, including title, release date, genres, rating, trailer, cast, crew, and an overview.
# Infinite Scroll:
Implements infinite scrolling on certain pages to provide a seamless browsing experience without traditional pagination.
# Responsive Design:
Ensures that the frontend is accessible and functional across various devices and screen sizes, enhancing user experience on both desktop and mobile devices.
# Lazy Loading Images:
Implements lazy loading for images to improve performance by loading images only when they are in the viewport, reducing initial page load times.
# Reusable Components:
Utilizes reusable UI components such as carousels, tabs, lazy-loaded images, ratings, and more to maintain consistency and improve development efficiency.
# State Management:
Uses state management tools like Redux Toolkit for managing application state, enabling efficient data flow and ensuring a predictable state container.

## Folder Structure
The folder structure of the frontend codebase is organized as follows:
src
1.components      # Reusable UI components
2.hooks           # Custom hooks for data fetching.
3.pages           # React components for different pages/routes
4.utils           # Utility functions, helper modules
5.store           #Redux toolkit for centralize state management
7.assets          # Static content like images
8. App.js         # Main App component
9.index.js        # Entry point for the React application

## Setup Instructions
To set up the frontend environment locally, follow these steps:
Clone this repository to your local machine.
Navigate to the project directory using the terminal.
Install dependencies by running npm install.
Start the development server with npm run dev.
Access the application in your web browser at http://localhost:5173.

## Usage
Upon accessing the application, users can sign up or log in to their accounts.
Users can explore the collection of movies and TV shows on the Explore page.
The search functionality allows users to find specific media items based on their preferences.
Bookmarking favorite media items is available for authenticated users.
Detailed information about each media item can be viewed on the Details page.
The application is designed to be responsive and accessible across various devices and screen sizes.

## Technologies Used:
The frontend of Project is built using the following technologies:

React: JavaScript library for building user interfaces.
Redux Toolkit: State management tool for managing application state.
React Router: Library for routing and navigation in React applications.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Axios: HTTP client for making API requests.
React Icons: Icon library for including icons in the UI.
Dayjs: Library for date and time formatting.
Yup: JavaScript schema builder for form validation.
Formik: Form library for React applications, integrating with Yup for form validation.
react-infinite-scroll-component: React component for implementing infinite scrolling.
react-lazy-load-image-component: Component for lazy loading images, improving performance by loading images only when they are in the viewport.
react-toastify: React component for toast notifications, providing user feedback and alerts.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
