package com.cts.content.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cts.content.model.user;
import com.cts.content.model.userPosts;

public interface ContentRepository extends JpaRepository<userPosts,Integer>{
	List<userPosts> findByUserName(String username);
	@Transactional
		@Modifying
		@Query("update userPosts set poststatus='Cancelled' where userName=?1 and id=?2")
		void updateStatus(String username,Integer id);
		
		
		@Query("select posttype,socialnetworktype,count(*) from userPosts  where userName=:u and YEAR(publishondate)=:year group by posttype,socialnetworktype order by socialnetworktype")
		List<Object[]> findByDateRange(@Param("year")int year,@Param("u")String username);
		
		@Query("select posttype,socialnetworktype,count(*) from userPosts  where userName=:u and YEAR(publishondate)=:year and MONTH(publishondate)<=6 group by posttype,socialnetworktype order by socialnetworktype")
		List<Object[]> findByDateRangeSemiannually(@Param("year")int year, @Param("u") String username);
		
		@Query("select posttype,socialnetworktype,count(*) from userPosts  where userName=:u and YEAR(publishondate)=:year and MONTH(publishondate)<=3 group by posttype,socialnetworktype order by socialnetworktype")
		List<Object[]> findByDateRangeQuaterly(@Param("year")int year, @Param("u") String username);
		
		@Query("select MONTH(publishondate),posttype,socialnetworktype,count(*) from userPosts where userName=:u and YEAR(publishondate)=:year  group by MONTH(publishondate),posttype,socialnetworktype order by  MONTH(publishondate)")
		List<Object[]> findByDateRangeMonthly(@Param("year")int year, @Param("u") String username);
		
		@Query("select monthlyScheduledPostLimit from SubscriptionPlanLimits s where s.planname=:p")
		Integer findLimit(@Param("p") String planname);
		
//		user findByEmailId(String temp);
//		user findByEmailIdAndPassword(String tempEmailId, String tempPass);
//		user findByEmailIdAndPassword(String tempEmailId, String tempPass);
		
		/*@Query("select planid from userSubscriptions where username=:u")
		Integer findPlanId(@Param("u")String username);*/
		
		
}
