package com.ntg.NewsBackEnd;

import com.ntg.NewsBackEnd.Entities.Role;
import com.ntg.NewsBackEnd.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;



@SpringBootApplication
public class NewsBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewsBackEndApplication.class, args);
  }

	@Autowired
	RoleRepo roleRepo;


	@PostConstruct
	public void initiateRoleAndUser(){
		Role adminRole=new Role();
		adminRole.setRoleName("Admin");
		adminRole.setRoleDescription("Admin role");
		roleRepo.save(adminRole);

		Role userRole = new Role();
		userRole.setRoleName("User");
		userRole.setRoleDescription("Default role");
		roleRepo.save(userRole);

		Role jourRole = new Role();
		jourRole.setRoleName("Jour");
		jourRole.setRoleDescription("Jour role");
		roleRepo.save(jourRole);

	}

}
