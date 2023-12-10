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

# Spring Configuration
SPRING_PORT=8080

# React Configuration
REACT_PORT=3000

# Email Configuration
EMAIL=my_email@example.com
EMAIL_PASSWORD=my_email_password

# API Key Configuration
API_KEY=api_key

# Flight Tracker API key
FLIGHT_TRACKER_API_KEY=flight_tracker_api_key
```

After that, run the following commands:

```bash
docker-compose build
```

```bash
docker-compose up
```

## Documentation:
* [Arquitecture](docs/arquitecture.md)