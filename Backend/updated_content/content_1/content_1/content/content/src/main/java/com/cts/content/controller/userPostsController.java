package com.cts.content.controller;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cts.content.SubscriptionFeign;
import com.cts.content.usersubscriptionplan;
import com.cts.content.exception.EmptyInputException;
import com.cts.content.exception.PasswordIncorrectException;
import com.cts.content.model.userPosts;
import com.cts.content.repository.ContentRepository;
import com.cts.content.repository.userRepository;
import com.cts.content.model.user;
//import com.cts.content.repository.userPostsService;
import com.cts.content.service.UserPostsService;
import com.cts.content.service.userService;


@RestController
@RequestMapping(path="/api/content")
public class userPostsController {
	
	@Autowired
	private UserPostsService userPostsService;
	@Autowired
	private SubscriptionFeign sfi;
	@Autowired
	private ContentRepository contentRepository;
	@Autowired
	private userRepository userRepository;
	@Autowired
	private userService userservice;
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(path="/{username}")
	public List<userPosts> getAllPostsByUserName(@PathVariable String username) throws IOException{
		return userPostsService.getByUserName(username);
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/registration")
	public user registrationUser(@RequestBody user user) throws Exception {
		String temp=user.getEmailId();
		if(temp!=null && !"".equals(temp)) {
			user userObj=userservice.fetchByEmail(temp);
			if(userObj!=null) {
				throw new Exception("user already exists");
			}
			
		}
		user userobj=null;
		userobj=userservice.saveUser(user);
		return userobj;
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/login")
	public String loginUser(@RequestBody user user) throws Exception {
		String tempEmailId=user.getEmailId();
		String tempPass=user.getPassword();
		user userobj=null;
		if(tempEmailId!=null && tempPass !=null) {
			userobj=userservice.fetchByEmail(tempEmailId);
			if(userobj==null) {
			throw new EmptyInputException("901","User does not Exist");
			}
			if(!tempPass.equals(userRepository.findPassword(tempEmailId))){
				throw new PasswordIncorrectException("905","Password Incorrect");
			}
		}
		
		return userobj.getUserName();
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/getImages/{imagepath}")
	public ResponseEntity<byte[]> getImage(@PathVariable("imagepath") String imagePath) throws IOException{
		String filePath="images/";
		Path imageFilePath=Paths.get(filePath+imagePath);
		System.out.println(imageFilePath);
		byte[] imageBytes=Files.readAllBytes(imageFilePath);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	}
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/{filename}/stream")
    @ResponseBody
    public ResponseEntity<InputStreamResource> streamVideo(@PathVariable String filename) throws IOException {
		Path videoPath = Paths.get("videos", filename);

        if (Files.exists(videoPath) && Files.isReadable(videoPath)) {
            InputStreamResource inputStreamResource = new InputStreamResource(Files.newInputStream(videoPath));
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(Files.size(videoPath));
            headers.set("Content-Type", "video/mp4");
            return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
        } else {
            throw new IOException("Video not found or cannot be accessed.");
        }
    }

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(path="/add")
	public ResponseEntity<?> addNewPosts(@RequestParam("postedon")String postedOn,@RequestParam("publishondate")String publishonDate,@RequestParam("publishontime")String publishonTime,@RequestParam("posttype")String posttype,@RequestParam(value="postcontexttext" ,required=false)String postcontexttext,@RequestParam(value="image",required=false)MultipartFile image,@RequestParam("postattachmenturl")String postattachmenturl,@RequestParam("poststatus")String poststatus,@RequestParam("userName")String userName,@RequestParam("socialnetworktype")String socialnetworktype,@RequestParam("isScheduled")int isScheduled) throws Exception{
		SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		Date postedon=df.parse(postedOn);
		Date publishondate=df.parse(publishonDate);
		DateFormat timeFormat=new SimpleDateFormat("HH:mm");
		Time publishontime=new Time(timeFormat.parse(publishonTime).getTime());
		return userPostsService.store(postedon, publishondate, publishontime, posttype, postcontexttext, image, postattachmenturl, poststatus, userName, socialnetworktype, isScheduled);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	 @PutMapping(path="/{username}/cancel/{id}")
	 public ResponseEntity<?> updatePostStatus(@PathVariable("username") String username,@PathVariable("id") Integer id){
		 return userPostsService.updateStat(username, id);
		 
	 }
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/analytics/yearly/{year}/{username}")
		public @ResponseBody List<Object[]> getPostAnalytics(@PathVariable int year,@PathVariable String username )
	{ 
	    return userPostsService.findByDateRange(year,username);}
		@CrossOrigin(origins = "http://localhost:4200")
		@GetMapping("/analytics/semiannually/{year}/{username}")
		public @ResponseBody List<Object[]> getPostAnalyticssemiannually(@PathVariable int year,@PathVariable String username )
	{ 
	    return userPostsService.findByDateRangeSemiannually(year,username);}
	
		@CrossOrigin(origins = "http://localhost:4200")
		@GetMapping("/analytics/quaterly/{year}/{username}")
		public @ResponseBody List<Object[]> getPostAnalyticsquaterly(@PathVariable int year,@PathVariable String username )
	{ 
	    return userPostsService.findByDateRangeQuaterly(year,username);}
		/*@CrossOrigin(origins = "http://localhost:4200")
		@GetMapping("/analytics/monthly/{year}/{username}")
		public @ResponseBody Map<Integer,List<Object[]>> monthlyAnalytics(@PathVariable int year,@PathVariable String username ){
			List<Object[]> monthlyAnalytics=userPostsService.findByDateRangeMonthly(year, username);
			Map<Integer,List<Object[]>> monthlyResult=new HashMap<>();
			for(Object[] res:monthlyAnalytics) {
				int month=(int)res[0];
				List<Object[]> monthAnalytics=monthlyResult.getOrDefault(month, new ArrayList<>());
				monthAnalytics.add(res);
				monthlyResult.put(month, monthAnalytics);
			}
			return monthlyResult;
		}*/
		@CrossOrigin(origins = "http://localhost:4200")
		@GetMapping("/analytics/monthly/{year}/{username}")
		public @ResponseBody List<Object[]> monthlyAnalytics(@PathVariable int year,@PathVariable String username ){
			List<Object[]> monthlyAnalytics=userPostsService.findByDateRangeMonthly(year, username);
			
			return monthlyAnalytics;
		}
		
		@GetMapping("/allplans/{username}")
		public @ResponseBody String getAllResponse(@PathVariable("username") String username){
			//return sfi.getAllResponse(username).getPlanid().getName();
			return userPostsService.getAllResponses(username);
		}
		@GetMapping("/planstruc/{username}")
		public @ResponseBody Iterable<usersubscriptionplan> getResponse(@PathVariable("username") String username){
			return sfi.getAllResponse(username);
		}
		
}
