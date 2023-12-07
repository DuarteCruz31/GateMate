package projetoIES.webapp.entities;

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

    // object mapping from api response
    public Flight(JsonNode json, ObjectId id, LiveData liveData) {
        System.err.println("json: " + json.toPrettyString());
        this.id = id;
        this.flightNumber = json.get("flight_number").asText();
        this.flightIata = json.get("flight_iata").asText();
        this.airlineIata = json.get("airline_iata").asText();
        this.airlineIcao = json.get("airline_icao").asText();
        this.airlineName = json.get("airline_name").asText();
        this.aircraftRegistration = json.get("reg_number").asText();
        // no need to change the live data
        this.liveData = liveData;
        departure = new AirportFlight();
        departure.setIata(json.get("dep_iata").asText());
        departure.setIcao(json.get("dep_icao").asText());
        departure.setName(json.get("dep_name").asText());
        departure.setTerminal(json.get("dep_terminal").asText());
        departure.setGate(json.get("dep_gate").asText());
        departure.setDelay(json.get("dep_delayed").asInt(0));
        departure.setActual(json.get("dep_time").asText());
        departure.setEstimated(json.get("dep_estimated").asText(departure.getActual()));

        arrival = new AirportFlight();
        arrival.setIata(json.get("arr_iata").asText());
        arrival.setIcao(json.get("arr_icao").asText());
        arrival.setName(json.get("arr_name").asText());
        arrival.setTerminal(json.get("arr_terminal").asText());
        arrival.setGate(json.get("arr_gate").asText());
        arrival.setDelay(json.get("arr_delayed").asInt(0));
        arrival.setActual(json.get("arr_time").asText());
        arrival.setEstimated(json.get("arr_estimated").asText(arrival.getActual()));
    }
}
