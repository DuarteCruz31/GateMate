package projetoIES.webapp.entities;

import lombok.Data;

@Data
public class AirportFlight {
    private String airport;
    private String timezone;
    private String iata;
    private String icao;
    private String terminal;
    private String gate;
    private int delay;
    private String scheduled;
    private String estimated;
    private String actual;
    private String estimated_runway;
    private String actual_runway;
}
