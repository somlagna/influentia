package com.cts_project.Influentia;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="UserSubscriptions")
public class UserSubscription {
	public UserSubscription() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public UserSubscription(int subscriptionId, String username, SubscriptionPlans planid, Date subscriptionStartDate,
			Date subscriptionEndDate, int amountPaid, String paymentMode, String subscriptionstatus) {
		super();
		this.subscriptionId = subscriptionId;
		this.username = username;
		this.planid = planid;
		this.subscriptionStartDate = subscriptionStartDate;
		this.subscriptionEndDate = subscriptionEndDate;
		this.amountPaid = amountPaid;
		this.paymentMode = paymentMode;
		this.subscriptionstatus = subscriptionstatus;
	}



	public int getSubscriptionId() {
		return subscriptionId;
	}

	public void setSubscriptionId(int subscriptionId) {
		this.subscriptionId = subscriptionId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	

	public SubscriptionPlans getPlanid() {
		return planid;
	}

	public void setPlanid(SubscriptionPlans planid) {
		this.planid = planid;
	}

	public Date getSubscriptionStartDate() {
		return subscriptionStartDate;
	}

	public void setSubscriptionStartDate(Date subscriptionStartDate) {
		this.subscriptionStartDate = subscriptionStartDate;
	}

	public Date getSubscriptionEndDate() {
		return subscriptionEndDate;
	}

	public void setSubscriptionEndDate(Date subscriptionEndDate) {
		this.subscriptionEndDate = subscriptionEndDate;
	}

	public int getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(int amountPaid) {
		this.amountPaid = amountPaid;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getSubscriptionstatus() {
		return subscriptionstatus;
	}

	public void setSubscriptionstatus(String subscriptionstatus) {
		this.subscriptionstatus = subscriptionstatus;
	}

	@Id
	@Column(name="subscriptionid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int subscriptionId;
	
	@Column(name="username")
	private String username;
	
	@ManyToOne
	@JoinColumn(name="planid")
	
	private SubscriptionPlans planid;
	
	@Column(name="subscriptionstartdate")
	private Date subscriptionStartDate;
	
	@Column(name="subscriptionenddate")
	private Date subscriptionEndDate;
	
	@Column(name="amountpaid")
	private int amountPaid;
	
	@Column(name="paymentmode")
	private String paymentMode;
	
	@Column(name="subscriptionstatus")
	private String subscriptionstatus;
	
	

}
