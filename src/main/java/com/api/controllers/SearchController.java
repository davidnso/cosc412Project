package com.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.drivers.FI_Driver;
import com.api.interfaces.SearchResult;
import com.api.models.Donation;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class SearchController {

	@PostMapping("/search")
	public List<SearchResult> search() {
		return FI_Driver.fetchFromKixify();
	}
	
	@GetMapping("/search/{target}")
	public List<Donation> fetchDonations(@PathVariable("target")String target) { 
		return null;
	}
	
	
	
}
