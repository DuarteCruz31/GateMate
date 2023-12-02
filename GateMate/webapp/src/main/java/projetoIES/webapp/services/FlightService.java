package projetoIES.webapp.services;

import lombok.AllArgsConstructor;
import projetoIES.webapp.entities.Flight;
import projetoIES.webapp.repositories.FlightRepository;
import redis.clients.jedis.Jedis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@Service
public class FlightService {

    private FlightRepository flightRepository;
    private Jedis jedis;

    public FlightService(FlightRepository flightRepository){
        this.flightRepository=flightRepository;
        this.jedis=new Jedis("redis://redis:6379");
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getFlightInfo(String flight_iata){
        Flight old_data=flightRepository.findByFlight_iata(flight_iata);

        if(jedis.exists("info:"+flight_iata)){ //if the info is updated
            return old_data;
        }else{ //never asked or expired
            JsonNode jsonNode=fetchInfo(flight_iata);
            if(jsonNode!=null){
                Flight new_data=new Flight(jsonNode,old_data.getLive_data());
                flightRepository.save(new_data);
                jedis.setex("info:"+flight_iata,(long)5*60,new_data.getDeparture().getEstimated()); //the value is meaningless here but may be useful in the notification manager
                return new_data;
            }
        }
        return null;
    }

    public JsonNode fetchInfo(String flight_iata){
        RestTemplate rest=new RestTemplate();
        String api_key=System.getenv("API_KEY");
        String url="https://airlabs.co/api/v9/flight?flight_iata="+flight_iata+"&api_key="+api_key;

        ResponseEntity<String> response = rest.getForEntity(url, String.class);
        if(response.getStatusCode().is2xxSuccessful()){
            ObjectMapper mapper = new ObjectMapper();
            try{
                return mapper.readTree(response.getBody());
            }catch(JsonProcessingException e){
                System.err.println("Error processing response");
            }
        }
        return null;
    }
}
