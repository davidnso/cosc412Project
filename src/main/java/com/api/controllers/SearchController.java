package com.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.drivers.FI_Driver;
import com.api.interfaces.SearchQuery;
import com.api.interfaces.SearchResult;
import com.api.models.Donation;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class SearchController {

	@PostMapping(value ="/search",consumes = "application/json", produces = "application/json")
	public List<SearchResult> search(
			@RequestBody SearchQuery query) {
		System.out.println(query.getText());
		return FI_Driver.fetchFromKixify(query);
	}
	
	@GetMapping("/search/{target}")
	public List<Donation> fetchDonations(@PathVariable("target")String target) { 
		return null;
	}
	
	
	
}
