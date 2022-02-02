# Docker Prisma Express API

[![TypeScript](https://img.shields.io/badge/TypeScript-4.7.4-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-4.2.1-green)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

A modern TypeScript Express API with Prisma ORM and PostgreSQL, fully containerized with Docker for both development and production environments.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Database Management](#database-management)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

This project provides a robust foundation for building RESTful APIs with Express.js, TypeScript, and Prisma ORM, all containerized with Docker. It includes authentication, database integration, and environment-specific configurations for seamless development and deployment.

## Features

- User authentication with JWT tokens and HTTP-only cookies
- PostgreSQL database integration with Prisma ORM
- Docker containerization for both development and production
- Environment-based configuration
- TypeScript for type-safe development
- Express.js for API routing and middleware
- Database connection testing endpoint

## Repository Structure

```
├── .dockerignore
├── .env                    # Local environment variables
├── .env.docker             # Docker environment variables
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.dev.yml  # Development Docker setup
├── docker-compose.yml      # Production Docker setup
├── package.json            # Project dependencies
├── prisma/
│   ├── migrations/         # Database migrations
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.ts             # Database seeding script
├── src/
│   ├── app.ts              # Express application setup
│   ├── controllers/        # Request handlers
│   ├── models/             # Data models
│   ├── routers/            # API routes
│   │   └── middlewares/    # Express middlewares
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
└── tsconfig.json           # TypeScript configuration
```

## Tech Stack

- **Backend Framework**: Express.js 4.18.1
- **Language**: TypeScript 4.7.4
- **ORM**: Prisma 4.2.1
- **Database**: PostgreSQL 12.12
- **Authentication**: JWT (jsonwebtoken 8.5.1)
- **Password Hashing**: bcryptjs 2.4.3
- **API Validation**: Joi 17.6.3
- **Development Tools**: Nodemon, ts-node
- **Containerization**: Docker, Docker Compose
- **Package Manager**: pnpm

## Quick Start

The fastest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd docker-prisma-express

# Start the application with Docker Compose
docker-compose up -d

# Test database connection
curl http://localhost:2727/test/db
```

The API will be available at http://localhost:2727

For database administration, Adminer is available at http://localhost:8080

## Installation & Setup

### Prerequisites

- Node.js 16.x or higher
- pnpm (recommended) or npm
- PostgreSQL 12.x or Docker
- Docker and Docker Compose (optional)

### Local Setup with Docker Database

```bash
# Run database in Docker
docker-compose -f docker-compose.dev.yml up -d

# Install dependencies
pnpm install

# Apply migrations and generate Prisma client
npm run p-mg-prod
npm run p-gen

# Run app in development mode
npm run dev

# Test database connection
curl http://localhost:2727/test/db
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV="development"
PORT=2727
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/my_db?schema=public"
JWT_SECRET="<your-jwt-secret>"
```

## Configuration

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| NODE_ENV | string | development | Yes | Application environment |
| PORT | number | 2727 | Yes | Port the API server runs on |
| DATABASE_URL | string | - | Yes | PostgreSQL connection string |
| JWT_SECRET | string | - | Yes | Secret for JWT token generation |

Environment variables can be set in `.env` for local development or `.env.docker` for Docker environments.

## Running the App

### Development Mode

```bash
# Run with hot-reload using nodemon
npm run dev
```

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

### Docker Development Environment

```bash
# Start development environment with hot-reload
docker-compose -f docker-compose.dev.yml up
```

### Docker Production Environment

```bash
# Start production environment
docker-compose up -d
```

## API Endpoints

The API includes the following endpoints:

- **Authentication**
  - POST `/auth/register` - Register a new user
  - POST `/auth/login` - Login and receive JWT token

- **Test Routes**
  - GET `/test/db` - Test database connection

## Database Management

### Prisma Commands

```bash
# Initialize Prisma in a project
npm run p-init

# Generate Prisma client
npm run p-gen

# Create and apply migrations
npm run p-mg

# Apply migrations in production
npm run p-mg-prod

# Seed the database
npm run seed
```

### Database Admin

The project includes Adminer for database administration, accessible at http://localhost:8080 when running with Docker Compose.

Login credentials:
- System: PostgreSQL
- Server: postgres
- Username: milon27
- Password: myPassWord
- Database: my_db

## Docker Setup

### Development

The development setup includes:
- PostgreSQL database
- Adminer for database management

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production

The production setup uses a multi-stage Docker build for optimized container size:
- Build stage: Compiles TypeScript to JavaScript
- Production stage: Runs the compiled application

```bash
docker-compose up -d
```

## Testing

Currently, the project does not include automated tests. This is an area for future improvement.

## Deployment

The application is ready for deployment using Docker:

```bash
# Build and push the Docker image
docker build -t your-registry/docker-prisma-express:latest .
docker push your-registry/docker-prisma-express:latest

# Deploy using Docker Compose
docker-compose -f docker-compose.yml up -d
```

