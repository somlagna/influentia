package com.cts.content.exception;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class ImageSizeExceeded extends RuntimeException{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorMessage;
	public ImageSizeExceeded(String errorCode, String errorMessage) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
	public ImageSizeExceeded() {
		super();
		// TODO Auto-generated constructor stub
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
