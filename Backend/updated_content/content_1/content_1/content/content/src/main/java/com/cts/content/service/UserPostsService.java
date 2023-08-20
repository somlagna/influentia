package com.cts.content.service;

import java.io.File;
import java.io.InputStream;
import java.net.URI;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cts.content.SubscriptionFeign;
import com.cts.content.usersubscriptionplan;
import com.cts.content.exception.EmptyInputException;
import com.cts.content.exception.ImageSizeExceeded;
import com.cts.content.exception.LimitExceeded;
import com.cts.content.exception.ListNotFoundException;
import com.cts.content.exception.TextSizeExceeded;
import com.cts.content.exception.UserMismatchException;
import com.cts.content.exception.ValueNotPresent;
import com.cts.content.exception.VideoSizeException;
import com.cts.content.model.SubscriptionPlanLimits;
import com.cts.content.model.user;
import com.cts.content.model.userPosts;
import com.cts.content.repository.ContentRepository;

@Service
public class UserPostsService  {
	@Autowired
	private ContentRepository contentRepository;
	
	@Value("${project.image}")
	private String path;
	@Value("${project.video}")
	private String videoPath;
	@Autowired
	private SubscriptionFeign sfi;
	
	public UserPostsService(ContentRepository contentRepository, SubscriptionFeign sfi) {
		super();
		this.contentRepository = contentRepository;
		this.sfi = sfi;
	}

	SubscriptionPlanLimits s;
	
	Logger logger=LoggerFactory.getLogger(UserPostsService.class);
	public List<userPosts> getByUserName(String username) {
		// TODO Auto-generated method stub
		logger.debug("Request{}"+username);
		return contentRepository.findByUserName(username);
	}
	
