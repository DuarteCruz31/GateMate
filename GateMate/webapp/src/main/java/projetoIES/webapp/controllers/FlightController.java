package projetoIES.webapp.controllers;

import lombok.AllArgsConstructor;

import projetoIES.webapp.entities.Flight;
import projetoIES.webapp.services.FlightService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/")
public class FlightController {

  private FlightService flightService;

  @GetMapping("/flight/{iata}")
  public ResponseEntity<Flight> getFlightInfo(@PathVariable(value = "iata") String iata) {
    Flight flight = flightService.getFlightInfo(iata);
    if (flight == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
      return new ResponseEntity<>(flight, HttpStatus.OK);
    }
  }

  @GetMapping("/allflights")
  public ResponseEntity<List<Flight>> getFilteredFlights(
      @RequestParam(name = "from", required = false) String from,
      @RequestParam(name = "to", required = false) String to,
      @RequestParam(name = "company", required = false) String company,
      @RequestParam(name = "flightIata", required = false) String flightIata) {

    List<Flight> filteredFlights = flightService.getFilteredFlightsAllFlights(from, to, company, flightIata);

    if (filteredFlights.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
      return new ResponseEntity<>(filteredFlights, HttpStatus.OK);
    }
  }

}
