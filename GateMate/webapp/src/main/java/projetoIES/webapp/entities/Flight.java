/**
 * @file
 * @brief Flight class representing flight-related information.
 *
 * @brief Flight class.
 *
 * This class represents flight-related information, including an identifier, flight number, IATA code, departure and arrival airport information, airline IATA and ICAO codes, airline name, aircraft registration, live data, and the last update timestamp.
 *
 * @note
 * This class uses Lombok annotations for automatic generation of getters, setters, constructors, and toString methods. It is also annotated for MongoDB document mapping.
 *
 * @warning
 * Adjust the class-level comments based on your specific requirements and the functionality of the entity.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

package projetoIES.webapp.entities;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "flights")
public class Flight {
    @Id
    private ObjectId id;
    private String flightNumber;
    private String flightIata;
    @Field("departure")
    private AirportFlight departure;
    @Field("arrival")
    private AirportFlight arrival;
    private String airlineIata;
    private String airlineIcao;
    private String airlineName;
    private String aircraftRegistration;
    @Field("live_data")
    private LiveData liveData;
    private long updated;

    /**
     * @brief Constructor for object mapping from API response.
     *
     * @param json     API response in JSON format.
     * @param id       MongoDB ObjectId.
     * @param liveData LiveData object.
     */

    // object mapping from api response
    public Flight(JsonNode json, ObjectId id, LiveData liveData) {
        this.id = id;
        this.flightNumber = json.get("flight_number").asText();
        this.flightIata = json.get("flight_iata").asText();
        this.airlineIata = json.get("airline_iata").asText();
        this.airlineIcao = json.get("airline_icao").asText();
        this.airlineName = json.get("airline_name").asText();
        this.aircraftRegistration = json.get("reg_number").asText();
        this.updated = System.currentTimeMillis();

        // no need to change the live data
        this.liveData = liveData;
        departure = new AirportFlight();
        departure.setIata(json.get("dep_iata").asText());
        departure.setIcao(json.get("dep_icao").asText());
        departure.setName(json.get("dep_name").asText());
        departure.setTerminal(json.get("dep_terminal").asText());
        departure.setGate(json.get("dep_gate").asText());
        departure.setDelay(json.get("dep_delayed").asInt(0));
        departure.setScheduled(json.get("dep_time_ts").asText());
        departure.setActual(json.get("dep_actual_ts").asText());
        departure.setEstimated(json.get("dep_estimated_ts").asText(departure.getActual()));

        arrival = new AirportFlight();
        arrival.setIata(json.get("arr_iata").asText());
        arrival.setIcao(json.get("arr_icao").asText());
        arrival.setName(json.get("arr_name").asText());
        arrival.setTerminal(json.get("arr_terminal").asText());
        arrival.setGate(json.get("arr_gate").asText());
        arrival.setDelay(json.get("arr_delayed").asInt(0));
        arrival.setScheduled(json.get("arr_time_ts").asText());
        arrival.setActual(json.get("dep_actual_ts").asText());
        arrival.setEstimated(json.get("dep_estimated_ts").asText(arrival.getActual()));
    }

    /**
     * @brief Constructor for creating a Flight object with minimal information.
     *
     * @param flightIata    Flight IATA code.
     * @param departureIata Departure airport IATA code.
     * @param arrivalIata   Arrival airport IATA code.
     * @param airlineName   Airline name.
     * @param lastUpdate    Timestamp of the last update.
     */

    public Flight(String flightIata, String departureIata, String arrivalIata, String airlineName, long lastUpdate) {
        this.flightIata = flightIata;
        this.departure = new AirportFlight();
        this.departure.setIata(departureIata);
        this.arrival = new AirportFlight();
        this.arrival.setIata(arrivalIata);
        this.airlineName = airlineName;
        this.updated = lastUpdate;
    }
}
