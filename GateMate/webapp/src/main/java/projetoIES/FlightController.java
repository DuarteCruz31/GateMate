package projetoIES;

import lombok.AllArgsConstructor;

import projetoIES.webapp.Flight;
import projetoIES.webapp.FlightService;

import java.util.List;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class FlightController {

    private FlightService flightService;

    @GetMapping("/allflights")
    public List<Flight> getAllFlights() {
      return flightService.getAllFlights();
    }
}
