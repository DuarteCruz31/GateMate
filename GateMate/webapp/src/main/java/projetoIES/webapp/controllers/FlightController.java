/**
 * @file
 * @brief FlightController class for handling flight-related HTTP requests.
 *
 * @brief FlightController class.
 *
 * This class defines RESTful endpoints for managing flight-related operations.
 *
 * @note
 * Ensure the FlightService is properly implemented and injected for handling flight-related business logic.
 *
 * @pre
 * - FlightService is implemented and injected.
 *
 * @warning
 * Adjust the class and method-level comments based on your specific requirements and the functionality of the controller.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

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

  /**
   * @brief Get flight information by IATA code.
   *
   * @param iata IATA code of the flight.
   * @return ResponseEntity containing Flight information or NOT_FOUND status if
   *         not found.
   */
  @GetMapping("/flight/{iata}")
  public ResponseEntity<Flight> getFlightInfo(@PathVariable(value = "iata") String iata) {
    Flight flight = flightService.getFlightInfo(iata);
    if (flight == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
      return new ResponseEntity<>(flight, HttpStatus.OK);
    }
  }

  /**
   * @brief Get filtered flights based on optional parameters.
   *
   * @param from       Departure location (optional).
   * @param to         Arrival location (optional).
   * @param company    Airline company (optional).
   * @param flightIata Flight IATA code (optional).
   * @return ResponseEntity containing a list of filtered flights or NOT_FOUND
   *         status if no flights match the criteria.
   */
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
