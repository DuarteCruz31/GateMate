package projetoIES.webapp.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LiveData {
    private float latitude;
    private float longitude;
    private float altitude;
    private float direction;
    private float speed_horizontal;
    private float speed_vertical;
    private boolean is_ground;
}
