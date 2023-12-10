package projetoIES.webapp.services;

import java.security.SecureRandom;

import java.util.Base64;

import org.springframework.stereotype.Service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

import static com.mongodb.client.model.Projections.*;

import projetoIES.webapp.entities.User;
import projetoIES.webapp.repositories.UserRepository;


@Service
public class UserService {

    private UserRepository repository;
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> subscribed_flights;

    public UserService(UserRepository repository) {
        this.repository = repository;
        this.mongoClient = MongoClients.create("mongodb://mongodb:27017/");
        this.database = mongoClient.getDatabase("my_mongodb_database");
        this.subscribed_flights = database.getCollection("subscribed_flights");

    }

    public void SubscribeFlights (User user, String flightIata) {

        Document doc = new Document("iata", flightIata)
                .append("users", user.getEmail());
        
        if (subscribed_flights.find(doc).first() == null) {
            subscribed_flights.insertOne(doc);
        } else {
            subscribed_flights.updateOne(doc, new Document("$push", new Document("users", user.getEmail())));
        }
    }
    
}
