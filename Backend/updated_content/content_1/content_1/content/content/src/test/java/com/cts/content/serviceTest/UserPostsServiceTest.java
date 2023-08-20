package com.cts.content.serviceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cts.content.SubscriptionFeign;
import com.cts.content.subscriptionplan;
import com.cts.content.usersubscriptionplan;
import com.cts.content.exception.ImageSizeExceeded;
import com.cts.content.exception.LimitExceeded;

import com.cts.content.exception.TextSizeExceeded;
import com.cts.content.exception.UserMismatchException;
import com.cts.content.exception.ValueNotPresent;
import com.cts.content.exception.VideoSizeException;
import com.cts.content.model.userPosts;
import com.cts.content.repository.ContentRepository;
import com.cts.content.service.UserPostsService;

@ExtendWith(MockitoExtension.class)
public class UserPostsServiceTest {
	
	@Mock
	private ContentRepository contentRepository;
	@Autowired
	private SubscriptionFeign sfi;
	@Autowired
	private UserPostsService userPostsService;
	@Value("src/test/java/com/cts/content/images")
	private String path;
	
	@BeforeEach
	void setUp() {
		contentRepository=mock(ContentRepository.class);
		sfi=mock(SubscriptionFeign.class);
		
		userPostsService=new UserPostsService(contentRepository,sfi);
	}
	

	@Test
	void getByUserName() throws ParseException {
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		Date d1=df.parse("2023-06-09");
		Date d2=df.parse("2023-06-09");
		SimpleDateFormat d=new SimpleDateFormat("HH:mm:ss");
		Date parsedTime=d.parse("9:00:00");
		Time time=new Time(parsedTime.getTime());
		userPosts u= new userPosts(22,d1 ,d2,time,"Text","hffd","khkh","Scheduled","somlagna","Twitter",1);
		List<userPosts>expected=new ArrayList<>();
		expected.add(u);
		when(contentRepository.findByUserName("somlagna")).thenReturn(expected);
		
		Iterable<userPosts> actual=userPostsService.getByUserName("somlagna");
		verify(contentRepository).findByUserName("somlagna");
		assertEquals(expected,actual);
		
	}
	@Test
	void testUpdate_Success() throws ParseException {
		Integer id=6;
		String username="soma";
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		Date d1=df.parse("2023-06-09");
		Date d2=df.parse("2023-06-09");
		SimpleDateFormat d=new SimpleDateFormat("HH:mm:ss");
		Date parsedTime=d.parse("9:00:00");
		Time time=new Time(parsedTime.getTime());
		userPosts existing= new userPosts(6,d1 ,d2,time,"Text","hffd","khkh","Scheduled","soma","Twitter",1);
		userPosts updated=new userPosts(6,d1 ,d2,time,"Text","hffd","khkh","Cancelled","soma","Twitter",1);
		when(contentRepository.findById(id)).thenReturn(Optional.of(existing));
		//when(contentRepository.save(existing)).thenReturn(existing);
		ResponseEntity<Long> response=userPostsService.updateStat(username, id);
		assertEquals(HttpStatus.OK,response.getStatusCode());
		
	}
	@Test
	void testUpdate_UserMismatch() throws ParseException {
		Integer id=6;
		String username="soma";
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		Date d1=df.parse("2023-06-09");
		Date d2=df.parse("2023-06-09");
		SimpleDateFormat d=new SimpleDateFormat("HH:mm:ss");
		Date parsedTime=d.parse("9:00:00");
		Time time=new Time(parsedTime.getTime());
		userPosts existing= new userPosts(6,d1 ,d2,time,"Text","hffd","khkh","Scheduled","soml","Twitter",1);
		userPosts updated=new userPosts(6,d1 ,d2,time,"Text","hffd","khkh","Cancelled","soma","Twitter",1);
		when(contentRepository.findById(id)).thenReturn(Optional.of(existing));
		//when(contentRepository.save(existing)).thenReturn(existing);
		assertThrows(UserMismatchException.class,()->userPostsService.updateStat(username, id));
	}
	@Test
	void testUpdate_UserNotFound() throws ParseException {
		Integer id=6;
		String username="soma";
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		Date d1=df.parse("2023-06-09");
		Date d2=df.parse("2023-06-09");
		SimpleDateFormat d=new SimpleDateFormat("HH:mm:ss");
		Date parsedTime=d.parse("9:00:00");
		Time time=new Time(parsedTime.getTime());
		
		userPosts updated=new userPosts(6,d1 ,d2,time,"Text","hffd","khkh","Cancelled","soma","Twitter",1);
		when(contentRepository.findById(id)).thenReturn(Optional.empty());
		//when(contentRepository.save(existing)).thenReturn(existing);
		assertThrows(ValueNotPresent.class,()->userPostsService.updateStat(username, id));
	}
	
    
	@Test
	void findByDateRange() {
		Integer year=2023;
		String username="soma";
		userPostsService.findByDateRange(year, username);
		verify(contentRepository).findByDateRange(year, username);
	}
	@Test
	void findByDateRangeSemiannually() {
		Integer year=2023;
		String username="soma";
		userPostsService.findByDateRangeSemiannually(year, username);
		verify(contentRepository).findByDateRangeSemiannually(year, username);
	}
	@Test
	void findByDateRangeQuaterly() {
		Integer year=2023;
		String username="soma";
		userPostsService.findByDateRangeQuaterly(year, username);
		verify(contentRepository).findByDateRangeQuaterly(year, username);
	}
	@Test
	void findByDateRangeMonthly() {
		Integer year=2023;
		String username="soma";
		userPostsService.findByDateRangeMonthly(year, username);
		verify(contentRepository).findByDateRangeMonthly(year, username);
	}
	@Test
	void testStore_Success() throws Exception {
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Text";
		String postcontexttext="Sample Text";
		
		u.setUserName("soma");
		when(contentRepository.findByUserName(u.getUserName())).thenReturn(new ArrayList<>());
		ResponseEntity<?> response=userPostsService.store(postedon,publishondate,publishontime,posttype,postcontexttext,null,null,"Scheduled", "soma","Facebook",1);
		assertEquals(HttpStatus.OK,response.getStatusCode());
		
	}
	
