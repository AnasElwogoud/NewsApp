package com.ntg.NewsBackEnd.Services;

import com.ntg.NewsBackEnd.Entities.Role;
import com.ntg.NewsBackEnd.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    RoleRepo roleRepo;
    public Role createNewRole(Role role){
        return roleRepo.save(role);
    }
}
