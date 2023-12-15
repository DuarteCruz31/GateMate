# GATE MATE

## HOW TO RUN

In this directory create a .env file with the following variables:

```bash
# .env file
# MongoDB Configuration
MONGODB_USER=my_mongodb_user
MONGODB_PASSWORD=my_mongodb_password
MONGODB_DATABASE=my_mongodb_database

# RabbitMQ Configuration
RABBITMQ_USER=my_rabbitmq_user
RABBITMQ_PASSWORD=my_rabbitmq_password
RABBITMQ_MANAGEMENT_PORT=15672

# Nginx Configuration
NGINX_PORT=8080

# Spring Configuration
SPRING_PORT=8081

# React Configuration
FRONTEND_PORT=8082

# Email Configuration
EMAIL=my_email@example.com
EMAIL_PASSWORD=my_email_password

# API Key Configuration
API_KEY=your_api_key

FETCH_INTERVAL = 5 # in minutes
```

After that, run the following commands:

```bash
docker-compose up
open http://localhost:8080
```

## Documentation:

- [Arquitecture](docs/arquitecture.md)
