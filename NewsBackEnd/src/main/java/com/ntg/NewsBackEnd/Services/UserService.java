package com.ntg.NewsBackEnd.Services;


import com.ntg.NewsBackEnd.Entities.Role;
import com.ntg.NewsBackEnd.Entities.Users;
import com.ntg.NewsBackEnd.Repository.RoleRepo;
import com.ntg.NewsBackEnd.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashSet;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

  @Autowired
  UserRepo userRepo;

  @Autowired
  RoleRepo roleRepo;

  @Autowired
  PasswordEncoder passwordEncoder;


  public Users addUser(Users user) {
    Role role = roleRepo.findById("User").get();
    Set<Role> userRoles = new HashSet<>();
    userRoles.add(role);
    user.setRole(userRoles);
    user.setPassWD(encodePassword(user.getPassWD()));
    return userRepo.save(user);
  }
  private String encodePassword(String passWD) {
    return passwordEncoder.encode(passWD);
  }
  public Optional<User> getCurrentUser() {
    User principal = (User) SecurityContextHolder.getContext().
      getAuthentication().getPrincipal();
    return Optional.of(principal);
  }
  public Iterable<Users> getUserList() {return userRepo.findAll();}
  public Iterable<Users> AddUpdateUser(Users user) {
    userRepo.save(user);
    return userRepo.findAll();
  }

  public Users addJournalist(Users user, MultipartFile file) throws IOException {
    String FOLDER_PATH = "H:/Learn/WebDevelopment/NewsApp-2/src/assets/uploaded/profilePics/";
//    String FOLDER_PATH = "Z:/NTG/NewsApp-2/src/assets/uploaded/profilePics/";
    String filePath=FOLDER_PATH + file.getOriginalFilename();
    file.transferTo(new File(filePath));
    user.setProfilePic(file.getOriginalFilename());
    Role role = roleRepo.findById("Jour").get();
    Set<Role> userRoles = new HashSet<>();
    userRoles.add(role);
    user.setRole(userRoles);
    user.setPassWD(encodePassword(user.getPassWD()));
    return userRepo.save(user);
  }
}

