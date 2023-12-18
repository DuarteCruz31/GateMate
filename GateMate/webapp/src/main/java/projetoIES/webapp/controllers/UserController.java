/**
 * @file
 * @brief UserController class for handling user-related HTTP requests.
 *
 * @brief UserController class.
 *
 * This class defines RESTful endpoints for managing user-related operations such as login, registration, authentication, logout, flight subscription, and query operations related to subscribed flights.
 *
 * @note
 * Ensure the AuthenticationService and UserService are properly implemented and injected for handling user-related business logic.
 *
 * @pre
 * - AuthenticationService and UserService are implemented and injected.
 *
 * @warning
 * Adjust the class and method-level comments based on your specific requirements and the functionality of the controller.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

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
@RequestMapping("/user")
public class UserController {
    private AuthenticationService auth;
    private UserService userService;

    /**
     * @brief Authenticate user based on provided email and password.
     *
     * @param body Map containing email and password.
     * @return ResponseEntity containing authentication token or UNAUTHORIZED status
     *         if not authenticated.
     */

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        String token = auth.login(email, password);
        if (token == null) {
            return new ResponseEntity<>("Email or password not found", HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
    }

    /**
     * @brief Register a new user.
     *
     * @param body Map containing email, password, and confirmPassword.
     * @return ResponseEntity containing registration token or BAD_REQUEST/CONFLICT
     *         status for validation issues.
     */

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String confirmPassword = body.get("confirmPassword");

        if (!password.equals(confirmPassword)) {
            return new ResponseEntity<>("Passwords deosn't match", HttpStatus.BAD_REQUEST);
        }

        String token = auth.register(email, password);
        if (token == null) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
    }

    /**
     * @brief Authenticate user based on provided token.
     *
     * @param body Map containing authentication token.
     * @return ResponseEntity indicating user authentication status.
     */

    @PostMapping("/")
    public ResponseEntity<String> authenticate(@RequestBody Map<String, String> body) {
        String token = body.get("token");

        User user = auth.validateToken(token);
        if (user != null) {
            return new ResponseEntity<>("User loged in", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not loged in", HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * @brief Logout user based on provided token.
     *
     * @param body Map containing authentication token.
     * @return ResponseEntity indicating logout success or failure.
     */

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody Map<String, String> body) {
        String token = body.get("token");

        if (auth.logout(token)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * @brief Subscribe user to a specific flight.
     *
     * @param body Map containing authentication token and flightIata.
     * @return ResponseEntity indicating subscription success or failure.
     */

    @PostMapping("/subscribe_flight")
    public ResponseEntity<String> subscribe_flight(@RequestBody Map<String, String> body) {

        String token = body.get("token");
        String flightIata = body.get("flightIata");

        User user = auth.validateToken(token);

        if (user == null) {
            return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
        } else {
            userService.subscribeFlights(user, flightIata);
            return new ResponseEntity<>("Successfully subscribed", HttpStatus.OK);
        }
    }

    /**
     * @brief Get the list of flights to which the user is subscribed.
     *
     * @param body Map containing authentication token.
     * @return ResponseEntity containing the list of subscribed flights or
     *         NO_CONTENT status if none.
     */

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

    /**
     * @brief Unsubscribe user from a specific flight.
     *
     * @param body Map containing authentication token and flightIata.
     * @return ResponseEntity indicating unsubscription success or failure.
     */

    @PostMapping("/unsubscribe_flight")
    public ResponseEntity<String> unsubscribe_flight(@RequestBody Map<String, String> body) {

        String token = body.get("token");
        String flightIata = body.get("flightIata");

        User user = auth.validateToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
        } else {
            userService.unsubscribeFlights(user, flightIata);
            return new ResponseEntity<>("Successfully unsubscribed", HttpStatus.OK);
        }
    }

    /**
     * @brief Check if the user is subscribed to a specific flight.
     *
     * @param body Map containing authentication token and flightIata.
     * @return ResponseEntity indicating subscription status or NO_CONTENT if not
     *         subscribed.
     */

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
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("User subscribed", HttpStatus.OK);
        }
    }
}
