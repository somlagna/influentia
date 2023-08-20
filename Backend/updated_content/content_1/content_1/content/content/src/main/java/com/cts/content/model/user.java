package com.cts.content.model;

import java.sql.Time;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class user {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column( columnDefinition="Varchar(10)")
	private String userName;
	
	@Column( columnDefinition="Varchar(10)")
	private String password;
	
	@Column( columnDefinition="Varchar(60)")
	private String emailId;

	public user() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
