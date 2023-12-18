/**
 * @file
 * @brief FlightRepository interface for accessing flight data in MongoDB.
 *
 * @brief FlightRepository interface.
 *
 * This interface extends the MongoRepository interface for CRUD operations on Flight entities in MongoDB. It includes a custom query method for finding a flight by its IATA code.
 *
 * @note
 * Adjust the class-level comments based on your specific requirements and the functionality of the repository interface.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

package projetoIES.webapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import projetoIES.webapp.entities.Flight;

public interface FlightRepository extends MongoRepository<Flight, Integer> {
    /**
     * @brief Custom query method to find a flight by its IATA code.
     *
     * @param flightIata Flight IATA code.
     * @return Flight entity with the specified IATA code or null if not found.
     */
    public Flight findByFlightIata(String flightIata);
}
