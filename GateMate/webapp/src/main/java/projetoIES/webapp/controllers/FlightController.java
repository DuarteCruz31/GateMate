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
@RequestMapping("/api")
public class FlightController {

  private FlightService flightService;

  @GetMapping("/allflights")
  public List<Flight> getAllFlights() {
    return flightService.getAllFlights();
  }

  @GetMapping("/flight/{iata}")
  public ResponseEntity<Flight> getFlightInfo(@PathVariable(value="iata") String iata){
    Flight flight=flightService.getFlightInfo(iata);
    if(flight==null){
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }else{
      return new ResponseEntity<>(flight,HttpStatus.OK);
    }
  }
}
