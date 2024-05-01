package com.ntg.NewsBackEnd.Security.Service;


import com.ntg.NewsBackEnd.DTO.LoginReq;
import com.ntg.NewsBackEnd.DTO.LoginResp;
import com.ntg.NewsBackEnd.Entities.Users;

import com.ntg.NewsBackEnd.Security.JwtUtil;
import com.ntg.NewsBackEnd.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;
    public LoginResp createJwtToken(LoginReq loginReq) throws Exception {
        String userName = loginReq.getUserName();
        String passWD = loginReq.getPassWD();
        authenticate(userName,passWD);
        final UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);
        Users user = userRepo.findByUserName(userName).get();

        return new LoginResp(user.getFull_name(),null,newGeneratedToken,user.getRole());
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByUserName(username).get();

        if(user !=null){
            return new User(
                    user.getUserName(),
                    user.getPassWD(),
                    getAuthorities(user)
            );
        }else {
            throw new UsernameNotFoundException("Username is not valid");
        }
    }

    private Set getAuthorities(Users user){
        Set authorities = new HashSet();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
        });
        return authorities;
    }
    private void authenticate(String userName,String passWD) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,passWD));
        }catch (DisabledException e){
            throw new Exception("User is disabled");
        }catch (BadCredentialsException e){
            throw new Exception("Bad Credentials from user");
        }

    }
}
