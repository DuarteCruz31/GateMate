package projetoIES.webapp.entities;

import java.sql.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "flights")
@Getter
@Setter
@NoArgsConstructor
public class Flight {
    private int flight_number;
    private Date flight_date;
    @Field("departure")
    private List<AirportFlight> departure;
    @Field("arrival")
    private List<AirportFlight> arrival;

    private String airline_name;
    private String aircraft_registration;

    @Field("live_data")
    private LiveData live_data;
}
