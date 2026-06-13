```markdown
# Microservices Cloud-Native 

Architecture distribuée avec deux microservices Express.js orchestrés sur Kubernetes.
```
```
## Structure du projet


monorepo-tp/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── user-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── product-service/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── k8s/
│   ├── user-service-deployment.yaml
│   ├── user-service-service.yaml
│   ├── product-service-deployment.yaml
│   └── product-service-service.yaml
└── README.md
```

## Services

| Service | Port | Endpoint |
|---|---|---|
| user-service | 3001 | GET /users |
| product-service | 3002 | GET /products |

## Prérequis

- Docker
- Node.js 20+
- kubectl
- Kind

## Lancer en local

```bash
# user-service
cd user-service
npm install
npm start

# product-service
cd product-service
npm install
npm start
```

## Docker

```bash
docker build -t user-service:v1.0 ./user-service
docker build -t product-service:v1.0 ./product-service
```

## Déploiement Kubernetes (Kind)

```bash
# Créer le cluster
kind create cluster --name tp-cluster

# Charger les images
kind load docker-image user-service:v1.0 --name tp-cluster
kind load docker-image product-service:v1.0 --name tp-cluster

# Appliquer les manifestes
kubectl apply -f k8s/

# Vérifier les pods
kubectl get pods
```

## CI/CD

Le pipeline se déclenche automatiquement à chaque `git push` sur `main`.

### Secrets GitHub requis

| Secret | Description |
|---|---|
| `SSH_HOST` | `ssh.host_lightning.ai` |
| `SSH_USER` | Votre identifiant Lightning AI |
| `SSH_PRIVATE_KEY` | Clé privée SSH (`~/.ssh/id_ed25519`) |

## Endpoints

```bash
curl http://localhost:8081/users
curl http://localhost:8082/products
curl http://localhost:8081/health
curl http://localhost:8082/health
```
```
