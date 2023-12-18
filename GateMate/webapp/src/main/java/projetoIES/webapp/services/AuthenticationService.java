/**
 * @file
 * @brief AuthenticationService class providing user authentication services.
 *
 * @brief AuthenticationService class.
 *
 * This class provides user authentication services, including token generation, validation, user registration, user login, and token removal.
 *
 * @note
 * Adjust the class-level comments based on your specific requirements and the functionality of the service.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

package projetoIES.webapp.services;

import java.security.SecureRandom;

import java.util.Base64;
import org.springframework.stereotype.Service;

import projetoIES.webapp.entities.User;
import projetoIES.webapp.repositories.UserRepository;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;

@Service
public class AuthenticationService {
    private UserRepository repository;
    private JedisPool pool;
    private SecureRandom generator;

    /**
     * @brief Constructor for the AuthenticationService class.
     *
     * @param repository UserRepository for accessing user data.
     */

    public AuthenticationService(UserRepository repository) {
        this.repository = repository;
        this.pool = new JedisPool("redis", 6379);
        this.generator = new SecureRandom();
    }

    /**
     * @brief Generate a token for the specified user.
     *
     * @param user User for whom the token is generated.
     * @return Generated token.
     * @throws JedisException If an issue occurs with the Redis database connection.
     */

    // get token from user
    public String generateToken(User user) throws JedisException {
        String email = user.getEmail();
        String token = "";
        try (Jedis jedis = pool.getResource()) {
            do {
                byte[] bytes = new byte[32];
                generator.nextBytes(bytes);
                token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
                new SecureRandom().nextBytes(bytes);
            } while (jedis.exists("token:" + token));

            jedis.setex("token:" + token, (long) 2 * 3600, email);
        }
        return token;

    }

    /**
     * @brief Validate a token and retrieve the associated user.
     *
     * @param token Token to be validated.
     * @return User associated with the token or null if the token is invalid.
     * @throws JedisException If an issue occurs with the Redis database connection.
     */

    // get user from token
    public User validateToken(String token) throws JedisException {
        try (Jedis jedis = pool.getResource()) {
            if (jedis.exists("token:" + token)) {
                String email = jedis.get("token:" + token);
                return repository.findByEmail(email);
            } else {
                return null;
            }
        }
    }

    /**
     * @brief Register a new user with the specified email and password.
     *
     * @param email    User email.
     * @param password User password.
     * @return Generated token for the registered user or null if the user already
     *         exists.
     */

    public String register(String email, String password) {
        if (repository.existsByEmail(email)) {
            return null;
        } else {
            User user = new User(email, password);
            repository.save(user);
            return this.generateToken(user);
        }
    }

    /**
     * @brief Log in a user with the specified email and password.
     *
     * @param email    User email.
     * @param password User password.
     * @return Generated token for the logged-in user or null if login fails.
     */

    public String login(String email, String password) {
        User user = repository.findByEmailAndPassword(email, password);
        if (user != null) {
            return this.generateToken(user);
        }
        return null;
    }

    /**
     * @brief Log out a user by removing the associated token.
     *
     * @param token Token to be removed.
     * @return True if the token was successfully removed, false otherwise.
     * @throws JedisException If an issue occurs with the Redis database connection.
     */

    // remove token
    public boolean logout(String token) throws JedisException {
        try (Jedis jedis = pool.getResource()) {
            if (jedis.exists("token:" + token)) {
                jedis.del("token:" + token);
                return true;
            }
            return false;
        }
    }
}
