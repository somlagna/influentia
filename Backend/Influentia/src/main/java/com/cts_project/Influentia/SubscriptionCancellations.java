package com.cts_project.Influentia;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="SubscriptionCancellations")
public class SubscriptionCancellations {
  @Id
  @Column(name="id")
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int id;
  
  @Column(name="subscriptionid")
  private int subscriptionId;
  
  @Column(name="cancellationdate")
  private Date cancellationdate;
  
  @Column(name="cancellationreason")
  private String cancellationReason;

public SubscriptionCancellations() {
	super();
	// TODO Auto-generated constructor stub
}

public SubscriptionCancellations(int id, int subscriptionId, Date cancellationdate, String cancellationReason) {
	super();
	this.id = id;
	this.subscriptionId = subscriptionId;
	this.cancellationdate = cancellationdate;
	this.cancellationReason = cancellationReason;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public int getSubscriptionId() {
	return subscriptionId;
}

public void setSubscriptionId(int subscriptionId) {
	this.subscriptionId = subscriptionId;
}

public Date getCancellationdate() {
	return cancellationdate;
}

public void setCancellationdate(Date cancellationdate) {
	this.cancellationdate = cancellationdate;
}

public String getCancellationReason() {
	return cancellationReason;
}

public void setCancellationReason(String cancellationReason) {
	this.cancellationReason = cancellationReason;
}

}
