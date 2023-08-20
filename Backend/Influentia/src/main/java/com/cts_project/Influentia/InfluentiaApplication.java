package com.cts_project.Influentia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class InfluentiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfluentiaApplication.class, args);
	}

}
