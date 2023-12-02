package projetoIES.webapp.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Document(collection = "flights")
public class Flight {
    private int flight_number;
    private String flight_iata;
    @Field("departure")
    private AirportFlight departure;
    @Field("arrival")
    private AirportFlight arrival;
    private String airline_iata;
    private String aircraft_registration;
    @Field("live_data")
    private LiveData live_data;

    //object mapping from api response
    public Flight(JsonNode json, LiveData live_data){
        this.flight_number=json.get("flight_number").asInt();
        this.flight_iata=json.get("flight_iata").asText();
        this.airline_iata=json.get("airline_iata").asText();
        this.aircraft_registration=json.get("reg_number").asText();
        //no need to change the live data
        this.live_data=live_data;
        departure=new AirportFlight();
        departure.setIata(json.get("dep_iata").asText());
        departure.setIcao(json.get("dep_icao").asText());
        departure.setTerminal(json.get("dep_terminal").asText());
        departure.setGate(json.get("dep_gate").asText());
        departure.setDelay(json.get("dep_delayed").asInt(0));
        departure.setActual(json.get("dep_time").asText());
        departure.setEstimated(json.get("dep_estimated").asText(departure.getActual()));

        arrival=new AirportFlight();
        arrival.setIata(json.get("arr_iata").asText());
        arrival.setIcao(json.get("arr_icao").asText());
        arrival.setTerminal(json.get("arr_terminal").asText());
        arrival.setGate(json.get("arr_gate").asText());
        arrival.setDelay(json.get("arr_delayed").asInt(0));
        arrival.setActual(json.get("arr_time").asText());
        arrival.setEstimated(json.get("arr_estimated").asText(arrival.getActual()));        
    }
}
