package com.cts.content.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.content.model.user;


public interface userRepository extends JpaRepository<user,Integer>{

	user findByEmailId(String temp);

	user findByEmailIdAndPassword(String tempEmailId, String tempPass);
	
	user save(user user);

	@Query("select password from user where emailId=:e")
	String findPassword(@Param("e") String emailId);
	
}
