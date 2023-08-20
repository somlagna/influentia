package com.cts.content.serviceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.cts.content.SubscriptionFeign;
import com.cts.content.model.user;

import com.cts.content.repository.userRepository;

import com.cts.content.service.userService;

@ExtendWith(MockitoExtension.class)
public class userServiceTest {
	@Autowired
	private userRepository ur;
	@Autowired
	private userService userService;
	
	@BeforeEach
	void setUp() {
		ur=mock(userRepository.class);
		userService=new userService(ur);
	}
	@Test
    public void testFetchByEmail() {
        // Create a dummy user
        user user = new user();
        user.setEmailId("test@example.com");
        user.setPassword("test123");
        user.setUserName("test");
        System.out.println(user);;
        when(ur.findByEmailId("test@example.com")).thenReturn(user);       
        user us=userService.fetchByEmail("test@example.com");
        assertEquals("test@example.com", us.getEmailId());
    }

    @Test
    public void testFetchByEmailAndPassword() {
        // Create a dummy user
        user user = new user();
        user.setEmailId("test@example.com");
        user.setPassword("password");
        when(ur.findByEmailIdAndPassword("test@example.com","password")).thenReturn(user); 

        // Test fetchByEmailAndPassword method with correct credentials
        user fetchedUser = userService.fetchByEmailAndPassword("test@example.com", "password");
        assertNotNull(fetchedUser);

        // Test fetchByEmailAndPassword method with incorrect password
        user invalidUser = userService.fetchByEmailAndPassword("test@example.com", "incorrect");
        assertNull(invalidUser);

        // Test fetchByEmailAndPassword method with non-existent email
        user nonExistentUser = userService.fetchByEmailAndPassword("nonexistent@example.com", "password");
        assertNull(nonExistentUser);
    }

    @Test
    public void testSaveUser() {
        // Create a dummy user
        user user = new user();
        user.setEmailId("test@example.com");
        when(ur.save(user)).thenReturn(user); 
        // Test saveUser method
        user savedUser = userService.saveUser(user);
        assertNotNull(savedUser);
        assertNotNull(savedUser.getId());
        assertEquals("test@example.com", savedUser.getEmailId());
    }
}
