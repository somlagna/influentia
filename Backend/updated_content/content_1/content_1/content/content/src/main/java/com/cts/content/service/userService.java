package com.cts.content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.content.model.user;
import com.cts.content.repository.userRepository;

@Service
public class userService {

	@Autowired
	public userRepository u;
	
	
	public userService(userRepository ur) {
		// TODO Auto-generated constructor stub
		super();
		this.u=ur;
	}
	public user fetchByEmail(String temp) {
		// TODO Auto-generated method stub
		return u.findByEmailId(temp);
	}
	public  user fetchByEmailAndPassword(String tempEmailId, String tempPass) {
		// TODO Auto-generated method stub
		return u.findByEmailIdAndPassword(tempEmailId,tempPass);
	}
	public user saveUser(user user) {
		// TODO Auto-generated method stub
		return u.save(user);
	}

}
