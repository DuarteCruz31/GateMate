package projetoIES.webapp.services;

import java.security.SecureRandom;

import java.util.Base64;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import projetoIES.webapp.entities.User;
import projetoIES.webapp.repositories.UserRepository;
import redis.clients.jedis.Jedis;

@Service
public class AuthenticationService {
    private UserRepository repository;
    private Jedis jedis;
    private SecureRandom generator;

    public AuthenticationService(UserRepository repository){
        this.repository=repository;
        this.jedis=new Jedis("redis://redis:6379");
        this.generator=new SecureRandom();
    }

    public String generateToken(User user){
        String email=user.getEmail();
        String token="";
        do{
            byte[] bytes = new byte[32];
            generator.nextBytes(bytes);
            token=Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
            new SecureRandom().nextBytes(bytes);
        }while(jedis.exists("token:"+token));

        jedis.setex("token:"+token,(long)2*3600,email);
        return token;
    }

    public User validateToken(String token){
        if(jedis.exists("token:"+token)){
            String email=jedis.get("token:"+token);
            return repository.findByEmail(email);
        }else{
            return null;
        }
    }

    public User register(String email,String password){
        if(repository.existsByEmail(email)){
            return null;
        }else{
        }
    }

    public void logout(String token){
        jedis.del("token:"+token);
    }
}
