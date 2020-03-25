package com.api.models;

import java.util.Map;

public class User {
	public  String name; 
	public  String username;
	public  String address_line_1;
	public  String address_line_2;
	public  String city;
	public  String zipCode;
	
	public User( Map<String, String> userInformation) {
		this.name = userInformation.get("name");
		this.username = userInformation.get("username");
		this.address_line_1 = userInformation.get("address_line_1");
		this.address_line_2= userInformation.get("address_line_2");
		this.city = userInformation.get("city");
		this.zipCode = userInformation.get("zipCode");
		
	}
	

}