	public ResponseEntity<?> store(Date postedon,Date publishondate,Time publishontime,String posttype,String postcontexttext,MultipartFile image,String postattachmenturl,String poststatus,String userName,String socialnetworktype,int isScheduled) throws Exception {
		logger.debug("Subscription name: "+getAllResponses(userName));
		List<userPosts>list=(List<userPosts>) contentRepository.findByUserName(userName);
		userPosts u=new userPosts();
		u.setIsScheduled(isScheduled);
		u.setPostattachmenturl(postattachmenturl);
		u.setPoststatus(poststatus);
		u.setPosttype(posttype);
		u.setPublishontime(publishontime);
		u.setSocialnetworktype(socialnetworktype);
		u.setUserName(userName);
		DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		logger.debug("posttype"+posttype);
		if(postedon!=new Date()) {
			u.setPostedon(formatter.parse(formatter.format(new Date())));
		}
		logger.debug("posted on: "+postedon);
		logger.debug("publishondate: "+publishondate);
		if(publishondate.compareTo(postedon)<0) {
			throw new Exception("exception occured");
		}
		
		u.setPublishondate(formatter.parse(formatter.format(publishondate)));
		if(!list.isEmpty() && list.size()==contentRepository.findLimit(getAllResponses(userName))) {
			throw new LimitExceeded("601","Limit Exceeded here");
		}
		
			
			if(posttype.equals("Text")) {
				logger.debug("Length of the text: "+postcontexttext.length());
				if(getAllResponses(userName).equalsIgnoreCase("basic")){
				if(postcontexttext.length()>300) {
					//return "Size of Text exceeded";
					
					throw new TextSizeExceeded("602","Size of Text exceeded");
				}
				}
				
					u.setPostcontexttext(postcontexttext);
				
			}
			if(u.getPosttype().equals("Image")) {
				logger.debug("inside");
				String name=image.getOriginalFilename();
				String fileExtension=name.substring(name.lastIndexOf('.'));
				String uniqueFile=UUID.randomUUID().toString()+fileExtension;
				path="images/";
				String filePath=path+File.separator+uniqueFile;
				System.out.println(path);
				File f=new File(path);
				if(!f.exists()) {
					f.mkdir();
				}
				
				
				Files.copy(image.getInputStream(),Paths.get(filePath),StandardCopyOption.REPLACE_EXISTING);
				long size=image.getSize();
				logger.debug("size: "+size);
				if(getAllResponses(userName).equalsIgnoreCase("basic")){
				if(size>1048576) {
					//return "Size of Image exceeded";
					throw new ImageSizeExceeded("603","Size of Image exceeded");
				}
				}
				
					u.setPostcontexttext(filePath);
				
			}
			
			if(u.getPosttype().equals("Video")) {
				
        if (!image.getContentType().startsWith("video/")) {
            return new ResponseEntity<>("Only video files are allowed.", HttpStatus.BAD_REQUEST);
        }

        // Save the video file to a destination of your choice
        
        String name=image.getOriginalFilename();
		String fileExtension=name.substring(name.lastIndexOf('.'));
		String uniqueFile=UUID.randomUUID().toString()+fileExtension;
		logger.debug(uniqueFile);
		 String filePath=videoPath+uniqueFile;
		 videoPath="videos/";
		File f=new File(videoPath);
		if(!f.exists()) {
		f.mkdir();
		}
		Files.copy(image.getInputStream(),Paths.get(filePath),StandardCopyOption.REPLACE_EXISTING);
		long size=image.getSize();

        //return new ResponseEntity<>("Video file uploaded successfully.", HttpStatus.OK);
		if(getAllResponses(userName).equalsIgnoreCase("basic")){
			if(size>10485760) {
					//return "Size of Image exceeded";
				throw new VideoSizeException("603","Size of Video exceeded");
			}
		}
				
		u.setPostcontexttext(filePath);
					
				
		}
		
		contentRepository.save(u);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Long> updateStat(String username, Integer id) {
		// TODO Auto-generated method stub
		logger.debug("user name for the update: "+username);
		logger.debug("id for the update: "+id);
		Optional<userPosts> u=contentRepository.findById(id);
		if(u.isPresent()) {
			userPosts post=u.get();
			String actual=post.getUserName();
			//System.out.println(actual);
			if(actual.equals(username)) {
				contentRepository.updateStatus(username, id);
				return new ResponseEntity<>(HttpStatus.OK);
			}
			else {
				//return "user not matched";
				
				throw new UserMismatchException("605","user not matched");
			}
		}
		else {
			//return "not present";
			throw new ValueNotPresent("607","not present");
		}
		
		
	}

	public List<Object[]> findByDateRange(int year, String username) {
		// TODO Auto-generated method stub
		return contentRepository.findByDateRange(year, username);
	}

	public List<Object[]> findByDateRangeSemiannually(int year, String username) {
		// TODO Auto-generated method stub
		return contentRepository.findByDateRangeSemiannually(year, username);
	}

	public List<Object[]> findByDateRangeQuaterly(int year, String username) {
		// TODO Auto-generated method stub
		return contentRepository.findByDateRangeQuaterly(year, username);
	}

	
	public List<Object[]> findByDateRangeMonthly(int year, String username) {
		// TODO Auto-generated method stub
		return contentRepository.findByDateRangeMonthly(year, username);
	}
	
	public  String getAllResponses(String username){
		//return sfi.getAllResponse(username).getPlanid().getName();
		Iterable<usersubscriptionplan> u=sfi.getAllResponse(username);
		String s="";
		for(usersubscriptionplan e:u) {
			s=e.getPlanid().getName();
		}
		return s;
	}


	


//	public user fetchByEmail(String temp) {
//		// TODO Auto-generated method stub
//		return contentRepository.findByEmailId(temp);
//	}


//	public user fetchByEmailAndPassword(String tempEmailId, String tempPass) {
//		// TODO Auto-generated method stub
//		return contentRepository.findByEmailIdAndPassword(tempEmailId,tempPass);
//	}
	
	
		
	
		
		
	
	
	
		
		
		
}
