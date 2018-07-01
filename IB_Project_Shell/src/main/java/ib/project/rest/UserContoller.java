package ib.project.rest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ib.project.entity.Authority;
import ib.project.entity.User;
import ib.project.entity.UserDto;
import ib.project.service.AuthorityServiceInterface;
import ib.project.service.UserServiceInterface;


@RestController
@RequestMapping(value="api/users")
public class UserContoller {

	@Autowired
	private UserServiceInterface userService;
	
	@Autowired
	private AuthorityServiceInterface authorityService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@RequestMapping("/logged")
	@PreAuthorize("hasRole('REGULAR')")
	public User user(Principal user) {
	    return this.userService.findByEmail(user.getName());
	    }

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<UserDto>> getAll(){
		List<User> users=userService.findAll();
		List<UserDto> userDtos=new ArrayList<>();
		for (User user : users) {
			userDtos.add(new UserDto(user));
		}
		return new ResponseEntity<>(userDtos,HttpStatus.OK);
	}
	
	
	@GetMapping(value="/all/active")
	@PreAuthorize("hasRole('REGULAR')")
	public ResponseEntity<List<UserDto>>getAllActive(){
		List<UserDto> active=new ArrayList<>();
		List<User>all=userService.findAll();
		for (User user : all) {
			if(user.isActive())
				active.add(new UserDto(user));
		}
		return new ResponseEntity<List<UserDto>>(active,HttpStatus.OK);
	}
	
	@GetMapping(value="/all/username")
	public ResponseEntity<List<String>>allUSernames(){
		List< User> users=userService.findAll();
		List<String>usernames=new ArrayList<>();
		for (User user : users) {
			usernames.add(user.getEmail());
		}
		return new ResponseEntity<List<String>>(usernames,HttpStatus.OK);
	}
	
	@PostMapping(consumes="application/json")
	public ResponseEntity<User> addUser(@RequestBody UserDto user){
		Authority authority=authorityService.findByName("ROLE_REGULAR");
		User newUser=new User();
		System.out.println("Email: "+user.getEmail());
		newUser.setEmail(user.getEmail());
		System.out.println("Password from json: "+user.getPassword());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setActive(false);
		newUser.getUserAuthorities().add(authority);
		newUser =userService.save(newUser);
		
		return new ResponseEntity<User>(newUser,HttpStatus.CREATED);
	}
	
	@PutMapping(value="/edit")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> updateUser(@RequestBody String email){
		System.out.println("Usao u metodu");
		System.out.println(email);
		User user=userService.findByEmail(email);
		if(user == null)
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		user.setActive(true);
		user=userService.save(user);
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
}
