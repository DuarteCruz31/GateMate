package projetoIES.webapp.services;

import lombok.AllArgsConstructor;
import projetoIES.webapp.entities.LiveData;
import projetoIES.webapp.repositories.LiveDataRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LiveDataServiceImpl implements LiveDataService {

    private LiveDataRepository liveDataRepository;

    @Override
    public List<LiveData> getLiveData() {
        return liveDataRepository.findAll();
    }
}
