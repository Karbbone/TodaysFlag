package todays_flag.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import todays_flag.api.model.Country;
import todays_flag.api.service.CountryService;

import java.util.List;

@RestController
@RequestMapping("api/country")
public class CountryController {
    @Autowired
    private CountryService countryService;

    @GetMapping
    public List<Country> getAllCountry() {
        return countryService.getAllCountry();
    }
    @GetMapping("today")
    public Country getTodayCountry() {
        return countryService.getTodayRandomCountry();
    }
}
