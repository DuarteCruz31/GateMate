package projetoIES.webapp.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LiveData {
    private float latitude;
    private float longitude;
    private float altitude;
    private float direction;
    private float speed;
    private float vertical_speed;
}
