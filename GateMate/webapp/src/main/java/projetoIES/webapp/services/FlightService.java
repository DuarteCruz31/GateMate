package projetoIES.webapp.services;

import projetoIES.webapp.entities.Flight;
import projetoIES.webapp.repositories.FlightRepository;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private FlightRepository flightRepository;
    private JedisPool pool;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
        this.pool = new JedisPool("redis", 6379);
    }

    public List<Flight> getFilteredFlightsAllFlights(String from, String to, String company, String flightIata) {
        List<Flight> allFlights = flightRepository.findAll();

        // Aplicar filtros
        List<Flight> filteredFlights = allFlights.stream()
                .filter(flight -> from == null || flight.getDeparture().getIata().equals(from))
                .filter(flight -> to == null || flight.getArrival().getIata().equals(to))
                .filter(flight -> company == null || flight.getAirlineName().equals(company))
                .filter(flight -> flightIata == null || String.valueOf(flight.getFlightIata()).equals(flightIata))
                .collect(Collectors.toList());

        return filteredFlights;
    }

    public Flight getFlightInfo(String flightIata) throws JedisException{
        Flight old_data=flightRepository.findByFlightIata(flightIata);

        try(Jedis jedis=pool.getResource()){
            if(jedis.exists("info:"+flightIata)){ //if the info is updated
                return old_data;
            }else{ //never asked or expired
                JsonNode jsonNode=fetchInfo(flightIata);
                if(jsonNode!=null){
                    Flight new_data=new Flight(jsonNode,old_data.getId(),old_data.getLiveData());
                    flightRepository.save(new_data);
                    jedis.setex("info:"+flightIata,(long)(Integer.parseInt(System.getenv("FETCH_INTERVAL"))*60),new_data.getDeparture().getEstimated()); //the value is meaningless here but may be useful in the notification manager
                    return new_data;
                }
            }
            return null;
        }
    }

    public JsonNode fetchInfo(String flightIata) throws RestClientException{
        RestTemplate rest=new RestTemplate();
        String api_key=System.getenv("API_KEY");
        String url="https://airlabs.co/api/v9/flight?flight_iata="+flightIata+"&api_key="+api_key;

        try{
            ResponseEntity<String> response = rest.getForEntity(url, String.class);
            if(response.getStatusCode().is2xxSuccessful()){
                ObjectMapper mapper = new ObjectMapper();
                    JsonNode json =mapper.readTree(response.getBody());
                    if(!json.has("response")){
                        return null;
                    }else{
                        return json.get("response");
                    }
                    
            }
            return null;
        }catch(RestClientException e){
            throw e;
        }catch(JsonProcessingException e){
            return null;
        }
    }
}
