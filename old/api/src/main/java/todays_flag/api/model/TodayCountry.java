package todays_flag.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "TodayCountry")
public class TodayCountry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day", columnDefinition = "DATE", unique = true, nullable = false)
    private LocalDate day;

    @Column(name = "countryCode")
    private String countryCode;
}
