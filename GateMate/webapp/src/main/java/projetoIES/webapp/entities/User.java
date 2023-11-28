package projetoIES.webapp.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="users")
public class User {
    @Id
    private int user_id;
    private String email;
    private String password;
}
