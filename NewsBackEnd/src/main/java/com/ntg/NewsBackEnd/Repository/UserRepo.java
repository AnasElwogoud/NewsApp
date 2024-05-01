package com.ntg.NewsBackEnd.Repository;

import com.ntg.NewsBackEnd.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {

//  List<Users> findByUserNameAndPassWD(String userName, String passWD);

  Optional<Users> findByUserName(String username);

//  public Users findUsersByUsername(String username);


}
