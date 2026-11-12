# Members Only

<p align="center">
  <a href="https://members-only-tklm.onrender.com/">
    <img src="https://img.shields.io/badge/✓%20VISIT%20NOW-22C55E?style=for-the-badge&labelColor=14532D" alt="Visit Now" />
  </a>
</p>

## About

Members Only is an exclusive clubhouse application where users can share posts anonymously with the public while keeping their identities visible to authenticated members.

Visitors can read posts without knowing who wrote them, while logged-in members get access to additional information about each post's author.
These are the different access levels:
1. Visitor: Can see the posts but cannot create post.
2. Logged-in user: Visitor access + ability to create posts.
3. Members: Logged-in user access + can see the the author of the post and the timestamp of post creation.
4. Admin: Member access + can delete any post

Built as part of [The Odin Project](https://www.theodinproject.com/), this project focuses on implementing authentication, authorization, session management, and database-driven web applications using Node.js and Express.

<img width="2936" height="1554" alt="Screenshot 2026-11-11 at 10 54 09 PM" src="https://github.com/user-attachments/assets/06fbaf1b-12f8-41c5-b35f-558f312ff39f" />


## Features

- User registration and login
- Secure password hashing using bcrypt
- Authentication using Passport.js and Local Strategy
- Session-based authentication and persistent sessions
- Anonymous post creation
- Public access to posts without revealing author identities
- Author identification for authenticated members
- Form validation and error handling
- PostgreSQL database integration
- Server-side rendering using EJS

## Technologies Used

- JavaScript (Node.js)
- Express.js
- PostgreSQL
- Passport.js
- Passport Local Strategy
- Express Session
- Connect-PG-Simple
- bcryptjs
- EJS
- express-validator
- dotenv

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bibu007/members-only.git
   ```

2. Navigate to the project directory:

   ```bash
   cd members-only
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure your environment variables by creating a `.env` file in the project root.

   ```env
   SECRET=your_session_secret
   DATABASE_URL=your_postgresql_connection_string
   ```

   Make sure your PostgreSQL database and required tables are configured before starting the application.

5. Start the application:

   ```bash
   node app.js
   ```

6. Open your browser and navigate to:

   ```text
   http://localhost:3000
   ```

## What I Learned

While building this project, I gained experience with:

- Implementing authentication and authorization using Passport.js.
- Understanding how Passport Local Strategy verifies user credentials.
- Managing user sessions using express-session.
- Persisting sessions in PostgreSQL using connect-pg-simple.
- Hashing and verifying passwords using bcrypt.
- Protecting routes using custom authentication and authorization middleware.
- Understanding the difference between authentication and authorization.
- Implementing server-side form validation using express-validator.
- Working with PostgreSQL to manage users, posts, and relationships.
- Using EJS to dynamically render server-side views.
- Managing environment variables and application configuration.
- Understanding how authentication state is maintained across HTTP requests.

## Acknowledgements

- [The Odin Project](https://www.theodinproject.com/) for the project inspiration and learning resources.

