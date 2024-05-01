package com.ntg.NewsBackEnd.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @Column(length = 12)
  private String userName;

//  @JsonIgnore
  @Column(name = "passWD")
  private String passWD;

  @Embedded
  private Name full_name;

  @Column(length = 50)
  private String email;

  @Column
  private String profilePic = null;

  @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
  @JoinTable(name = "users_role",
          joinColumns = {
            @JoinColumn(name = "users_id")
          },inverseJoinColumns = {
          @JoinColumn(name = "role_id")
  }
  )
  private Set<Role> role;

  public Users(String userName, String passWD) {
    this.userName = userName;
    this.passWD = passWD;
  }

  public void addRole(Role roles) {
    role.add(roles);
  }
}
