package com.ntg.NewsBackEnd.Repository;

import com.ntg.NewsBackEnd.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, String> {
}
