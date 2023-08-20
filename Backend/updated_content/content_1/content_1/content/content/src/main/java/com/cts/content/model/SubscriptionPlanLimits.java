package com.cts.content.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Table
public class SubscriptionPlanLimits {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column( columnDefinition="Varchar(100) check (planname In('Pro','Basic'))")
	private String planname;
	@Column( columnDefinition="integer(10) check (monthly_Scheduled_Post_Limit In(5,150))")
	private int monthlyScheduledPostLimit;
	
	
}
