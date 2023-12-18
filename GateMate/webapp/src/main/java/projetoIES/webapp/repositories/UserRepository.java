/**
 * @file
 * @brief UserRepository interface for accessing user data in MongoDB.
 *
 * @brief UserRepository interface.
 *
 * This interface extends the MongoRepository interface for CRUD operations on User entities in MongoDB. It includes custom query methods for finding a user by email and password, finding a user by email, and checking if a user exists by email.
 *
 * @note
 * Adjust the class-level comments based on your specific requirements and the functionality of the repository interface.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

package projetoIES.webapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import projetoIES.webapp.entities.User;

public interface UserRepository extends MongoRepository<User, Integer> {
    /**
     * @brief Custom query method to find a user by email and password.
     *
     * @param email    User email.
     * @param password User password.
     * @return User entity with the specified email and password or null if not
     *         found.
     */
    User findByEmailAndPassword(String email, String password);

    /**
     * @brief Custom query method to find a user by email.
     *
     * @param email User email.
     * @return User entity with the specified email or null if not found.
     */
    User findByEmail(String email);

    /**
     * @brief Check if a user exists by email.
     *
     * @param email User email.
     * @return True if a user with the specified email exists, false otherwise.
     */
    boolean existsByEmail(String email);
}
