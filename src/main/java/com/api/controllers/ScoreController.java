package com.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.models.Score;

@RestController
public class ScoreController {
	
	@GetMapping("/scores")
	public Score[] fetchAllScore() {
		return null;
	}
	
	@GetMapping("/scores/{username}")
	public Score fetchScore(@PathVariable("username")String username) {
		return null;
		
	}
	
	@PostMapping("/scores/{username}")
	public void addScore(@PathVariable("username")String username) {
		
	}
	
	
}
