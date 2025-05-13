# Kubernetes Deployment Guide for TechSaloniki Application

This guide explains how to deploy the TechSaloniki application on Minikube.

## Prerequisites

- Minikube installed and running
- kubectl configured to use Minikube
- Docker installed

## Build Docker Images

First, build the Docker images for both frontend and backend:

```bash
# Build backend image
cd ../backend
docker build -t techsaloniki-backend:latest .

# Build frontend image
cd ../frontend
docker build -t techsaloniki-frontend:latest .
```

## Deploy the Application

1. Create the MySQL Secret and ConfigMaps:
```bash
kubectl apply -f mysql-secret.yaml
kubectl apply -f backend-configmap.yaml
kubectl apply -f frontend-configmap.yaml
```

2. Create MySQL PersistentVolume and PersistentVolumeClaim:
```bash
kubectl apply -f mysql-pv.yaml
```

3. Deploy MySQL:
```bash
kubectl apply -f mysql-deployment.yaml
```

4. Deploy the Backend:
```bash
kubectl apply -f backend-deployment.yaml
```

5. Deploy the Frontend:
```bash
kubectl apply -f frontend-deployment.yaml
```

## Access the Application

To access the frontend application:

```bash
minikube service frontend
```

This will open the application in your default browser.

## Verify Deployment

Check the status of all deployments:

```bash
kubectl get pods
kubectl get services
```

## Cleanup

To remove all resources:

```bash
kubectl delete -f .
``` 