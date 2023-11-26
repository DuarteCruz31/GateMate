package projetoIES.webapp;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class FlightImpl implements FlightService{

    private FlightRepository flightRepository;

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
}
