package com.cts_project.Influentia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="subscriptionplans")
public class SubscriptionPlans {
	@Id
	@Column(name="planid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int planId;
	
	public SubscriptionPlans() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SubscriptionPlans(int planId, String name, int pricepermonth) {
		super();
		this.planId = planId;
		this.name = name;
		this.pricepermonth = pricepermonth;
	}

	@Column(name="name")
	private String name;
	
	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPricepermonth() {
		return pricepermonth;
	}

	public void setPricepermonth(int pricepermonth) {
		this.pricepermonth = pricepermonth;
	}

	@Column(name="pricepermonth")
	private int pricepermonth;
	
	

}
