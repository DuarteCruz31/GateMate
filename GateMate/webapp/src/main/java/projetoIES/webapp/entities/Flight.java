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
        if (json.has("flight_number")) {
            this.flightNumber = json.get("flight_number").asText();
        } else {
            this.flightNumber = "";
        }
        if (json.has("flight_iata")) {
            this.flightIata = json.get("flight_iata").asText();
        } else {
            this.flightIata = "";
        }
        if (json.has("airline_iata")) {
            this.airlineIata = json.get("airline_iata").asText();
        } else {
            this.airlineIata = "";
        }
        if (json.has("airline_icao")) {
            this.airlineIcao = json.get("airline_icao").asText();
        } else {
            this.airlineIcao = "";
        }
        if (json.has("airline_name")) {
            this.airlineName = json.get("airline_name").asText();
        } else {
            this.airlineName = "";
        }
        if (json.has("reg_number")) {
            this.aircraftRegistration = json.get("reg_number").asText();
        } else {
            this.aircraftRegistration = "";
        }
        this.updated = System.currentTimeMillis();

        // no need to change the live data
        this.liveData = liveData;
        departure = new AirportFlight();
        if (json.has("dep_iata")) {
            departure.setIata(json.get("dep_iata").asText());
        } else {
            departure.setIata("");
        }
        if (json.has("dep_icao")) {
            departure.setIcao(json.get("dep_icao").asText());
        } else {
            departure.setIcao("");
        }
        if (json.has("dep_name")) {
            departure.setName(json.get("dep_name").asText());
        } else {
            departure.setName("");
        }
        if (json.has("dep_terminal")) {
            departure.setTerminal(json.get("dep_terminal").asText());
        } else {
            departure.setTerminal("");
        }
        if (json.has("dep_gate")) {
            departure.setGate(json.get("dep_gate").asText());
        } else {
            departure.setGate("");
        }
        if (json.has("dep_delayed")) {
            departure.setDelay(json.get("dep_delayed").asInt(0));
        } else {
            departure.setDelay(0);
        }
        if (json.has("dep_time_ts")) {
            departure.setScheduled(json.get("dep_time_ts").asText());
        } else {
            departure.setScheduled("");
        }
        if (json.has("dep_actual_ts")) {
            departure.setActual(json.get("dep_actual_ts").asText());
        } else {
            departure.setActual("");
        }
        if (json.has("dep_estimated_ts")) {
            departure.setEstimated(json.get("dep_estimated_ts").asText());
        } else {
            departure.setEstimated("");
        }

        arrival = new AirportFlight();
        if (json.has("arr_iata")) {
            arrival.setIata(json.get("arr_iata").asText());
        } else {
            arrival.setIata("");
        }
        if (json.has("arr_icao")) {
            arrival.setIcao(json.get("arr_icao").asText());
        } else {
            arrival.setIcao("");
        }
        if (json.has("arr_name")) {
            arrival.setName(json.get("arr_name").asText());
        } else {
            arrival.setName("");
        }
        if (json.has("arr_terminal")) {
            arrival.setTerminal(json.get("arr_terminal").asText());
        } else {
            arrival.setTerminal("");
        }
        if (json.has("arr_gate")) {
            arrival.setGate(json.get("arr_gate").asText());
        } else {
            arrival.setGate("");
        }
        if (json.has("arr_delayed")) {
            arrival.setDelay(json.get("arr_delayed").asInt(0));
        } else {
            arrival.setDelay(0);
        }
        if (json.has("arr_time_ts")) {
            arrival.setScheduled(json.get("arr_time_ts").asText());
        } else {
            arrival.setScheduled("");
        }
        if (json.has("arr_actual_ts")) {
            arrival.setActual(json.get("arr_actual_ts").asText());
        } else {
            arrival.setActual("");
        }
        if (json.has("arr_estimated_ts")) {
            arrival.setEstimated(json.get("arr_estimated_ts").asText());
        } else {
            arrival.setEstimated("");
        }
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
