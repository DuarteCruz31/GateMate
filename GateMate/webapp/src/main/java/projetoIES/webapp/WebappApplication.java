/**
 * @file
 * @brief Main application class for the web application.
 *
 * @brief WebappApplication class.
 *
 * This class represents the main application class for the web application. It configures Spring Boot and sets up CORS.
 *
 * @note
 * Adjust the class-level comments based on your specific requirements and the functionality of your web application.
 *
 * @author André Oliveira <andreaoliveira@ua.pt>
 * @author Bruno Páscoa <brunopascoa03@ua.pt>
 * @author Duarte Cruz <duarteccruz@ua.pt>
 * @author Sara Almeida <sarafalmeida@ua.pt>
 * @date December 18, 2023
 */

package projetoIES.webapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import projetoIES.webapp.repositories.FlightRepository;
import projetoIES.webapp.repositories.UserRepository;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "projetoIES.webapp.repositories")
public class WebappApplication {

	@Autowired
	FlightRepository flightRepository;

	@Autowired
	UserRepository userRepository;

	/**
	 * @brief Main method to run the Spring Boot application.
	 *
	 * @param args Command line arguments.
	 */
	public static void main(String[] args) {
		SpringApplication.run(WebappApplication.class, args);
	}

	/**
	 * @brief Configure CORS for the application.
	 *
	 * @return WebMvcConfigurer instance with CORS configuration.
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:8083/") // Add the origin of your React app
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowCredentials(true);
			}
		};
	}
}
