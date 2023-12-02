package projetoIES.webapp.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import projetoIES.webapp.entities.Flight;

public interface FlightRepository extends MongoRepository<Flight, Integer> {
    public Flight findByFlightIata(String flightIata);
}
