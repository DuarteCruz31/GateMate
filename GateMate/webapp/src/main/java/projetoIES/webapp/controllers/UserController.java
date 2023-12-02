package projetoIES.webapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import projetoIES.webapp.entities.User;
import projetoIES.webapp.services.AuthenticationService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    private AuthenticationService auth;

    @PostMapping("/login")
    public ResponseEntity<String> login(String username, String password) {
        String token = auth.login(username, password);
        if (token == null) {
            return new ResponseEntity<>("email or password not found", HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(String username, String password) {
        String token = auth.register(username, password);
        if (token == null) {
            return new ResponseEntity<>("email already exists", HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
    }

    @GetMapping("/")
    public ResponseEntity<User> authenticate(String token) {
        User user = auth.validateToken(token);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(String token) {
        if (auth.logout(token)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
