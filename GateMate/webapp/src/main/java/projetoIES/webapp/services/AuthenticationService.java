package projetoIES.webapp.services;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import projetoIES.webapp.repositories.UserRepository;

@Service
public class AuthenticationService {
    private UserRepository repository;

    public AuthenticationService(UserRepository repository){
        this.repository=repository;
        
    }

    public User authenticate(String token);
    public 
}
