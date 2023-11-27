package projetoIES.webapp.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "flights")
public class Flight {
    private int flight_number;
    private String flight_date;
    @Field("departure")
    private AirportFlight departure;
    @Field("arrival")
    private AirportFlight arrival;
    private String airline_name;
    private String aircraft_registration;
    @Field("live_data")
    private LiveData live_data;
}
