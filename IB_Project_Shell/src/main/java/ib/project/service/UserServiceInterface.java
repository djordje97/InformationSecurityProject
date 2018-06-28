package ib.project.service;

import ib.project.entity.User;

public interface UserServiceInterface {

	User findOne(Integer id);
	User save(User user);
	User findByEmail(String email);
	
}
