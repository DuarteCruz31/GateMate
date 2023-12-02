package projetoIES.webapp.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AirportFlight {
    private String iata;
    private String icao;
    private String terminal;
    private String gate;
    private int delay;
    private String scheduled;
    private String estimated;
    private String actual;
}
