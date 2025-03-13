<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">Instagram Clone API - A social media backend built with NestJS</p>

## Description

This project is an Instagram clone backend API built using the [NestJS](https://github.com/nestjs/nest) framework. It provides core Instagram features including user profiles, posts, comments, and more.

## Features

- 👤 User authentication and authorization (Email and password + Google OAuth)
- 📝 User profiles management
- 📸 Posts creation and management
- 💬 Comments system
- 🔄 RESTful API endpoints
- 📚 API documentation with Swagger
- 🔒 Data validation and security
- 🗃️ TypeORM integration for database management
- 📧 Email notifications system


## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- PostgreSQL database

## Installation

```bash
$ yarn install
 ```

## Environment Setup
Create a `.env.development` file in the root directory and add the following variables:

```plaintext
# Database Configuration
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_HOST=localhost
DB_PORT=5432
DB_SYNCHRONIZE=true
DB_AUTO_LOAD_ENTITIES=true

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_AUDIENCE=your_audience
JWT_ISSUER=your_issuer
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AWS Configuration
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_BUCKET_NAME=your_bucket_name
AWS_CLOUDFRONT_URL=your_cloudfront_url

# Mail Configuration
MAILER_HOST=your_smtp_host
MAILER_PORT=your_smtp_port
MAILER_AUTH_USER=your_smtp_username
MAILER_AUTH_PASSWORD=your_smtp_password
MAILER_DEFAULT_SENDER="Your App Name <your@email.com>"
```

## Running the Application
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
 ```

## Testing
```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
 ```

## API Documentation
Once the application is running, you can access the Swagger API documentation at:

```plaintext
http://localhost:3000/api/docs
 ```


## Project Structure
```plaintext
src/
├── auth/           # Authentication related files
├── users/          # User management
├── profiles/       # User profiles
├── posts/          # Posts management
├── comments/       # Comments system
├── mail/           # Email service and templates
├── common/         # Shared resources
└── config/         # Configuration files




