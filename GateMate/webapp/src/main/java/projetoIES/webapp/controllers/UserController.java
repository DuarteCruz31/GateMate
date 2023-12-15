package projetoIES.webapp.controllers;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import projetoIES.webapp.entities.Flight;
import projetoIES.webapp.entities.User;
import projetoIES.webapp.services.AuthenticationService;
import projetoIES.webapp.services.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private AuthenticationService auth;
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        String token = auth.login(email, password);
        if (token == null) {
            return new ResponseEntity<>("email or password not found", HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String confirmPassword = body.get("confirmPassword");

        if (!password.equals(confirmPassword)) {
            return new ResponseEntity<>("passwords don't match", HttpStatus.BAD_REQUEST);
        }

        String token = auth.register(email, password);
        if (token == null) {
            return new ResponseEntity<>("email already exists", HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
    }

    @PostMapping("/")
    public ResponseEntity<User> authenticate(@RequestBody Map<String, String> body) {
        String token = body.get("token");

        User user = auth.validateToken(token);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody Map<String, String> body) {
        String token = body.get("token");

        if (auth.logout(token)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/subscribe_flight")
    public ResponseEntity<String> subscribe_flight(@RequestBody Map<String, String> body) {

        String token = body.get("token");
        String flightIata = body.get("flightIata");

        User user = auth.validateToken(token);

        userService.subscribeFlights(user, flightIata);

        if (user == null) {
            return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
        } else {
            userService.subscribeFlights(user, flightIata);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/subscribed_flights")
    public ResponseEntity<ArrayList<Flight>> subscribed_flights(@RequestBody Map<String, String> body) {
        String token = body.get("token");

        User user = auth.validateToken(token);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        ArrayList<Flight> flights = userService.getSubscribedFlights(user);

        if (flights == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(flights, HttpStatus.OK);
        }

    }

    @PostMapping("/unsubscribe_flight")
    public ResponseEntity<String> unsubscribe_flight(@RequestBody Map<String, String> body) {

        String token = body.get("token");
        String flightIata = body.get("flightIata");

        User user = auth.validateToken(token);

        if (user == null) {
            return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
        } else {
            userService.unsubscribeFlights(user, flightIata);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/is_subscribed")
    public ResponseEntity<String> is_subscribed(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String flightIata = body.get("flightIata");

        User user = auth.validateToken(token);

        if (user == null) {
            return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
        }

        boolean isSubscribed = userService.isSubscribed(user, flightIata);

        if (!isSubscribed) {
            return new ResponseEntity<>("User not subscribed", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
