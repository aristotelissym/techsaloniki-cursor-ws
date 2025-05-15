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
### 1. Build Frontend
```
This is a brand-new full-stack web application project. The goal is to create a simple yet complete CRUD (Create, Read, Update, Delete) application.
Please follow these requirements carefully:
 - Phase 1: Only generate the frontend code for now.
 - Use only the technologies, libraries, and patterns defined under the /instructions directory.
 - Ensure your implementation strictly follows all rules, guidelines, and architectural conventions outlined in /instructions.
   - Design the frontend with component reusability, modular structure, and clean code principles in mind.
   - Include basic but functional UI components for all CRUD operations (e.g., forms, lists, edit views, delete confirmations).
   - Assume the backend will provide a standard REST API or follow whatever contract is defined under /instructions/api-specs.
   - The frontend component will be created in a directory named "frontend".
 Do not begin backend development until explicitly instructed to do so.


   1. Do not remove these. The files under .cursor/rules are rules you have to follow and files under instructions are files that describe exactly how the application should be setup
   1. Before continuing with the backend, all files related to the frontend deployment, move them under a directory frontend/
   1. Proceed with the backend component, and build it under the directory backend/  based on the rules and instructions provided in the directories instructions/ and .cursor/rules in the root directory
```

### 2. Build Backend
```
Proceed to implement the backend component of the application.
  - Place all backend code under the backend/ directory.
  - Strictly adhere to the architecture, conventions, and coding standards defined in the following locations:
    ○ instructions/ — for project-specific implementation guidelines.
    ○ .cursor/rules/ — for Cursor-specific rules, patterns, and code quality standards.
  - The backend must fully support all CRUD operations required by the frontend and comply with any API contracts or interface specifications previously defined (e.g., in instructions/api-specs or similar files).
  - Follow best practices for modularity, scalability, and separation of concerns (e.g., use services, controllers, models appropriately).
  - Implement robust error handling, input validation, and any security measures defined in the provided rules.
  - Use only the technologies and dependencies permitted by the project instructions.
  - Ensure the backend is properly structured to support integration testing and eventual deployment.
Only implement what is explicitly required by the documentation—do not make assumptions beyond the scope defined in instructions/ and .cursor/rules/.
```

### 3. Validate Frontend & Backend Components
```
# Full-Stack Application Readiness and Deployment Checklist

Run a comprehensive check to verify that both the frontend and backend components of the application are properly implemented and ready.

Please ensure the following:

## General
- The project structure aligns with the conventions and constraints defined in the `instructions/` and `.cursor/rules/` directories.
- All required files are present and placed in their correct directories (`frontend/`, `backend/`).

## Frontend
- All CRUD functionalities are implemented and working as intended.
- The UI matches the design and usability standards outlined in `instructions/`.
- Component structure follows best practices (modularity, reusability, state management).
- No unresolved TODOs, placeholders, or missing components.

## Backend
- All API endpoints required by the frontend are implemented and functional.
- Business logic is properly separated (e.g., via services, controllers, models).
- Follows all conventions and rules in `.cursor/rules/` and `instructions/`.
- Includes error handling, input validation, and conforms to security guidelines.
- Database schema and migration files (if applicable) are correctly defined and operational.

## Integration
- The frontend correctly communicates with the backend (e.g., via REST or as defined in API contracts).
- There are no breaking errors in the integration between the two components.
- Environment variables and configuration files are correctly referenced and loaded in both components.

Run automated tests or static checks if defined, and report any issues or confirmations of readiness.
```

### 4. K8s Setup
```
## Deployment Phase Begins

Please prepare everything needed to deploy the full-stack application locally using **Minikube**.

### Directory Structure & Placement
- Create all Kubernetes manifest files (e.g., Deployments, Services, ConfigMaps, etc.) under the directory:
  ```
  k8s/
  ```
- Create the Dockerfile for the frontend under:
  ```
  frontend/Dockerfile
  ```
- Create the Dockerfile for the backend under:
  ```
  backend/Dockerfile
  ```

### Kubernetes Manifests Requirements
- Define separate **Deployment** resources for both frontend and backend services.
- Define **Service** resources to expose both components internally in the Minikube cluster.
  - Use a **NodePort** or **Ingress** to expose the frontend for local browser access via Minikube IP.
- Ensure proper labels, selectors, and environment variables are configured as required.
- Include any required **ConfigMaps**, **Secrets**, or **Volumes** if specified in the `/instructions` or `.cursor/rules`.

### Docker Configuration
- Write clean and efficient `Dockerfile`s for both components that:
  - Match the structure and tech stack of each component.
  - Follow any specified build optimizations or multi-stage builds (if required).
  - Reference `.env` or config files only if permitted in `instructions/`.

### Rules and Conventions
- At all times, follow the guidelines, naming conventions, and patterns described in:
  - `instructions/` — for project-specific behavior and architecture.
  - `.cursor/rules/` — for enforced coding, deployment, and tooling standards.

Ensure all manifests and Dockerfiles are **complete, buildable, and Minikube-compatible**.

Do **not** proceed with Helm or cloud deployment unless explicitly requested.

Ensure you are always working in the project directory.
```

## 5. Minikube Validation
```
#### Minikube Configuration Checklist

This checklist is designed to verify that the configuration settings and project structure are ready for successful local deployment using Minikube.

---

#### Minikube Environment Readiness

- All Kubernetes manifest files are located under the `k8s/` directory.
- Manifest files are valid and compatible with Minikube’s capabilities.
- All resource definitions follow Minikube’s networking and resource constraints.

---

#### Dockerfile Compatibility

- `frontend/Dockerfile` and `backend/Dockerfile` are configured for local builds using the Minikube Docker environment (`eval $(minikube docker-env)`).
- No external image registries are required unless explicitly mentioned.
- Docker images are correctly tagged and referenced in the `k8s/` manifests.

---

#### Kubernetes Manifests Validation

- All YAML files in `k8s/` are syntactically valid.
- Each Deployment includes:
  - `image` field referencing a valid Docker image.
  - Exposed `ports`.
  - `env` variables if needed.
  - Volume mounts (if required).
- Each Service:
  - Has a valid selector matching its Deployment.
  - Exposes frontend via `NodePort` or Ingress for browser access.
- Resource requests/limits are within Minikube’s available resources.

---
```

#### Networking and Service Access

- Services can communicate internally via Kubernetes service names.
- Environment variables or config maps used for service discovery are correctly pointing to in-cluster service endpoints.

---

#### Rules & Standards Compliance

- All configurations and code follow the standards defined in:
  - `instructions/`
  - `.cursor/rules/`
- Naming conventions, structure, and security rules are respected across:
  - Dockerfiles
  - Kubernetes manifests
  - Environment configuration

---

#### Output Expectation

Generate a final report containing:
- Confirmation if everything is correctly set up.
- A list of any misconfigurations or issues.
- Recommendations for adjustments to ensure full Minikube compatibility.

---

Let me know if additional checks (e.g. health probes, test pods, CI integration) should be included.


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