package com.cts_project.Influentia;

import org.springframework.data.repository.CrudRepository;

public interface userRepoUserSubscriptions extends CrudRepository<UserSubscription,Integer> {

	

	Iterable<UserSubscription> getByUsername(String username);

}
