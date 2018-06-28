package ib.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ib.project.entity.User;
import java.lang.String;

public interface UserRepository  extends JpaRepository<User, Integer>{
	
	User findByEmail(String email);
}
