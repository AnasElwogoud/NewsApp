package com.ntg.NewsBackEnd.Entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
public class Name {
  private String firstName;
  private String lastName;
}
