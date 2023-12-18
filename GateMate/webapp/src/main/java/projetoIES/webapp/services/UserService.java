/**
 * @file
 * @brief UserService class providing user-related services.
 *
 * @brief UserService class.
 *
 * This class provides services related to users, including subscription management and retrieval of subscribed flights.
 *
 * @note
 * Adjust the class-level comments based on your specific requirements and the functionality of the service.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

package projetoIES.webapp.services;

import java.util.ArrayList;
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
import projetoIES.webapp.entities.Flight;

@Service
public class UserService {

    private UserRepository repository;
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> subscribed_flights;

    /**
     * @brief Constructor for the UserService class.
     *
     * @param repository UserRepository for accessing user data.
     */

    public UserService(UserRepository repository) {
        this.repository = repository;
        this.mongoClient = MongoClients.create("mongodb://mongodb:27017/");
        this.database = mongoClient.getDatabase("my_mongodb_database");
        this.subscribed_flights = database.getCollection("subscribed_flights");
    }

    /**
     * @brief Subscribe a user to a flight.
     *
     * @param user       User to be subscribed.
     * @param flightIata Flight IATA code.
     */

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

    /**
     * @brief Unsubscribe a user from a flight.
     *
     * @param user       User to be unsubscribed.
     * @param flightIata Flight IATA code.
     */

    public void unsubscribeFlights(User user, String flightIata) {
        subscribed_flights.updateOne(new Document("flightIata", flightIata),
                Updates.pull("users", user.getEmail()));

        FindIterable<Document> flightIataDocument = subscribed_flights.find(new Document("flightIata", flightIata));
        if (flightIataDocument.first().getList("users", String.class).isEmpty()) {
            subscribed_flights.deleteOne(new Document("flightIata", flightIata));
        }
    }

    /**
     * @brief Check if a user is subscribed to a flight.
     *
     * @param user       User to check subscription for.
     * @param flightIata Flight IATA code.
     * @return True if the user is subscribed, false otherwise.
     */

    public boolean isSubscribed(User user, String flightIata) {
        FindIterable<Document> flightIataDocument = subscribed_flights.find(new Document("flightIata", flightIata));

        if (flightIataDocument.first() == null) {
            return false;
        } else {
            return flightIataDocument.first().getList("users", String.class).contains(user.getEmail());
        }
    }

    /**
     * @brief Get the list of flights to which a user is subscribed.
     *
     * @param user User for whom to retrieve subscribed flights.
     * @return ArrayList of subscribed flights.
     */

    public ArrayList<Flight> getSubscribedFlights(User user) {
        String email = user.getEmail();
        FindIterable<Document> flightsWithSubscribers = subscribed_flights.find();

        ArrayList<Flight> flights = new ArrayList<Flight>();

        for (Document flight : flightsWithSubscribers) {
            String flightIata = flight.getString("flightIata");

            if (flight.getList("users", String.class).contains(email)) {
                // ir buscar o voo a api
                MongoCollection<Document> allFlights = database.getCollection("flights");
                FindIterable<Document> flightDocument = allFlights.find(new Document("flightIata", flightIata));

                if (flightDocument.first() != null) {
                    for (Document document : flightDocument) {
                        Document departure = document.get("departure", Document.class);
                        String departureIata = departure.getString("iata");
                        Document arrival = document.get("arrival", Document.class);
                        String arrivalIata = arrival.getString("iata");
                        String airlineName = document.getString("airlineName");
                        long lastUpdate = document.getLong("updated");

                        Flight flightObject = new Flight(flightIata, departureIata, arrivalIata, airlineName,
                                lastUpdate);
                        flights.add(flightObject);
                    }
                }
            }

        }

        return flights;
    }
}