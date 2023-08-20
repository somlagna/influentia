package com.cts.content.GlobalException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.cts.content.exception.EmptyInputException;
import com.cts.content.exception.ImageSizeExceeded;
import com.cts.content.exception.LimitExceeded;
import com.cts.content.exception.ListNotFoundException;
import com.cts.content.exception.PasswordIncorrectException;
import com.cts.content.exception.TextSizeExceeded;
import com.cts.content.exception.UserMismatchException;
import com.cts.content.exception.ValueNotPresent;
import com.cts.content.exception.VideoSizeException;

@ControllerAdvice
public class MyGlobalException {
	private static final Logger logger=LoggerFactory.getLogger(MyGlobalException.class);
	@ExceptionHandler(TextSizeExceeded.class)
	public ResponseEntity<String> handleException(TextSizeExceeded businessException){
		logger.error(businessException.getErrorMessage(),businessException);
		return new ResponseEntity<String>("size of text exceeded",HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(LimitExceeded.class)
	public ResponseEntity<String> handleExceptionLimit(LimitExceeded limitExceeded){
		logger.error("Exception occured due to limit exceeded",limitExceeded);
		return new ResponseEntity<String>(limitExceeded.getErrorMessage(),HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(ImageSizeExceeded.class)
	public ResponseEntity<String> handleExceptionImage(ImageSizeExceeded imageSizeExceeded){
		logger.error(imageSizeExceeded.getErrorMessage(),imageSizeExceeded);
		return new ResponseEntity<String>("size of image exceeded",HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(VideoSizeException.class)
	public ResponseEntity<String> handleExceptionVideo(VideoSizeException videoSizeException){
		logger.error(videoSizeException.getErrorMessage(),videoSizeException);
		return new ResponseEntity<String>("size of video exceeded",HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(EmptyInputException.class)
	public ResponseEntity<String> handleExceptionUserExist(EmptyInputException emptyInputException){
		logger.error(emptyInputException.getErrorMessage(),emptyInputException);
		return new ResponseEntity<String>("User does not exist",HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(PasswordIncorrectException.class)
	public ResponseEntity<String> handleExceptionPassword(PasswordIncorrectException PasswordIncorrectException){
		logger.error(PasswordIncorrectException.getErrorMessage(),PasswordIncorrectException);
		return new ResponseEntity<String>("Password Incorrect",HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(UserMismatchException.class)
	public ResponseEntity<String> handleExceptionUserMismatch(UserMismatchException userMismatchException){
		logger.error(userMismatchException.getErrorMessage(),userMismatchException);
		return new ResponseEntity<String>("user not matched",HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(ValueNotPresent.class)
	public ResponseEntity<String> handleExceptionVallueNotPresent(ValueNotPresent valueNotPresent){
		logger.error(valueNotPresent.getErrorMessage(),valueNotPresent);
		return new ResponseEntity<String>("not present",HttpStatus.BAD_REQUEST);
	}
	
	
	
}
