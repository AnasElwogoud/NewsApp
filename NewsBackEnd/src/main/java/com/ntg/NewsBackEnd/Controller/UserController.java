package com.ntg.NewsBackEnd.Controller;

import com.ntg.NewsBackEnd.DTO.LoginReq;
import com.ntg.NewsBackEnd.DTO.LoginResp;
import com.ntg.NewsBackEnd.Entities.Users;
import com.ntg.NewsBackEnd.Security.Service.JwtService;
import com.ntg.NewsBackEnd.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/rest/auth")
public class UserController {
  @Autowired
  UserService userService;


  @Autowired
  JwtService jwtService;
  @PostMapping("/signup")
  public Users registerUser(@RequestBody Users user){
    return userService.addUser(user);
  }

  @PostMapping(value = "/journ/signup",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> registerJournalist(@ModelAttribute Users user,
                                              @RequestParam("image") MultipartFile file) throws IOException {
    userService.addJournalist(user,file);
    return ResponseEntity.ok().body(user);
  }


  @GetMapping("/admin")
  @PreAuthorize("hasRole('Admin')")
  public String forAdmin(){
    return "This Url is for admin ( Ya Rab)";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('User')")
  public String forUser(){
    return "this Url for user";
  }

  @PostMapping("/login")
  public LoginResp createJwtToken(@RequestBody LoginReq loginReq) throws Exception {
    return jwtService.createJwtToken(loginReq);
  }

  @GetMapping("/userList")
  @PreAuthorize("hasRole('Admin')")
  public Iterable<Users> getUserList() {
    return userService.getUserList();
  }

  @PutMapping("/user/update")
  @PreAuthorize("hasRole('Admin')")
  public Iterable<Users> AddUpdateUser(@RequestBody Users user) {
    return userService.AddUpdateUser(user);

  }

}
