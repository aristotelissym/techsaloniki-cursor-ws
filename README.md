# TechSaloniki Member Management System

A full-stack CRUD application for managing members, built with Next.js, NestJS, and MySQL, deployed on Kubernetes (Minikube).

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Build Instructions](#docker-build-instructions)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Application Configuration](#application-configuration)
- [API Documentation](#api-documentation)
- [UI Components](#ui-components)

## Architecture Overview

The application follows a microservices architecture with three main components:
- Frontend (Next.js)
- Backend API (NestJS)
- Database (MySQL)

Each component is containerized and deployed as a separate service in Kubernetes.

## Features

### Member Management
- View list of members with sorting and filtering
- Add new members
- Edit existing members
- Delete members with confirmation
- Form validation and error handling

### UI Features
- Responsive design with Tailwind CSS
- Dark blue color scheme
- Modal dialogs for forms
- Interactive data table with sorting
- Search functionality
- Loading and error states

### Data Model
Member properties include:
- First Name
- Last Name
- Sex (Male/Female/Other)
- Hometown
- Job Title
- Cat/Dog Preference (Cat/Dog/Both)

## Tech Stack

### Frontend
- Next.js 13+
- TypeScript
- Tailwind CSS
- React Hooks
- Form Validation

### Backend
- NestJS
- TypeORM
- MySQL
- Class Validator
- TypeScript

### Infrastructure
- Docker
- Kubernetes (Minikube)
- Node.js 18

## Project Structure

```
/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MemberTable.tsx
│   │   │   ├── MemberForm.tsx
│   │   │   └── Modal.tsx
│   │   ├── types/
│   │   │   └── member.ts
│   │   └── app/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── Dockerfile
│   └── next.config.js
├── backend/
│   ├── src/
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── controllers/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
└── k8s/
    ├── mysql-secret.yaml
    ├── mysql-pv.yaml
    ├── mysql-deployment.yaml
    ├── backend-configmap.yaml
    ├── backend-deployment.yaml
    ├── frontend-configmap.yaml
    └── frontend-deployment.yaml
```

## Prerequisites

- Node.js 18+
- Docker
- Minikube
- kubectl
- MySQL (for local development)

## Local Development

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

## Docker Build Instructions

### Backend
```bash
cd backend
eval $(minikube docker-env)
docker build -t techsaloniki-backend:latest .
```

### Frontend
```bash
cd frontend
eval $(minikube docker-env)
docker build -t techsaloniki-frontend:latest .
```

## Kubernetes Deployment

### 1. Start Minikube
```bash
minikube start
```

### 2. Configure Docker Environment
```bash
eval $(minikube docker-env)
```

### 3. Deploy Components
```bash
cd k8s

# Create secrets and configmaps
kubectl apply -f mysql-secret.yaml
kubectl apply -f backend-configmap.yaml
kubectl apply -f frontend-configmap.yaml

# Create storage
kubectl apply -f mysql-pv.yaml

# Deploy applications
kubectl apply -f mysql-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

### 4. Verify Deployment
```bash
kubectl get pods
kubectl get services
```

### 5. Access Application
```bash
minikube service frontend
```

## Application Configuration

### Environment Variables

#### Backend
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_NAME
- DATABASE_USER
- DATABASE_PASSWORD
- NODE_ENV

#### Frontend
- NEXT_PUBLIC_API_URL
- NODE_ENV

### Kubernetes Resources

#### MySQL
- PersistentVolume: 1Gi storage
- Secret for credentials
- Headless Service

#### Backend
- 2 replicas
- ConfigMap for environment variables
- ClusterIP Service

#### Frontend
- 2 replicas
- ConfigMap for environment variables
- LoadBalancer Service

## API Documentation

### Endpoints

```typescript
GET    /api/members      // List all members
POST   /api/members      // Create new member
PUT    /api/members/:id  // Update member
DELETE /api/members/:id  // Delete member
```

### Member DTO
```typescript
interface Member {
  id: string;
  first_name: string;
  last_name: string;
  sex: 'Male' | 'Female' | 'Other';
  hometown: string;
  job_title: string;
  cat_dog_lover: 'Cat' | 'Dog' | 'Both';
}
```

## UI Components

### MemberTable
- Sortable columns
- Search functionality
- Action buttons
- Responsive design

### MemberForm
- Input validation
- Error handling
- Dynamic form states
- Cancel/Submit actions

### Modal
- Backdrop with 40% opacity
- Centered content
- Close on backdrop click
- Keyboard accessibility

## Cleanup

To remove all deployed resources:
```bash
kubectl delete -f k8s/
```

To stop Minikube:
```bash
minikube stop
```
