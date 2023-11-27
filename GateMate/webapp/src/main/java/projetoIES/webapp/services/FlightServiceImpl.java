package projetoIES.webapp.services;

import lombok.AllArgsConstructor;
import projetoIES.webapp.entities.Flight;
import projetoIES.webapp.repositories.FlightRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FlightServiceImpl implements FlightService {

    private FlightRepository flightRepository;

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
}
