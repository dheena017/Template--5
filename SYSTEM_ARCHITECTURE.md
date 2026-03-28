# System Architecture Overview - Template 5

This document outlines the high-level infrastructure design for **Template 5**. The architecture is designed for maximum scalability and performance using a multi-tiered cloud-native approach.

## Diagram

```mermaid
graph TD
    subgraph Edge ["Edge Layer (CDN)"]
        CDN[CloudFront / Cloudflare]
    end

    subgraph Frontend ["Frontend (Static)"]
        S3[S3 / Object Storage]
    end

    subgraph Entry ["API Gateway / Load Balancer"]
        AGW[API Gateway / NLB]
    end

    subgraph Execution ["Compute Layer (Hybrid Hub)"]
        WASM[Client-Side Processors <br/>(JS / WebAssembly)]
        LAMBDA[Serverless Functions <br/>(AWS Lambda)]
        EKS[Microservices <br/>(EKS / ECS / K8s)]
    end

    subgraph Infrastructure ["Shared Services Layer"]
        REDIS[(Redis Cache / MemoryDB)]
        DB[(PostgreSQL / RDS)]
        STORAGE[(S3 Storage / Object Hub)]
        QUEUE[(SQS / Event Queue)]
        MEMCACHED[(Memcached Cluster)]
    end

    %% Flow
    Users --> CDN
    CDN --> S3
    CDN --> AGW
    
    %% Compute Distribution
    AGW --> WASM
    AGW --> LAMBDA
    AGW --> EKS

    %% Backend Shared
    WASM --> REDIS
    WASM --> STORAGE
    
    LAMBDA --> REDIS
    LAMBDA --> DB
    LAMBDA --> STORAGE
    LAMBDA --> QUEUE

    EKS --> DB
    EKS --> STORAGE
    EKS --> QUEUE
    EKS --> MEMCACHED
```

## Architectural Layers

### 1. Edge Layer (CDN)
The **CloudFront / Cloudflare** layer manages global content delivery. It handles TLS termination, DDoS protection (WAF), and edge-caching for static assets.

### 2. Frontend Layer (Static)
The React/Vite application is compiled into static assets and stored in **AWS S3** or equivalent object storage. This ensures high availability and cost-effective serving at scale.

### 3. Entry & Control Layer
The **API Gateway / Load Balancer** acts as the single entry point for all dynamic requests. It manages:
- Authentication & Authorization (JWT).
- Rate Limiting.
- Request routing between Serverless and Microservices tiers.

### 4. Hybrid Compute Layer
To maximize efficiency, the architecture distributes workloads across three specialized compute paths:
- **Client-Side (WebAssembly/JS):** Heavy document processing (like the PDF tools) is offloaded to the user's browser whenever possible to save server costs and improve privacy.
- **Serverless (Lambda):** Short-lived, event-driven backend logic (auth, simple CRUD, notifications) to minimize idle costs.
- **Microservices (EKS/ECS):** Containerized long-running tasks or heavy compute (AI/ML, complex data transformations) that require dedicated, persistent resources.

### 5. Shared Services Layer
The backbone of the application consists of optimized managed services:
- **Redis/Memcached:** High-speed data caching and session management.
- **PostgreSQL (RDS):** Transactional data storage with high consistency.
- **S3 Storage:** Permanent storage for user uploads and generated assets.
- **SQS/Queue:** Decoupling long-running backend processes for asynchronous execution.

---
*Created for Template 5 Architecture Documentation*
