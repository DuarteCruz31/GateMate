package projetoIES.webapp;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightRepository extends MongoRepository<Flight, Integer> {
    List<Flight> findAll();
}
