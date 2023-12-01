package projetoIES.webapp.controllers;

import lombok.AllArgsConstructor;

import projetoIES.webapp.entities.LiveData;
import projetoIES.webapp.services.LiveDataService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class LiveDataController {

    private LiveDataService liveDataService;

    @GetMapping("/livedata")
    public List<LiveData> getLiveData() {
        return liveDataService.getLiveData();
    }

}
