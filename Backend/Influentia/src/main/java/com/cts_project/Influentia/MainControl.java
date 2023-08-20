package com.cts_project.Influentia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;





@Controller
@RequestMapping(path="/api/subscriptions")
public class MainControl {
	@Autowired
	private userRepoSubscriptionPlans uv;
	@Autowired
	private userRepoUserSubscriptions uvs;
	
	@GetMapping(path="/plan")
	public @ResponseBody Iterable<SubscriptionPlans> getAllPlan()
	{
		return uv.findAll();
	}
	@PostMapping(path="/purchase")
	public UserSubscription addnewSubscription(@RequestBody UserSubscription u) {
		return uv.save(u);
	}
	@GetMapping(path="/plan/{username}")
	public @ResponseBody Iterable <UserSubscription> getAllPlansByUsername(@PathVariable String username){
		return uvs.getByUsername(username);
	}
	
}
