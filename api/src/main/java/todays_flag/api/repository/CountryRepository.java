package todays_flag.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import todays_flag.api.model.Country;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country,String> {
    List<Country> findAllByIsUsedFalse();
}
