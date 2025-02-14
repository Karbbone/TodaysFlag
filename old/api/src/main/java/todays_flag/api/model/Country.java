package todays_flag.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Country")
public class Country {
    @Id
    @Column(name = "country_code", length = 5)
    private String countryCode;

    @Column(name = "country_name_english", nullable = false, length = 255)
    private String countryNameEnglish;

    @Column(name = "country_name_french", nullable = false, length = 255)
    private String countryNameFrench;

    @Column(name = "google_maps", nullable = false, length = 255)
    private String googleMaps;

    @Column(name = "open_street_maps", nullable = false, length = 255)
    private String openStreetMaps;

    @Column(name = "population", nullable = false)
    private int population;

    @Column(name = "flag_url", nullable = false, length = 255)
    private String flagUrl;

    @Column(name = "is_used", nullable = false)
    private Boolean isUsed;
}
