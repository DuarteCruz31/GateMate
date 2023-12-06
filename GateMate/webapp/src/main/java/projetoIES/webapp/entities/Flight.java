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

    public Flight(JsonNode json, LiveData liveData) {
        System.err.println("json: " + json.toPrettyString());
        this.flightNumber = json.get("flightNumber").asText();
        this.flightIata = json.get("flightIata").asText();
        this.airlineIata = json.get("airlineIata").asText();
        this.airlineIcao = json.get("airlineIcao").asText();
        this.airlineName = json.get("airlineName").asText();
        this.aircraftRegistration = json.get("aircraftRegistration").asText();
        // no need to change the live data
        this.liveData = liveData;
        departure = new AirportFlight();
        departure.setIata(json.get("departure.iata").asText());
        departure.setIcao(json.get("departure.icao").asText());
        departure.setTerminal(json.get("departure.terminal").asText());
        departure.setGate(json.get("departure.gate").asText());
        departure.setDelay(json.get("departure.delay").asInt());
        departure.setScheduled(json.get("departure.scheduled").asText());
        departure.setActual(json.get("departure.actual").asText());
        departure.setEstimated(json.get("departure.estimated").asText(departure.getActual()));

        arrival = new AirportFlight();
        arrival.setIata(json.get("arrival.iata").asText());
        arrival.setIcao(json.get("arrival.icao").asText());
        arrival.setTerminal(json.get("arrival.terminal").asText());
        arrival.setGate(json.get("arrival.gate").asText());
        arrival.setDelay(json.get("arrival.delay").asInt());
        arrival.setScheduled(json.get("arrival.scheduled").asText());
        arrival.setActual(json.get("arrival.actual").asText());
        arrival.setEstimated(json.get("departure.estimated").asText(arrival.getActual()));
    }
}
