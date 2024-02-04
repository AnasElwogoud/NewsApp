package com.ntg.NewsBackEnd.Entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {

    @Id
    private String roleName;
    private String roleDescription;

    public Role(String roleName) {
        this.roleName = roleName;
    }
}
