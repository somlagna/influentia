package com.cts.content;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;



@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient

@OpenAPIDefinition(
		info=@Info(
				contact=@Contact(
						name="Somlagna",
						email="2273757@cognizant.com"
						),
				description="Content Management Module",
				title="Influentia Content",
				version="1.0",
				termsOfService="Terms Of Service"
				)
		)
public class ContentApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContentApplication.class, args);
	}
	
	
	

}
