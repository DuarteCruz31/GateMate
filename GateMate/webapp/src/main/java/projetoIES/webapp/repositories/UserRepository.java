package projetoIES.webapp.repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import projetoIES.webapp.entities.User;

public interface UserRepository extends MongoRepository<User,Integer> {
    User findByEmailOrPassword(String username, String password);
}
