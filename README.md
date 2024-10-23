## project name: Meeting Room Booking System for Co-working spaces

## live url :  https://lev2-assignment-3.vercel.app/
## Some Features of this project :
### Modular Route Handling:

Separate route files for /api/bookings and /api/my-bookings to keep the project organized and scalable.
MongoDB Integration:

Bookings and rooms are stored in a MongoDB database with relationships between collections.
### User-Specific Booking Management:

/api/my-bookings route displays bookings specific to the logged-in user.
### Authentication and Authorization:

User authentication ensures only logged-in users can access their own bookings.
### Flexible Data Retrieval:

Query parameters like roomId and date allow flexible searches for bookings.
Retrieves all bookings if no parameters are provided.
### TypeScript for Strong Typing:

Type definitions in index.d.ts for booking-related properties (e.g., roomId, date, startTime, endTime).
### Efficient Update Operations:

MongoDB's findByIdAndUpdate method is used to update documents efficiently.
### Postman API Testing:

API routes are tested using Postman to ensure functionality and reliability.
### Scalable Project Structure:

Routes are modular and well-organized to support future project scaling and maintainability.
## Instructions on how to run the application locally:

This application is built with Express.js, mongodb, Mongoose, Node.js,nodemon,bycrypt,jsonwebtoken(jwt), TypeScript, zod for input validation, and CORS middleware.

## Installation

1. Clone the repository to your local machine:

   git clone https://github.com/yourusername/lev2-assignment-3.git

2. Navigate to the project directory:

   cd lev2-assignment-3

3. Install dependencies:

   npm install

4. Build the TypeScript code:

   npm run build

## Configuration

1. Create a '.env' file in the root directory .

2. Update the '.env' file with your MongoDB connection URI and other configurations.

## Usage

To run the application locally, follow these steps:

1. Start the server:

   npm start

2. The server will start on `http://localhost:5000` by default.

## API Endpoints


### `POST /api/auth/signup`

-  sign up user 
### `POST /api/auth/login`

-    login user
### `POST /api/rooms/`

-  creates a room

### `GET /api/rooms/`

- retrieves all rooms.

### `GET /api/rooms/:id`

- retrieves a single room

### `DELETE /api/rooms/:id`

- Deletes a room by ID.
- 
### `POST /api/bookings/`

-  creates a booking

### `GET /api/bookings/`

- retrieves all bookings.

### `GET /api/my-bookings`

- retrieves a authenticated users bookings

### `DELETE /api/bookings/:id`

- Deletes a booking by ID.
- 
## Input Validation

Input validation is performed using zod. Ensure that requests include valid data according to the defined schemas.

## CORS

Cross-Origin Resource Sharing (CORS) is enabled by default to allow requests from different origins.
