package projetoIES.webapp;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class AirportFlight {
    private String airport;
    private String timezone;
    private String iata;
    private String icao;
    private String terminal;
    private String gate;
    private int delay;
    private Timestamp scheduled;
    private Timestamp estimated;
    private Timestamp actual;
    private Timestamp estimated_runway;
    private Timestamp actual_runway;
}
