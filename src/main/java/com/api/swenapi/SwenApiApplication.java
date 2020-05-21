package com.api.swenapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages="com.api.controllers")
public class SwenApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwenApiApplication.class, args);
	}

}