	@Test
	void testStore_LimitExceeded() throws Exception{
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Text";
		String postcontexttext="Sample Text";
		u.setUserName("soma");
		ResponseEntity<?> response=userPostsService.store(postedon,publishondate,publishontime,posttype,postcontexttext,null,null,"Scheduled", "soma","Facebook",1);
		List<userPosts> existing=new ArrayList<>();
		existing.add(new userPosts());
		existing.add(new userPosts());
		existing.add(new userPosts());
		existing.add(new userPosts());
		existing.add(new userPosts());
		when(contentRepository.findByUserName(u.getUserName())).thenReturn(existing);
		when(contentRepository.findLimit(anyString())).thenReturn(5);
		assertThrows(LimitExceeded.class,()->userPostsService.store(postedon,publishondate,publishontime,posttype,postcontexttext,null,null,"Scheduled", "soma","Facebook",1));
		
	}
	
	@Test
	void testStore_LimitNotExceeded() throws Exception{
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Text";
		String postcontexttext="Sample Text";
		u.setUserName("soma");
		
		u.setUserName("soma");
		List<userPosts> existing=new ArrayList<>();
		existing.add(new userPosts());
		existing.add(new userPosts());
		existing.add(new userPosts());
		existing.add(new userPosts());
		
		when(contentRepository.findByUserName(u.getUserName())).thenReturn(existing);
		when(contentRepository.findLimit(anyString())).thenReturn(5);
		ResponseEntity<?> response=userPostsService.store(postedon,publishondate,publishontime,posttype,postcontexttext,null,null,"Scheduled", "soma","Facebook",1);
		assertEquals(HttpStatus.OK,response.getStatusCode());
		
	}
	
