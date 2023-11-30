package projetoIES.webapp.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "live_data")
public class LiveData {
    private String flight_number;
    private float latitude;
    private float longitude;
    private float altitude;
    private float direction;
    private float speed;
    private float vertical_speed;
    private String departure_airport;
    private String arrival_airport;
    private String airline_icao;
}
