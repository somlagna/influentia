package com.cts.content.model;

import java.sql.Time;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

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

public class userPosts {
	public userPosts() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(columnDefinition="Date")
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date postedon;
	
	@Column(columnDefinition="Date")
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date publishondate;
	@Column(columnDefinition="Time")
	private Time publishontime;
	@Column( columnDefinition="Varchar(10) check (posttype In('Text','Image','Video'))")
	private String posttype;
	@Column( columnDefinition="Text(65535)")
	private String postcontexttext;
	@Column( columnDefinition="Varchar(200)")
	private String postattachmenturl;
	@Column( columnDefinition="Varchar(10) check (poststatus In('Scheduled','Cancelled'))")
	private String poststatus;
	@Column( columnDefinition="Varchar(10)")
	private String userName;
	@Column( columnDefinition="Varchar(20) check (socialnetworktype In('Facebook','Instagram','Twitter','Youtube','Linkedln'))")
	private String socialnetworktype;
	@Column(columnDefinition="bit(1)")
	private int isScheduled;
	
	
}