	@Test
	void testStore_textSizeExceeded() {
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Text";
		String postcontexttext="Excuse me Sir! Can I help you? I asked him. He seemed to be in a state of shock. I tried calling out to him but he continued going round and round his car. I was not comfortable reaching out to him physically and I thought he might attack me in his condition. But there was no one I could call as my phone had switched off after getting wet in the rain. Also, if I went home, which was just across the street, my over-protective mother would panic and wouldn't let me help him. So there I was, feeling helpless and angry, because I decided to help someone without knowing what to do.I remember standing in the rain for quite some time, staring at the man hovering around his car, feeling absolutely worthless. Then in a flash of a moment, I found myself walking towards him and reaching out to his shoulder. I must have been really stupid to do that!I remember standing in the rain for quite some time, staring at the man hovering around his car, feeling absolutely worthless. Then in a flash of a moment, I found myself walking towards him and reaching out to his shoulder. I must have been really stupid to do that!I remember standing in the rain for quite some time, staring at the man hovering around his car, feeling absolutely worthless. Then in a flash of a moment, I found myself walking towards him and reaching out to his shoulder. I must have been really stupid to do that!";
		u.setUserName("soma");
		u.setPosttype(posttype);
		u.setPostcontexttext(postcontexttext);
		//System.out.println(u.getPostcontexttext().length());
		
		when(contentRepository.findByUserName(u.getUserName())).thenReturn(new ArrayList<>());
		usersubscriptionplan u1=new usersubscriptionplan();
		u1.setPlanid(new subscriptionplan(3,"pro",200));
		usersubscriptionplan u2=new usersubscriptionplan();
		u2.setPlanid(new subscriptionplan(4,"basic",400));
		List<usersubscriptionplan> mock=new ArrayList<>();
		
		mock.add(u1);
		mock.add(u2);
		when(sfi.getAllResponse(u.getUserName())).thenReturn(mock);
		
		assertThrows(TextSizeExceeded.class,()->userPostsService.store(postedon,publishondate,publishontime,posttype,postcontexttext,null,null,"Scheduled", "soma","Facebook",1));;
	}
	
	@Test
	void testStore_textSizeNotExceeded() throws Exception {
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Text";
		String postcontexttext="hi sample";
		u.setUserName("soma");
		u.setPosttype(posttype);
		u.setPostcontexttext(postcontexttext);
		//System.out.println(u.getPostcontexttext().length());
		
		when(contentRepository.findByUserName(u.getUserName())).thenReturn(new ArrayList<>());
		usersubscriptionplan u1=new usersubscriptionplan();
		u1.setPlanid(new subscriptionplan(3,"pro",200));
		usersubscriptionplan u2=new usersubscriptionplan();
		u2.setPlanid(new subscriptionplan(4,"basic",400));
		List<usersubscriptionplan> mock=new ArrayList<>();
		mock.add(u1);
		mock.add(u2);
		when(sfi.getAllResponse(u.getUserName())).thenReturn(mock);
		ResponseEntity<?> response=userPostsService.store(postedon,publishondate,publishontime,posttype,postcontexttext,null,null,"Scheduled", "soma","Facebook",1);
		assertEquals(HttpStatus.OK,response.getStatusCode());
	}
	@Test
	void testStore_Date() {
		String postedOn="2023-07-21";
		String publishOn="2023-06-18";
		assertThrows(Exception.class,()->{
			if(publishOn.compareTo(postedOn)<0) {
				throw new Exception("exception occurred");
			}
		});
	}
	
