package todays_flag.api.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todays_flag.api.model.Country;
import todays_flag.api.repository.CountryRepository;
import todays_flag.api.repository.TodayCountryRepository;
import todays_flag.api.model.TodayCountry;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CountryService {
    @Autowired private CountryRepository countryRepository;

    @Autowired private TodayCountryRepository todayCountryRepository;

    private Country todayCountry;

    public List<Country> getAllCountry(){
        // recupere tous les pays
        return countryRepository.findAll();
    }

    public Country getTodayRandomCountry() {
        // je récupère la date du jour et le pays du jour si il y en a deja un
        LocalDate today = LocalDate.now();
        TodayCountry todayCountryCheck = todayCountryRepository.findByDay(today);
        // si c'est null pas de pays encore pour la journee
        if (todayCountryCheck == null) {
            //je recupere les pays pas encore utilise
            List<Country> countries = countryRepository.findAllByIsUsedFalse();

            // je recupere aleatoirement l index en fonction de la date
            int randomIndex = getRandomIndexForDate(countries.size(), today);
            Country todayCountrySelected = countries.get(randomIndex);

            // Marquez le pays comme utilisé et sauvegardez les modifications
            todayCountrySelected.setIsUsed(true);
            countryRepository.save(todayCountrySelected);

            // Je cree le nouveau pays a mettre dans la table
            todayCountryCheck = new TodayCountry();
            todayCountryCheck.setCountryCode(todayCountrySelected.getCountryCode());
            todayCountryCheck.setDay(today);
            todayCountryRepository.save(todayCountryCheck);
            todayCountry = todayCountrySelected;
        }else{
            // si l'attribut todayCountry n est pas initie sinon todayCountry contient deja le pays et evite la requête
            if (todayCountry == null) {
                // je recupere le pays du jour
                Optional<Country> todayCountryOptional = countryRepository.findById(todayCountryCheck.getCountryCode());
                todayCountryOptional.ifPresent(country -> todayCountry = country);
            }
        }
        return todayCountry;
    }

    private int getRandomIndexForDate(int listSize, LocalDate date) {
        Random random = new Random(date.toEpochDay());
        return random.nextInt(listSize);
    }
}
