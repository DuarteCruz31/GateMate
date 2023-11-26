package projetoIES.webapp.controllers;

import lombok.AllArgsConstructor;

import projetoIES.webapp.entities.Flight;
import projetoIES.webapp.services.FlightService;

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
