package com.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.models.Donation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class DonationController {

	@PostMapping("/donate")
	public void donate() {
		
	}
	
	@GetMapping("/donate")
	public Donation fetchDonations() { 
		return null;
	}
	
	
	
}
