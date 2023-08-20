package com.cts.content;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;



@Data
@AllArgsConstructor
public class usersubscriptionplan {
public usersubscriptionplan() {
		// TODO Auto-generated constructor stub
	}


private int subscriptionId;
	

	private String username;

	
	private subscriptionplan planid;
	
	
	private Date subscriptionStartDate;
	
	
	private Date subscriptionEndDate;
	
	
	private int amountPaid;
	
	
	private String paymentMode;
	
	
	private String subscriptionstatus;


	

}
