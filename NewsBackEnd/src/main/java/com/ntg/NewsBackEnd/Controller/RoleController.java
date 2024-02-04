package com.ntg.NewsBackEnd.Controller;

import com.ntg.NewsBackEnd.Entities.Role;
import com.ntg.NewsBackEnd.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/role")
public class RoleController {

    @Autowired
    RoleService roleService;
    @PostMapping("/addRole")
    public Role createNewRole(@RequestBody Role role){
        return roleService.createNewRole(role);
    }
}
