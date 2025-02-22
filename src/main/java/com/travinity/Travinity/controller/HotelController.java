package com.travinity.Travinity.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    private static final Logger logger = LoggerFactory.getLogger(HotelController.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/searchHotels")
    public ResponseEntity<String> searchHotels(
            @RequestParam String destId,
            @RequestParam String searchType,
            @RequestParam String arrivalDate,
            @RequestParam String departureDate,
            @RequestParam(defaultValue = "1") int adults,
            @RequestParam(defaultValue = "0,17") String childrenAge,
            @RequestParam(defaultValue = "1") int roomQty,
            @RequestParam(defaultValue = "1") int pageNumber,
            @RequestParam(required = false) Integer priceMin,
            @RequestParam(required = false) Integer priceMax,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "metric") String units,
            @RequestParam(defaultValue = "c") String temperatureUnit,
            @RequestParam(defaultValue = "en-us") String languagecode,
            @RequestParam(defaultValue = "USD") String currencyCode
    ) {
        String url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?" +
                "dest_id=" + destId +
                "&search_type=" + searchType +
                "&arrival_date=" + arrivalDate +
                "&departure_date=" + departureDate +
                "&adults=" + adults +
                "&children_age=" + childrenAge +
                "&room_qty=" + roomQty +
                "&page_number=" + pageNumber +
                (priceMin != null ? "&price_min=" + priceMin : "") +
                (priceMax != null ? "&price_max=" + priceMax : "") +
                (sortBy != null ? "&sort_by=" + sortBy : "") +
                "&units=" + units +
                "&temperature_unit=" + temperatureUnit +
                "&languagecode=" + languagecode +
                "&currency_code=" + currencyCode;

        logger.info("Request URL: {}", url);

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Host", "booking-com15.p.rapidapi.com");
        headers.set("X-RapidAPI-Key", "02670754a0msh0b854492645b241p191547jsncd32c651b0ba");

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                new org.springframework.http.HttpEntity<>(headers), 
                String.class
            );
            logger.info("API Response: {}", response.getBody());
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            logger.error("Error calling API: ", e);
            return ResponseEntity.status(500).body("API request failed: " + e.getMessage());
        }
    }
} 