Address to the running service:
https://marketplace-frontend-3x8f.onrender.com/

Installation instructions:

1.  Clone the repository using the command: git clone https://github.com/TiTe-5G00EV16/2023-final-project-MarkoSulkunen

2.  Navigate to the root directory of the project using the command: cd MarketPlace_FullStack

3.  Install the required dependencies for the backend using the command: npm install.

4.  Navigate to the frontend directory using the command: cd frontend.

5.  Install the required dependencies for the frontend using the command: npm install.

6. Create a .env file in the root directory and add the following environment variables: 
MYSQL_HOST='localhost'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='productspassword'
MYSQL_DATABASE='products_db'
PORT=5000
JWT_SECRET=secretkey

8. Navigate to the backend directory and start the backend server using the command: node server.js
   
10. Start containers using the command: docker-compose up -d
    
12. Navigate to the frontend directory and start frontend using the command: npm run dev
    
14. Open cypress to run tests using the command: npx cypress open

Summary:

The Market Place app enables users to create, view, and manage products. Users can create an account by signing up with their email and password or by logging in to an existing account. After logging in, users can create a new product by providing details such as name, price, description, image link, and contact information. They can also view a list of all products and manage their own products.

The app includes a login and signup form for user authentication, and local storage is used to persist user authentication state across sessions. In the "Add Product" page, a form is provided for creating new products. When the form is submitted, the data is sent to the backend API. The form includes fields for the product name, price, description, image, and contact information. The user's name and email will be sent to the product table as the owner and contact information, respectively.

The Market Place is designed to be responsive to all kinds of screen sizes. On larger screens, two products will be listed horizontally, while on smaller screens, the entire list will be vertical, and the navigation can be opened from a side drawer.
This app is built using ReactJS for the frontend, NodeJS with ExpressJS for the backend, and PostgreSQL for the database. The app also uses React-Query for client-side data fetching and form management.
