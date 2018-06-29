package ib.project.service;

import java.util.List;

import ib.project.entity.User;

public interface UserServiceInterface {

	User findOne(Integer id);
	User save(User user);
	User findByEmail(String email);
	List<User> findAll();
	
}
