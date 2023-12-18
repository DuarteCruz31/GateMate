/**
 * @file
 * @brief User class representing user-related information.
 *
 * @brief User class.
 *
 * This class represents user-related information, including email and password. It is annotated for MongoDB document mapping.
 *
 * @note
 * This class uses Lombok annotations for automatic generation of getters, setters, constructors, and toString methods. It is also annotated for MongoDB document mapping.
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

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    private String email;
    private String password;
}
