package com.cts.content;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@FeignClient(name="Influentia")
public interface SubscriptionFeign {
	@GetMapping("/api/subscriptions/plan/{username}")
	Iterable<usersubscriptionplan> getAllResponse(@PathVariable("username") String username);
}
