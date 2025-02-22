package com.travinity.Travinity.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class FlightController {

    private static final Logger logger = LoggerFactory.getLogger(FlightController.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/searchFlights")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<String> searchFlights(
            @RequestParam String fromId,
            @RequestParam String toId,
            @RequestParam String departDate,
            @RequestParam(required = false) String returnDate,
            @RequestParam(defaultValue = "ECONOMY") String cabinClass,
            @RequestParam(defaultValue = "1") int adults) {

        // Corrected API URL
        String url = "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?" +
                "fromId=" + fromId +
                "&toId=" + toId +
                "&departDate=" + departDate +
                (returnDate != null ? "&returnDate=" + returnDate : "") +
                "&pageNo=1" +
                "&adults=" + adults +
                "&children=0,17&sort=BEST&cabinClass=" + cabinClass +  // Fixed "=="
                "&currency_code=USD";

        logger.info("Request URL: {}", url);

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Host", "booking-com15.p.rapidapi.com"); // Ensure correct host
        headers.set("X-RapidAPI-Key", "02670754a0msh0b854492645b241p191547jsncd32c651b0ba"); // Replace with your API key

        ResponseEntity<String> response;
        try {
            response = restTemplate.exchange(url, HttpMethod.GET, new org.springframework.http.HttpEntity<>(headers), String.class);
            logger.info("API Response: {}", response.getBody());
        } catch (Exception e) {
            logger.error("Error calling API: ", e);
            return ResponseEntity.status(500).body("API request failed: " + e.getMessage());
        }

        return ResponseEntity.ok(response.getBody());
    }
}