	@Test
	void testImageSizeNotExceeded() throws Exception{
		UserPostsService up=spy(userPostsService);
		ImageSizeExceeded exception=new ImageSizeExceeded("603","Size of Image exceeded");
		when(up.getAllResponses(anyString())).thenReturn("basic");
		byte[] imageData=new byte[200000];
		MockMultipartFile image=new MockMultipartFile("image","049f173d-c4da-44dd-8dfd-ff8575a7c6b4.png","image/png",imageData);
		String name=image.getOriginalFilename();
		String fileExtension=name.substring(name.lastIndexOf('.'));
		String uniqueFile=UUID.randomUUID().toString()+fileExtension;
		String path="src/test/java/com/cts/content/images/";
		String filePath=path+File.separator+uniqueFile;
//		System.out.println(path);
		File f=new File(path);
		
		if(!f.exists()) {
			f.mkdir();
		}
		
		
		
		Files.copy(image.getInputStream(),Paths.get(filePath),StandardCopyOption.REPLACE_EXISTING);
		System.out.println("hi");
		ResponseEntity<?> response=	up.store(new Date(), new Date(), new Time(0), "Image", filePath, image, null,"Scheduled", "soma","Facebook",1);
		
		assertEquals(HttpStatus.OK,response.getStatusCode());
		
	}
	@Test
	void testVideoSizeNotExceeded() throws Exception{
		UserPostsService up=spy(userPostsService);
		
		when(up.getAllResponses(anyString())).thenReturn("basic");
		byte[] imageData=new byte[200000];
		MockMultipartFile image=new MockMultipartFile("image","049f173d-c4da-44dd-8dfd-ff8575a7c6b4.mp4","video/mp4",imageData);
		
		ResponseEntity<?> response=	up.store(new Date(), new Date(), new Time(0), "Video", null, image, null,"Scheduled", "soma","Facebook",1);
		
		assertEquals(HttpStatus.OK,response.getStatusCode());
		
	}
	@Test
	void testStore_ImageSizeExceeded() throws Exception {
		
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Image";
		String postcontexttext="";
		u.setUserName("soma");
		u.setPosttype(posttype);
		
		MockMultipartFile image=new MockMultipartFile("image","049f173d-c4da-44dd-8dfd-ff8575a7c6b4.png","image/png",new byte[2048579]);
		System.out.println(image.getSize());

		when(contentRepository.findByUserName(u.getUserName())).thenReturn(new ArrayList<>());
		usersubscriptionplan u1=new usersubscriptionplan();
		u1.setPlanid(new subscriptionplan(3,"pro",200));
		usersubscriptionplan u2=new usersubscriptionplan();
		u2.setPlanid(new subscriptionplan(4,"basic",400));
		List<usersubscriptionplan> mock=new ArrayList<>();
		mock.add(u1);
		mock.add(u2);
		when(sfi.getAllResponse(u.getUserName())).thenReturn(mock);
//		System.out.println(userPostsService.getAllResponses(u.getUserName()));
		assertThrows(ImageSizeExceeded.class,()->userPostsService.store(new Date(), new Date(), new Time(0), "Image",null, image, null,"Scheduled", "soma","Facebook",1));
	}
	@Test
	void testStore_VideoSizeExceeded() throws Exception {
		
		userPosts u=new userPosts();
		Date postedon=new Date();
		Date publishondate=new Date();
		Time publishontime=new Time(0);
		String posttype="Image";
		String postcontexttext="";
		u.setUserName("soma");
		u.setPosttype(posttype);
		
		MockMultipartFile image=new MockMultipartFile("image","049f173d-c4da-44dd-8dfd-ff8575a7c6b4.mp4","video/mp4",new byte[20485792]);
		System.out.println(image.getSize());

		when(contentRepository.findByUserName(u.getUserName())).thenReturn(new ArrayList<>());
		usersubscriptionplan u1=new usersubscriptionplan();
		u1.setPlanid(new subscriptionplan(3,"pro",200));
		usersubscriptionplan u2=new usersubscriptionplan();
		
		u2.setPlanid(new subscriptionplan(4,"basic",400));
		List<usersubscriptionplan> mock=new ArrayList<>();
		mock.add(u1);
		mock.add(u2);
		when(sfi.getAllResponse(u.getUserName())).thenReturn(mock);
//		System.out.println(userPostsService.getAllResponses(u.getUserName()));
		assertThrows(VideoSizeException.class,()->userPostsService.store(new Date(), new Date(), new Time(0), "Video",null, image, null,"Scheduled", "soma","Facebook",1));
	}
	
	
	@Test
	void getAllResponses() {
		 
		String username="test1";
		usersubscriptionplan u1=new usersubscriptionplan();
		u1.setPlanid(new subscriptionplan(3,"pro",200));
		usersubscriptionplan u2=new usersubscriptionplan();
		u2.setPlanid(new subscriptionplan(4,"basic",400));
		List<usersubscriptionplan> mock=new ArrayList<>();
		mock.add(u1);
		mock.add(u2);
		when(sfi.getAllResponse(username)).thenReturn(mock);
		String res=userPostsService.getAllResponses(username);
		assertEquals("basic",res);
		verify(sfi).getAllResponse(username);
	}
	
	}
	

	
	
		

