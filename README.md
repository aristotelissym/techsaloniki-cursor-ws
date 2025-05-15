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
- [Prompts](#prompts)
- [Resources](#resources)

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

## Prompts
### 1. Init Project

> This is a brand-new full-stack web application project. The goal is to create a simple yet complete CRUD (Create, Read, Update, Delete) application.
> Please follow these requirements carefully:
>  - Phase 1: Only generate the frontend code for now.
>  - Use only the technologies, libraries, and patterns defined under the /instructions directory.
>  - Ensure your implementation strictly follows all rules, guidelines, and architectural conventions outlined in /instructions.
>    - Design the frontend with component reusability, modular structure, and clean code principles in mind.
>    - Include basic but functional UI components for all CRUD operations (e.g., forms, lists, edit views, delete confirmations).
>    - Assume the backend will provide a standard REST API or follow whatever contract is defined under /instructions/api-specs.
>    - The frontend component will be created in a directory named "frontend".
>  Do not begin backend development until explicitly instructed to do so.
>
>
>    1. Do not remove these. The files under .cursor/rules are rules you have to follow and files under instructions are files that describe exactly how the application should be setup
>    1. Before continuing with the backend, all files related to the frontend deployment, move them under a directory frontend/
>    1. Proceed with the backend component, and build it under the directory backend/  based on the rules and instructions provided in the directories instructions/ and .cursor/rules in the root directory
>
>  Proceed to implement the backend component of the application.
>    - Place all backend code under the backend/ directory.
>    - Strictly adhere to the architecture, conventions, and coding standards defined in the following locations:
>      ○ instructions/ — for project-specific implementation guidelines.
>      ○ .cursor/rules/ — for Cursor-specific rules, patterns, and code quality standards.
>    - The backend must fully support all CRUD operations required by the frontend and comply with any API contracts or interface specifications previously defined (e.g., in instructions/api-specs or similar files).
>    - Follow best practices for modularity, scalability, and separation of concerns (e.g., use services, controllers, models appropriately).
>    - Implement robust error handling, input validation, and any security measures defined in the provided rules.
>    - Use only the technologies and dependencies permitted by the project instructions.
>    - Ensure the backend is properly structured to support integration testing and eventual deployment.
>  Only implement what is explicitly required by the documentation—do not make assumptions beyond the scope defined in instructions/ and .cursor/rules/.


1. Do not remove these. The files under .cursor/rules are rules you have to follow and files under instructions are files that describe exactly how the application should be setup.

1. Before continuing with the backend, all files related to the frontend deployment, move them under a directory frontend/.

1. Proceed with the backend component, and build it under the directory backend/  based on the rules and instructions provided in the directories instructions/ and .cursor/rules in the root directory.

1. Run first a check that both components are ready.

1. Output what are the .env needs, and setup the rest.

1. We are done with the development of the application. Now, I want these to be deployed in Minikube locally. Create all the manifest files for minikube (deployment, services etc.). Build everything under the directory k8s/.

1. Create the Dockerfiles for frontend in directory frontend/ and the backend in directory backend/. For any need, look on the rules and instructions provided in the directories instructions/ and .cursor/rules in the root directory.

1. Create a more thorough documentation based on the details of the project. Mention the rules and the instructions.


## Resources

- https://ademyuce.tr/en/vibe-coding-analysis-of-a-post-modernist-programming-paradigm/
- https://arstechnica.com/ai/2025/03/is-vibe-coding-with-ai-gnarly-or-reckless-maybe-some-of-both/
- https://forum.cursor.com/
- https://docs.cursor.com/
- https://www.reddit.com/r/ChatGPTCoding/comments/1jfacpu/if_you_are_vibe_coding_read_this_it_might_save_you/
- https://www.reddit.com/r/ChatGPTCoding/comments/1iueymf/hot_take_vibe_coding_is_not_the_future/
- https://medium.com/@bobm67/prompt-coding-vs-vibe-coding-navigating-the-future-of-ai-assisted-development-039d6946308c
- https://www.reddit.com/r/vibecoding/comments/1kis9yj/the_ultimate_vibe_coding_guide/
- https://www.reddit.com/r/vibecoding/comments/1kk1gul/10_brutal_lessons_from_6_months_of_vibe_coding/
- https://www.reddit.com/r/ProgrammerHumor/comments/1jfr2ey/thiscaptionwasvibecoded/
- https://dev.to/wasp/a-structured-workflow-for-vibe-coding-full-stack-apps-352l
- https://madhukarkumar.medium.com/a-comprehensive-guide-to-vibe-coding-tools-2bd35e2d7b4f
- https://github.com/filipecalegario/awesome-vibe-coding
- https://github.com/TechNomadCode/AI-Product-Development-Toolkit?tab=readme-ov-file
- https://www.perforce.com/blog/alm/how-write-product-requirements-document-prd#prd-template-a-product-requirements-document-example