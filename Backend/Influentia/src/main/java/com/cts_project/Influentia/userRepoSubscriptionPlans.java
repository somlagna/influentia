package com.cts_project.Influentia;

import org.springframework.data.repository.CrudRepository;

public interface userRepoSubscriptionPlans extends CrudRepository<SubscriptionPlans,Integer>{

	UserSubscription save(UserSubscription u);

	

}
