package projetoIES.webapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import projetoIES.webapp.entities.LiveData;

public interface LiveDataRepository extends MongoRepository<LiveData, Integer> {

}
