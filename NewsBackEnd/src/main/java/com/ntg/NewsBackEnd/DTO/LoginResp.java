package com.ntg.NewsBackEnd.DTO;

import com.ntg.NewsBackEnd.Entities.Name;
import com.ntg.NewsBackEnd.Entities.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class LoginResp {

  private Name fullName;
  private String errorCode;
  private String token;
  private Set<Role> role;

  public LoginResp(Name fullName, String errorCode, String token, Set<Role> role) {
    this.fullName = fullName;
    this.errorCode = errorCode;
    this.token = token;
    this.role = role;
  }

  public LoginResp() {}



}
