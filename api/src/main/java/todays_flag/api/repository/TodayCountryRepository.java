package todays_flag.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import todays_flag.api.model.TodayCountry;

import java.time.LocalDate;

public interface TodayCountryRepository extends JpaRepository<TodayCountry,String> {
    TodayCountry findByDay(LocalDate day);
}
