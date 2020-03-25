package com.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.models.User;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController 
public class UserController {

	@GetMapping("/users/{username}")
	public User fetchUser(@PathVariable("username")String username) {
		return null;
		
	}
	
	@PostMapping("/users/create_account")
	public User createAccount() {
		return null;
	}
	
	@PostMapping("/users/login")
	public String login() {
		return "This is the route";
		
	}
	
}
