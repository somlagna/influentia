package com.cts.content;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ContentApplicationTests {
	private calculator c=new calculator();

	@Test
	void contextLoads() {
	}
	
	@Test
	void testSum() {
		int expected=17;
		int actual=c.doSum(12, 3, 2);
		assertThat(actual).isEqualTo(expected);
	}

}
