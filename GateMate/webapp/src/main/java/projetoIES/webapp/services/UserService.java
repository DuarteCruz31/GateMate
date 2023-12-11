package projetoIES.webapp.services;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;

import org.bson.Document;

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

    public void subscribeFlights(User user, String flightIata) {
        FindIterable<Document> flightIataDocument = subscribed_flights.find(new Document("flightIata", flightIata));

        if (flightIataDocument.first() == null) {
            Document doc = new Document("flightIata", flightIata)
                    .append("users", Arrays.asList(user.getEmail()));
            subscribed_flights.insertOne(doc);
        } else {
            subscribed_flights.updateOne(new Document("flightIata", flightIata),
                    Updates.addToSet("users", user.getEmail()));
        }
    }

    public void unsubscribeFlights(User user, String flightIata) {
        subscribed_flights.updateOne(new Document("flightIata", flightIata),
                Updates.pull("users", user.getEmail()));

        FindIterable<Document> flightIataDocument = subscribed_flights.find(new Document("flightIata", flightIata));
        if (flightIataDocument.first().getList("users", String.class).isEmpty()) {
            subscribed_flights.deleteOne(new Document("flightIata", flightIata));
        }
    }

    public boolean isSubscribed(User user, String flightIata) {
        FindIterable<Document> flightIataDocument = subscribed_flights.find(new Document("flightIata", flightIata));

        if (flightIataDocument.first() == null) {
            return false;
        } else {
            return flightIataDocument.first().getList("users", String.class).contains(user.getEmail());
        }
    }
}
