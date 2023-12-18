/**
 * @file
 * @brief AirportFlight class representing airport-related flight information.
 *
 * @brief AirportFlight class.
 *
 * This class represents airport-related flight information, including IATA and ICAO codes, name, terminal, gate, delay, scheduled time, estimated time, and actual time.
 *
 * @note
 * This class uses Lombok annotations for automatic generation of getters, setters, constructors, and toString methods.
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
public class AirportFlight {
    private String iata;
    private String icao;
    private String name;
    private String terminal;
    private String gate;
    private int delay;
    private String scheduled;
    private String estimated;
    private String actual;
}
