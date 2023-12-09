# Arquitecture

## Introduction

![Arquitecture diagram](<../../reports/resources/Arquitecture Diagram.png>)
When looking at the architectural view of the system we can divide into 4 main groups:

* The External API, a 3rd party API that gathers flight-related info.
* The Database Group that handles the extraction, processing and saving of the information from the API.
* The Web Application layer that deals with handling use requests and presenting the information in the browser. It uses a MVC arquitecture.
* The Notification manager that handles the email notifications.
These groups are connected together using a rabbitMQ message broker.

## Individual components

### RabbitMQ

Message broker that connects the components of the Application

### Live Data Consumer

Regularly fetches data from the API regarding the live flight tracking. It was implemented in python and currently is restricted to a smaller group of companies to reduce the number of calls

### Database Adaptor

Consumes the data sent by the Live Data COnsumer over AMQP, processes it and stores it in a database.

### Database

A MongoDB that stores data and serves as the Model of the Web App.
MongoDB was chosen as the API responses were JSON objects, so using a JSON-like database reduces the amount of processing needed. It also supports "lazy fetching" (only fetching per-item information like flight info when someone requests it).

### Spring(Webapp)

The Controller of the Web App. It handles most of the "backend" of the Web App, handling the fetching of information from the Model, authentication and flight subscription. Java Spring was used as Spring Boot allows us to easily make a REST API and Spring Data abstracts us from query construction.

### Frontend

A React-based that serves as the View of the Web App. It mainly fetches data from the Controller using a REST API and displays it using HTML pages. React was used mainly because of the developer's personal preference and due to having past experience using it

### Cache

A small cache used for session token management and tracking wether or not the flight information has been recently updated.
Redis was used due to being a small and simple in-memory key-value store that is well suited for caching.

### Notification Manager

The notification manager handles sending email notifications to the client when the flight they are subscribed to is about to depart. This component consumes events trough AMQP and consumes from the database to fetch missing info/ check for delays. Python was used due it's simple syntax and lack of boilerplate code.

## Folder Locations

* [WebApp](https://github.com/DuarteCruz31/GateMate/tree/main/GateMate/webapp)
* [Frontend](https://github.com/DuarteCruz31/GateMate/tree/main/GateMate/frontend)
* [Database Adaptor](https://github.com/DuarteCruz31/GateMate/tree/main/GateMate/database_adaptor)
* [Live Data Consumer](https://github.com/DuarteCruz31/GateMate/tree/main/GateMate/live_data_consumer)