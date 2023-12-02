package projetoIES.webapp.services;

import java.security.SecureRandom;

import java.util.Base64;
import org.springframework.stereotype.Service;

import projetoIES.webapp.entities.User;
import projetoIES.webapp.repositories.UserRepository;
import redis.clients.jedis.Jedis;

@Service
public class AuthenticationService {
    private UserRepository repository;
    private Jedis jedis;
    private SecureRandom generator;

    public AuthenticationService(UserRepository repository) {
        this.repository = repository;
        this.jedis = new Jedis("redis://redis:6379");
        this.generator = new SecureRandom();
    }

    // get token from user
    public String generateToken(User user) {
        String email = user.getEmail();
        String token = "";
        do {
            byte[] bytes = new byte[32];
            generator.nextBytes(bytes);
            token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
            new SecureRandom().nextBytes(bytes);
        } while (jedis.exists("token:" + token));

        jedis.setex("token:" + token, (long) 2 * 3600, email);
        return token;
    }

    // get user from token
    public User validateToken(String token) {
        if (jedis.exists("token:" + token)) {
            String email = jedis.get("token:" + token);
            return repository.findByEmail(email);
        } else {
            return null;
        }
    }

    public String register(String email, String password) {
        if (repository.existsByEmail(email)) {
            return null;
        } else {
            User user = new User(email, password);
            repository.save(user);
            return this.generateToken(user);
        }
    }

    public String login(String email, String password) {
        User user = repository.findByEmailAndPassword(email, password);
        if (user != null) {
            return this.generateToken(user);
        }
        return null;
    }

    // remove token
    public boolean logout(String token) {
        if (jedis.exists("token:" + token)) {
            jedis.del("token:" + token);
            return true;
        }
        return false;
    }
}
