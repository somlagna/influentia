package com.cts.content.exception;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
public class PasswordIncorrectException extends RuntimeException{
    private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorMessage;
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    public PasswordIncorrectException(String errorCode, String errorMessage) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
	
	public PasswordIncorrectException() {
		
	}
    public String getErrorMessage() {
        return null;
    }
}
