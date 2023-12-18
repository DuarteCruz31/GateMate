/**
 * @file
 * @brief LiveData class representing live data of a flight.
 *
 * @brief LiveData class.
 *
 * This class represents live data of a flight, including latitude, longitude, altitude, direction, speed, and vertical speed.
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
public class LiveData {
    private float latitude;
    private float longitude;
    private float altitude;
    private float direction;
    private float speed;
    private float vertical_speed;
}
